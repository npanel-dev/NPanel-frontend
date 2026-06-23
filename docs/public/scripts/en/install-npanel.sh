#!/bin/bash

#######################################################
# NPanel one-click installation script
# Support: Docker Compose source build deployment
# Usage: curl -fsSL https://npanel.dev/scripts/en/install-npanel.sh | bash
#######################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

INSTALL_DIR="${INSTALL_DIR:-$HOME/npanel}"
BACKEND_REPO="${BACKEND_REPO:-https://github.com/npanel-dev/NPanel-backend.git}"
BACKEND_BRANCH="${BACKEND_BRANCH:-main}"
NPANEL_VERSION="${NPANEL_VERSION:-v1.0.7}"
HOST_PORT="${HOST_PORT:-8081}"
GRPC_PORT="${GRPC_PORT:-9012}"

MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-}"
MYSQL_USER="${MYSQL_USER:-npanel}"
MYSQL_PASSWORD="${MYSQL_PASSWORD:-}"
MYSQL_DB="${MYSQL_DB:-npanel}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@npanel.dev}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-}"
JWT_SECRET="${JWT_SECRET:-}"
SITE_HOST="${SITE_HOST:-}"

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

generate_secret() {
    if command -v openssl &> /dev/null; then
        openssl rand -hex 32
    else
        tr -dc 'a-zA-Z0-9' < /dev/urandom | fold -w 64 | head -n 1
    fi
}

check_requirements() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        log_info "Install it with: curl -fsSL https://npanel.dev/scripts/en/install-docker.sh | sudo bash"
        exit 1
    fi

    if ! docker compose version &> /dev/null; then
        log_error "Docker Compose plugin is not installed"
        exit 1
    fi

    if ! command -v git &> /dev/null; then
        log_error "Git is not installed"
        log_info "Install git first, for example: sudo apt-get install -y git"
        exit 1
    fi

    log_info "Docker: $(docker --version)"
    log_info "Docker Compose: $(docker compose version --short)"
    log_info "Git: $(git --version)"
}

check_port() {
    local port="$1"
    if command -v ss &> /dev/null; then
        if ss -tuln | grep -q ":$port "; then
            log_error "Port $port is already in use"
            exit 1
        fi
    elif command -v netstat &> /dev/null; then
        if netstat -tuln | grep -q ":$port "; then
            log_error "Port $port is already in use"
            exit 1
        fi
    fi
}

prepare_variables() {
    MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-$(generate_secret | cut -c1-24)}"
    MYSQL_PASSWORD="${MYSQL_PASSWORD:-$(generate_secret | cut -c1-24)}"
    ADMIN_PASSWORD="${ADMIN_PASSWORD:-$(generate_secret | cut -c1-16)}"
    JWT_SECRET="${JWT_SECRET:-$(generate_secret)}"
    SITE_HOST="${SITE_HOST:-localhost:$HOST_PORT}"
}

fetch_backend() {
    log_step "Preparing backend source..."

    if [[ -d "$INSTALL_DIR/.git" ]]; then
        cd "$INSTALL_DIR"
        git fetch origin "$BACKEND_BRANCH"
        git checkout "$BACKEND_BRANCH"
        git pull --ff-only origin "$BACKEND_BRANCH"
    elif [[ -e "$INSTALL_DIR" ]] && [[ -n "$(ls -A "$INSTALL_DIR" 2>/dev/null)" ]]; then
        log_error "Installation directory is not empty and is not a git repository: $INSTALL_DIR"
        log_info "Use another path, for example: INSTALL_DIR=/opt/npanel bash install-npanel.sh"
        exit 1
    else
        mkdir -p "$(dirname "$INSTALL_DIR")"
        git clone --branch "$BACKEND_BRANCH" "$BACKEND_REPO" "$INSTALL_DIR"
        cd "$INSTALL_DIR"
    fi
}

write_compose() {
    log_step "Writing Docker Compose configuration..."

    mkdir -p configs

    cat > docker-compose.yml <<'COMPOSE_EOF'
services:
  mysql:
    image: mysql:8.4
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DB}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      TZ: UTC
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - npanel_mysql:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1", "-u${MYSQL_USER}", "-p${MYSQL_PASSWORD}"]
      interval: 10s
      timeout: 5s
      retries: 20

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - npanel_redis:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 20

  npanel:
    build:
      context: .
      args:
        VERSION: ${NPANEL_VERSION}
    image: npanel:latest
    restart: unless-stopped
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_healthy
    ports:
      - "${HOST_PORT}:8081"
      - "${GRPC_PORT}:9012"
    volumes:
      - ./configs/config.docker.yaml:/data/conf/config.yaml:ro
      - npanel_logs:/app/logs

