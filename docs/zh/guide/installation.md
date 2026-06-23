# 安装指南

本指南介绍 NPanel 推荐部署方式。当前 Docker 工作流会从后端源码仓库构建镜像，并通过 Docker Compose 启动 MySQL、Redis、HTTP 与 gRPC 服务。

## 推荐方式：一键 Docker Compose

```bash
curl -fsSL https://npanel.dev/scripts/zh/install-docker.sh | sudo bash && \
curl -fsSL https://npanel.dev/scripts/zh/install-npanel.sh | bash
```

安装脚本会：

- 克隆 [npanel-dev/NPanel-backend](https://github.com/npanel-dev/NPanel-backend)
- 构建本地 `npanel:latest` 镜像
- 写入 `.env`、`docker-compose.yml` 与 `configs/config.docker.yaml`
- 启动 MySQL、Redis、NPanel HTTP `8081` 与 gRPC `9012`

## 手动 Docker Compose

```bash
git clone https://github.com/npanel-dev/NPanel-backend.git
cd NPanel-backend
docker compose up -d --build
```

生产环境使用前请检查：

- `.env`
- `configs/config.docker.yaml`

## 访问地址

- 用户端：`http://your-server-ip:8081`
- 管理端：`http://your-server-ip:8081/admin/`

一键安装脚本会生成默认管理员账号。如果你从后端仓库手动部署，请查看 `configs/config.docker.yaml`。

## 运维命令

```bash
cd ~/npanel
docker compose ps
docker compose logs -f npanel
docker compose restart
```

## 升级

```bash
cd ~/npanel
git pull --ff-only
docker compose up -d --build
```

## 更多

- [一键部署](./installation/one-click.md)
- [Docker Compose 部署](./installation/docker-compose.md)
- [Docker Run 部署](./installation/docker-run.md)
- [二进制部署](./installation/binary.md)
