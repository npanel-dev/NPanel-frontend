# 一键部署

使用自动化安装脚本快速部署 NPanel。适合快速测试或生产环境部署。

## 前置条件

- 干净的 Linux 服务器 (Ubuntu 20.04+, Debian 10+, CentOS 8+)
- Root 或 sudo 访问权限
- 基本的网络连接

## 安装步骤

### 方式一：完整安装（推荐）

一条命令同时安装 Docker 和 NPanel：

```bash
curl -fsSL https://npanel.dev/scripts/zh/install-docker.sh | sudo bash && \
curl -fsSL https://npanel.dev/scripts/zh/install-npanel.sh | bash
```

### 方式二：分步安装

如果你希望分别安装各个组件：

#### 步骤 1: 安装 Docker 和 Docker Compose

```bash
curl -fsSL https://npanel.dev/scripts/zh/install-docker.sh | sudo bash
```

此脚本将会：
- ✅ 自动检测你的操作系统
- ✅ 安装 Docker Engine 和 Docker Compose Plugin
- ✅ 配置 Docker 服务开机自启
- ✅ 将当前用户添加到 docker 组
- ✅ 验证安装是否成功

#### 步骤 2: 安装 NPanel

```bash
curl -fsSL https://npanel.dev/scripts/zh/install-npanel.sh | bash
```

此脚本将会：
- ✅ 检查 Docker 环境
- ✅ 检查端口可用性
- ✅ 从 `npanel-dev/NPanel-backend` 克隆后端源码
- ✅ 自动生成 MySQL 密码和 JWT 密钥
- ✅ 创建 docker-compose.yml
- ✅ 构建本地 `npanel:latest` Docker 镜像并启动服务
- ✅ 显示访问信息

## 安装时的配置

安装脚本默认非交互运行，会在安装目录中自动生成 `.env`、`docker-compose.yml` 和 `configs/config.docker.yaml`。如需自定义参数，可在运行脚本前通过环境变量覆盖。

## 自定义安装目录

默认情况下，NPanel 安装到 `~/npanel`。你可以指定自定义目录：

```bash
INSTALL_DIR=/opt/npanel curl -fsSL https://npanel.dev/scripts/zh/install-npanel.sh | bash
```

## 自定义端口

默认情况下，NPanel 监听 HTTP 端口 8081 和 gRPC 端口 9012。要使用其他 HTTP 端口：

```bash
HOST_PORT=3000 curl -fsSL https://npanel.dev/scripts/zh/install-npanel.sh | bash
```

## 部署后配置

### 访问你的安装

安装成功后，你可以访问：

- **用户面板**: `http://your-server-ip:8081`
- **管理后台**: `http://your-server-ip:8081/admin/`

### 常用命令

安装脚本会显示这些有用的命令：

```bash
# 进入安装目录
cd ~/npanel

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f

# 重启服务
docker compose restart

# 停止服务
docker compose stop

# 启动服务
docker compose start
```

### 配置防火墙

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

### 设置反向代理（推荐）

生产环境部署建议配置带 HTTPS 的反向代理：

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

## 升级

进入安装目录，拉取最新后端源码并重新构建 Compose 服务即可升级。

```bash
cd ~/npanel
git pull --ff-only
docker compose up -d --build
```

## 故障排除

### 安装失败

如果安装失败，请检查：

1. **网络连接**: 确保服务器可以访问 Docker Hub 和 GitHub
2. **系统要求**: 验证你的操作系统是否支持
3. **权限**: 确保你有 sudo/root 访问权限
4. **端口可用性**: 检查端口 8081 和 9012 是否可用

### Docker 未找到

如果出现 "Docker not found" 错误：

```bash
# 检查 Docker 是否已安装
docker --version

# 如果未安装，先运行 Docker 安装脚本
curl -fsSL https://npanel.dev/scripts/zh/install-docker.sh | sudo bash
```

### 服务无法启动

查看日志检查错误：

```bash
cd ~/npanel
docker compose logs -f
```

常见问题：
- MySQL 连接失败：检查 MySQL 凭据
- Redis 连接失败：检查 Redis 凭据
- 端口已被占用：更改 HOST_PORT

### 权限被拒绝

如果遇到 Docker 权限错误：

```bash
# 将用户添加到 docker 组
sudo usermod -aG docker $USER

# 注销并重新登录，或运行：
newgrp docker
```

## 卸载

完全移除 NPanel：

```bash
cd ~/npanel
docker compose down
cd ~
rm -rf ~/npanel
```

## 高级选项

### 非交互式安装

对于自动化部署，可以使用环境变量预配置设置：

```bash
export INSTALL_DIR=/opt/npanel
export HOST_PORT=8081
export GRPC_PORT=9012
export MYSQL_USER=npanel
export MYSQL_PASSWORD=your-password
export MYSQL_DB=npanel
export ADMIN_EMAIL=admin@npanel.dev
export ADMIN_PASSWORD=change-this-password

curl -fsSL https://npanel.dev/scripts/zh/install-npanel.sh | bash
```

### 代理环境下安装

如果你的服务器在代理后面：

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080

curl -fsSL https://npanel.dev/scripts/zh/install-docker.sh | sudo bash
curl -fsSL https://npanel.dev/scripts/zh/install-npanel.sh | bash
```

## 下一步

- [配置指南](/zh/guide/configuration) - 自定义你的 NPanel 设置
- [管理后台](/zh/admin/dashboard) - 开始管理你的面板
- [API 参考](/zh/api/reference) - 与你的应用集成

## 需要帮助？

- 查看 [GitHub Issues](https://github.com/npanel-dev/NPanel/issues)
- 查看安装日志
- 加入我们的社区获取支持
