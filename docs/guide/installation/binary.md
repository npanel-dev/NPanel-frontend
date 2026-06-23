# Binary Deployment

This guide shows you how to deploy NPanel using pre-built binary executables. This method is suitable for users who prefer not to use Docker or need more control over the deployment.

## Prerequisites

- **Operating System**: Linux (Ubuntu 20.04+, Debian 10+, CentOS 8+)
- **Architecture**: amd64 (x86_64) or arm64
- **Permissions**: Root or sudo access
- **Dependencies**: None (binaries are statically compiled)

## Download Binary

### Step 1: Check System Architecture

```bash
# Check your system architecture
uname -m
# Output: x86_64 (amd64) or aarch64 (arm64)
```

### Step 2: Download Latest Release

Visit the [GitHub Releases](https://github.com/npanel-dev/NPanel/releases) page or download directly:

::: tip Installation Directory
You can install NPanel in any directory. This guide uses `/opt/NPanel` as an example. If you choose a different directory, adjust the paths in subsequent commands accordingly.
:::

```bash
# Create installation directory (customizable)
sudo mkdir -p /opt/NPanel
cd /opt/NPanel

# Download for Linux amd64
wget https://github.com/npanel-dev/NPanel/releases/latest/download/gateway-linux-amd64.tar.gz

# Or for Linux arm64
# wget https://github.com/npanel-dev/NPanel/releases/latest/download/gateway-linux-arm64.tar.gz

# Or for macOS amd64
# wget https://github.com/npanel-dev/NPanel/releases/latest/download/gateway-darwin-amd64.tar.gz

# Or for macOS arm64 (Apple Silicon)
# wget https://github.com/npanel-dev/NPanel/releases/latest/download/gateway-darwin-arm64.tar.gz

# Extract
tar -xzf gateway-linux-amd64.tar.gz

# Verify extracted files
ls -la
```

Expected files:
```
/opt/NPanel/
├── gateway          # Gateway executable
└── etc/             # Configuration directory
    └── NPanel.yaml  # Configuration file
```

## Configuration

### Step 1: Prepare Configuration

```bash
# Edit configuration
sudo nano /opt/NPanel/etc/NPanel.yaml
```

**Configuration Example:**

::: tip Relative Paths
Paths in the configuration (such as `Path`, `logs`, etc.) support relative paths. Relative paths are relative to the program's working directory (WorkingDirectory), which is `/opt/NPanel` in the systemd service.
:::

```yaml
Host: 0.0.0.0
Port: 8080
TLS:
    Enable: false
    CertFile: ""
    KeyFile: ""
Debug: false

Static:
  Admin:
    Enabled: true
    Prefix: /admin
    Path: ./static/admin
  User:
    Enabled: true
    Prefix: /
    Path: ./static/user

JwtAuth:
    AccessSecret: your-secret-key-change-this
    AccessExpire: 604800

Logger:
    ServiceName: ApiService
    Mode: console
    Encoding: plain
    TimeFormat: "2006-01-02 15:04:05.000"
    Path: logs
    Level: info
    MaxContentLength: 0
    Compress: false
    Stat: true
    KeepDays: 0
    StackCooldownMillis: 100
    MaxBackups: 0
    MaxSize: 0
    Rotation: daily
    FileTimeFormat: 2006-01-02T15:04:05.000Z07:00

MySQL:
    Addr: localhost:3306
    Username: your-username
    Password: your-password
    Dbname: NPanel
    Config: charset=utf8mb4&parseTime=true&loc=Asia%2FShanghai
    MaxIdleConns: 10
    MaxOpenConns: 10
    SlowThreshold: 1000

Redis:
    Host: localhost:6379
    Pass: your-redis-password
    DB: 0
```

::: warning Required Configuration
**MySQL and Redis are required.** Please configure the following before deployment:
- `JwtAuth.AccessSecret` - Use a strong random secret (required)
- `MySQL.*` - Configure your MySQL database connection (required)
- `Redis.*` - Configure your Redis connection (required)
:::

### Step 2: Create Required Directories

```bash
# Create data and log directories
sudo mkdir -p /opt/NPanel/data
sudo mkdir -p /opt/NPanel/logs
sudo mkdir -p /opt/NPanel/static

# Set proper permissions
sudo chmod 755 /opt/NPanel
sudo chmod 700 /opt/NPanel/data
sudo chmod 755 /opt/NPanel/logs
sudo chmod 755 /opt/NPanel/static
```

## Running the Service

### Method 1: Direct Execution (Testing)

For quick testing:

```bash
# Make binary executable
sudo chmod +x /opt/NPanel/gateway

# Run directly
cd /opt/NPanel
sudo ./gateway
```

Press `Ctrl+C` to stop.

### Method 2: Systemd Service (Recommended)

Create a systemd service for production deployment:

#### Step 1: Create Service File

```bash
sudo nano /etc/systemd/system/NPanel.service
```

**Service File Content:**

```ini
[Unit]
Description=NPanel Server
Documentation=https://github.com/npanel-dev/NPanel
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/NPanel
ExecStart=/opt/NPanel/gateway
Restart=always
RestartSec=10

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/NPanel/data /opt/NPanel/logs

# Resource limits
LimitNOFILE=65535
LimitNPROC=4096

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=NPanel

[Install]
WantedBy=multi-user.target
```

#### Step 2: Enable and Start Service

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service (start on boot)
sudo systemctl enable NPanel

# Start service
sudo systemctl start NPanel

# Check status
sudo systemctl status NPanel
```

## Service Management

### Check Status

```bash
# Check if service is running
sudo systemctl status NPanel

# View detailed status
sudo systemctl show NPanel
```

### View Logs

```bash
# View systemd logs
sudo journalctl -u NPanel -f

# View last 100 lines
sudo journalctl -u NPanel -n 100

# View application logs
sudo tail -f /opt/NPanel/logs/NPanel.log
```

### Start/Stop/Restart

```bash
# Start service
sudo systemctl start NPanel

# Stop service
sudo systemctl stop NPanel

# Restart service
sudo systemctl restart NPanel

# Reload configuration (if supported)
sudo systemctl reload NPanel
```

### Enable/Disable Auto-start

```bash
# Enable auto-start on boot
sudo systemctl enable NPanel

# Disable auto-start
sudo systemctl disable NPanel

# Check if enabled
sudo systemctl is-enabled NPanel
```

## Post-Installation

### Verify Installation

```bash
# Check if service is listening
sudo netstat -tlnp | grep 8080

# Or use ss
sudo ss -tlnp | grep 8080

# Test HTTP access
curl http://localhost:8080

# Check process
ps aux | grep NPanel
```

### Access the Application

- **User Panel**: `http://your-server-ip:8080`
- **Admin Panel**: `http://your-server-ip:8080/admin/`

::: warning Default Credentials
**Default Administrator Account**:
- **Email**: `admin@npanel.dev`
- **Password**: `password`

**Security**: Change the default credentials immediately after first login.
:::

### Configure Firewall

```bash
# Ubuntu/Debian (UFW)
sudo ufw allow 8080/tcp
sudo ufw status

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload
sudo firewall-cmd --list-ports
```

### Setup Reverse Proxy

For production, use Nginx or Caddy as reverse proxy:

**Nginx Configuration** (`/etc/nginx/sites-available/NPanel`):

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable the configuration:
```bash
sudo ln -s /etc/nginx/sites-available/NPanel /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Upgrading

Upgrade NPanel directly from the **Admin Dashboard**. On the dashboard homepage, you can check for new versions and upgrade with one click.

::: tip
The system will automatically handle the upgrade process, including downloading the new binary and restarting the service.
:::

## Troubleshooting

### Service Fails to Start

```bash
# Check detailed logs
sudo journalctl -u NPanel -xe

# Check configuration syntax
/opt/NPanel/npanel --check-config

# Verify permissions
ls -la /opt/NPanel
sudo chown -R root:root /opt/NPanel
```

### Port Already in Use

```bash
# Find what's using the port
sudo lsof -i :8080
sudo netstat -tlnp | grep 8080

# Change port in configuration
sudo nano /opt/NPanel/etc/NPanel.yaml
# Update server.port value

# Restart service
sudo systemctl restart NPanel
```

### Binary Won't Execute

```bash
# Check architecture compatibility
uname -m
file /opt/NPanel/gateway

# Check if executable
ls -la /opt/NPanel/gateway
sudo chmod +x /opt/NPanel/gateway

# Check for missing libraries (should be none for static binary)
ldd /opt/NPanel/gateway
```

### High Memory Usage

```bash
# Check memory usage
ps aux | grep NPanel
top -p $(pgrep npanel)

# Add memory limit to systemd service
sudo nano /etc/systemd/system/NPanel.service
# Add under [Service]:
# MemoryMax=2G
# MemoryHigh=1.5G

sudo systemctl daemon-reload
sudo systemctl restart NPanel
```

### Database Connection Issues

```bash
# Check database file permissions
ls -la /opt/NPanel/data/

# For SQLite, verify path in config
sudo nano /opt/NPanel/etc/NPanel.yaml

# Test database connection
sqlite3 /opt/NPanel/data/NPanel.db "SELECT 1;"

# Check logs for database errors
sudo journalctl -u NPanel | grep -i database
```

## Uninstallation

To completely remove NPanel:

```bash
# Stop and disable service
sudo systemctl stop NPanel
sudo systemctl disable NPanel

# Remove service file
sudo rm /etc/systemd/system/NPanel.service
sudo systemctl daemon-reload

# Remove installation directory
sudo rm -rf /opt/NPanel

# Remove firewall rules (if added)
sudo ufw delete allow 8080/tcp
# or
sudo firewall-cmd --permanent --remove-port=8080/tcp
sudo firewall-cmd --reload
```

## Advanced Configuration

### Running as Non-Root User

For better security, run as dedicated user:

```bash
# Create dedicated user
sudo useradd -r -s /bin/false NPanel

# Change ownership
sudo chown -R NPanel:NPanel /opt/NPanel

# Update systemd service
sudo nano /etc/systemd/system/NPanel.service
# Change: User=NPanel

# If binding to port < 1024, grant capability
sudo setcap 'cap_net_bind_service=+ep' /opt/NPanel/gateway

sudo systemctl daemon-reload
sudo systemctl restart NPanel
```

### Multiple Instances

To run multiple instances:

```bash
# Create separate directories
sudo mkdir -p /opt/NPanel-1
sudo mkdir -p /opt/NPanel-2

# Copy binaries and configs
sudo cp -r /opt/NPanel/* /opt/NPanel-1/
sudo cp -r /opt/NPanel/* /opt/NPanel-2/

# Edit configs with different ports
sudo nano /opt/NPanel-1/etc/NPanel.yaml  # port: 8081
sudo nano /opt/NPanel-2/etc/NPanel.yaml  # port: 8082

# Create separate systemd services
sudo cp /etc/systemd/system/NPanel.service /etc/systemd/system/NPanel-1.service
sudo cp /etc/systemd/system/NPanel.service /etc/systemd/system/NPanel-2.service

# Edit service files accordingly
sudo systemctl daemon-reload
sudo systemctl enable NPanel-1 NPanel-2
sudo systemctl start NPanel-1 NPanel-2
```

### Custom Environment Variables

Add environment variables to systemd service:

```ini
[Service]
Environment="NPanel_ENV=production"
Environment="NPanel_DEBUG=false"
EnvironmentFile=/opt/NPanel/env.conf
```

## Performance Tuning

### Optimize File Limits

```bash
# Edit limits
sudo nano /etc/security/limits.conf

# Add:
* soft nofile 65535
* hard nofile 65535

# For systemd service, already set in service file:
# LimitNOFILE=65535
```

### Enable Database Optimization

For SQLite:

```bash
# Add to NPanel.yaml
database:
  type: sqlite
  path: /opt/NPanel/data/NPanel.db
  options:
    cache_size: -2000
    journal_mode: WAL
    synchronous: NORMAL
```

## Next Steps

- [Configuration Guide](/guide/configuration) - Detailed configuration options
- [Admin Dashboard](/admin/dashboard) - Start managing your panel
- [API Reference](/api/reference) - API integration

## Need Help?

- Check [GitHub Issues](https://github.com/npanel-dev/NPanel/issues)
- Review systemd logs: `sudo journalctl -u NPanel -f`
- Check application logs: `tail -f /opt/NPanel/logs/NPanel.log`