volumes:
  npanel_mysql:
  npanel_redis:
  npanel_logs:
COMPOSE_EOF

    cat > .env <<ENV_EOF
NPANEL_VERSION=$NPANEL_VERSION
HOST_PORT=$HOST_PORT
GRPC_PORT=$GRPC_PORT
MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
MYSQL_DB=$MYSQL_DB
MYSQL_USER=$MYSQL_USER
MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV_EOF
}

write_config() {
    log_step "Writing NPanel configuration..."

    cat > configs/config.docker.yaml <<EOF
server:
  http:
    addr: 0.0.0.0:8081
    timeout: 55s
  grpc:
    addr: 0.0.0.0:9012
    timeout: 55s
  auth:
    enable_jwt: true
    jwt_secret: "$JWT_SECRET"
    no_auth_paths:
      - "/api.public.auth.v1."
      - "/api.public.common.v1."
      - "/api/public/auth/"
      - "/api/public/common/"
      - "/api.server."
  cors:
    enable: true
    allowed_origins:
      - "*"
    allowed_methods:
      - "GET"
      - "POST"
      - "PUT"
      - "DELETE"
      - "OPTIONS"
    allowed_headers:
      - "*"
    exposed_headers:
      - "Content-Length"
      - "Authorization"
    allow_credentials: true
    max_age: 86400

log:
  level: info
  format: json
  disable_console: false
  path: logs
  max_size_mb: 100
  max_backups: 30
  max_age_days: 7
  compress: true

data:
  database:
    driver: mysql
    source: $MYSQL_USER:$MYSQL_PASSWORD@tcp(mysql:3306)/$MYSQL_DB?parseTime=True&loc=Local
  redis:
    addr: redis:6379
    password:
    read_timeout: 0.2s
    write_timeout: 0.2s
    db: 0
    pool_size: 10
    min_idle_conns: 5

app:
  site:
    host: "$SITE_HOST"
    site_name: "NPanel"
    site_desc: "NPanel open-source proxy panel"
    site_logo: "/assets/logo.png"
    keywords: "panel,management,npanel"
    custom_html: ""
    custom_data: ""

  verify:
    turnstile_site_key: ""
    enable_login_verify: false
    enable_register_verify: false
    enable_reset_password_verify: false

  mobile:
    enable: false
    enable_whitelist: false
    whitelist: []

  email:
    enable: false
    enable_verify: false
    enable_domain_suffix: false
    domain_suffix_list: ""

  register:
    stop_register: false
    enable_ip_register_limit: false
    ip_register_limit: 5
    ip_register_limit_duration: 3600
    enable_trial: false
    trial_subscribe: 7
    trial_time_unit: "day"
    trial_time: 7

  invite:
    forced_invite: false
    referral_percentage: 10
    only_first_purchase: true

  subscribe:
    single_model: false
    subscribe_path: "/subscribe"
    subscribe_domain: ""
    pan_domain: false
    user_agent_limit: false
    user_agent_list: ""

  admin:
    email: "$ADMIN_EMAIL"
    password: "$ADMIN_PASSWORD"
    algo: "default"
EOF
}

start_service() {
    log_step "Building and starting NPanel..."
    docker compose up -d --build
}

show_access_info() {
    local public_ip
    public_ip=$(curl -s --max-time 5 https://api.ipify.org 2>/dev/null || curl -s --max-time 5 https://ifconfig.me 2>/dev/null || echo "")

    echo ""
    echo "========================================"
    log_info "NPanel installation completed"
    echo "========================================"
    echo "Local URL:  http://localhost:$HOST_PORT"
    if [[ -n "$public_ip" ]]; then
        echo "Public URL: http://$public_ip:$HOST_PORT"
    fi
    echo ""
    log_info "Admin account:"
    echo "Email:    $ADMIN_EMAIL"
    echo "Password: $ADMIN_PASSWORD"
    echo ""
    log_info "Installation directory: $INSTALL_DIR"
    log_info "Logs: cd $INSTALL_DIR && docker compose logs -f npanel"
}

main() {
    echo "========================================"
    echo "  NPanel One-Click Installer"
    echo "========================================"

    check_requirements
    check_port "$HOST_PORT"
    check_port "$GRPC_PORT"
    prepare_variables
    fetch_backend
    write_compose
    write_config
    start_service
    show_access_info
}

main "$@"
