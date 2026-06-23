# One-Click Deployment

The quickest way to deploy NPanel using automated installation scripts. It is suitable for quick testing and production deployment.

## Prerequisites

- Clean Linux server (Ubuntu 20.04+, Debian 10+, CentOS 8+)
- Root or sudo access
- Basic network connectivity

## Installation Steps

### Option 1: Complete Installation (Recommended)

Install both Docker and NPanel in one command:

```bash
curl -fsSL https://npanel.dev/scripts/en/install-docker.sh | sudo bash && \
curl -fsSL https://npanel.dev/scripts/en/install-npanel.sh | bash
```

### Option 2: Step-by-Step Installation

If you prefer to install components separately:

#### Step 1: Install Docker & Docker Compose

```bash
curl -fsSL https://npanel.dev/scripts/en/install-docker.sh | sudo bash
```

This script will:
- ✅ Automatically detect your operating system
- ✅ Install Docker Engine and Docker Compose Plugin
- ✅ Configure Docker service to start on boot
- ✅ Add current user to docker group
- ✅ Verify installation

#### Step 2: Install NPanel

```bash
curl -fsSL https://npanel.dev/scripts/en/install-npanel.sh | bash
```

This script will:
- ✅ Check Docker environment
- ✅ Check port availability
- ✅ Clone the backend source from `npanel-dev/NPanel-backend`
- ✅ Generate MySQL password and JWT secret automatically
- ✅ Create docker-compose.yml
- ✅ Build the local `npanel:latest` Docker image and start services
- ✅ Display access information

## Configuration During Installation

The installation script is non-interactive by default. It automatically creates `.env`, `docker-compose.yml`, and `configs/config.docker.yaml` in the installation directory. You can override values with environment variables before running the script.

## Custom Installation Directory

By default, NPanel is installed to `~/npanel`. You can specify a custom directory:

```bash
INSTALL_DIR=/opt/npanel curl -fsSL https://npanel.dev/scripts/en/install-npanel.sh | bash
```

## Custom Port

By default, NPanel listens on HTTP port 8081 and gRPC port 9012. To use a different HTTP port:

```bash
HOST_PORT=3000 curl -fsSL https://npanel.dev/scripts/en/install-npanel.sh | bash
```

## Post-Installation

### Access Your Installation

After successful installation, you can access:

- **User Panel**: `http://your-server-ip:8081`
- **Admin Panel**: `http://your-server-ip:8081/admin/`

### Common Commands

The installation script displays these useful commands:

```bash
# Navigate to installation directory
cd ~/npanel

# Check service status
docker compose ps

# View logs
docker compose logs -f

# Restart services
docker compose restart

# Stop services
docker compose stop

# Start services
docker compose start
```

### Configure Firewall

**Ubuntu/Debian:**
```bash
sudo ufw allow 8081/tcp
sudo ufw allow 8081/tcp
sudo ufw status
```

**CentOS/RHEL:**
```bash
sudo firewall-cmd --permanent --add-port=8081/tcp
sudo firewall-cmd --permanent --add-port=8081/tcp
sudo firewall-cmd --reload
```

### Setup Reverse Proxy (Recommended)

For production deployments, configure a reverse proxy with HTTPS:

**Nginx:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Caddy:**
```
your-domain.com {
    reverse_proxy localhost:8081
}
```

## Upgrading

Upgrade by entering the installation directory, pulling the latest backend source, and rebuilding the Compose stack.

```bash
cd ~/npanel
git pull --ff-only
docker compose up -d --build
```

## Troubleshooting

### Installation Failed

If the installation fails, check:

1. **Internet connectivity**: Ensure your server can access Docker Hub and GitHub
2. **System requirements**: Verify your OS is supported
3. **Permissions**: Make sure you have sudo/root access
4. **Port availability**: Check if ports 8081 and 9012 are available

### Docker Not Found

If you get "Docker not found" error:

```bash
# Check if Docker is installed
docker --version

# If not installed, run the Docker installation script first
curl -fsSL https://npanel.dev/scripts/en/install-docker.sh | sudo bash
```

### Service Won't Start

Check the logs for errors:

```bash
cd ~/npanel
docker compose logs -f
```

Common issues:
- MySQL connection failed: Check MySQL credentials
- Redis connection failed: Check Redis credentials
- Port already in use: Change the HOST_PORT

### Permission Denied

If you get permission errors with Docker:

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and log back in, or run:
newgrp docker
```

## Uninstalling

To completely remove NPanel:

```bash
cd ~/npanel
docker compose down
cd ~
rm -rf ~/npanel
```

## Advanced Options

### Non-Interactive Installation

For automated deployments, you can pre-configure settings using environment variables:

```bash
export INSTALL_DIR=/opt/npanel
export HOST_PORT=8081
export GRPC_PORT=9012
export MYSQL_USER=npanel
export MYSQL_PASSWORD=your-password
export MYSQL_DB=npanel
export ADMIN_EMAIL=admin@npanel.dev
export ADMIN_PASSWORD=change-this-password

curl -fsSL https://npanel.dev/scripts/en/install-npanel.sh | bash
```

### Installation Behind Proxy

If your server is behind a proxy:

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080

curl -fsSL https://npanel.dev/scripts/en/install-docker.sh | sudo bash
curl -fsSL https://npanel.dev/scripts/en/install-npanel.sh | bash
```

## Next Steps

- [Configuration Guide](/guide/configuration) - Customize your NPanel setup
- [Admin Dashboard](/admin/dashboard) - Start managing your panel
- [API Reference](/api/reference) - Integrate with your applications

## Need Help?

- Check [GitHub Issues](https://github.com/npanel-dev/NPanel/issues)
- Review installation logs
- Join our community for support
