# Docker Compose 部署

Docker Compose 是 NPanel 推荐部署方式。它会在本地构建后端源码，并启动所有必需服务。

## 快速开始

```bash
git clone https://github.com/npanel-dev/NPanel-backend.git
cd NPanel-backend
docker compose up -d --build
```

后端仓库已经包含 Compose 文件，会构建 `npanel:latest` 并启动：

- MySQL 8.4
- Redis 7
- NPanel HTTP 服务，端口 `8081`
- NPanel gRPC 服务，端口 `9012`

## 配置

生产环境使用前请编辑：

```text
.env
configs/config.docker.yaml
```

应用配置会挂载到容器内：

```text
/data/conf/config.yaml
```

## 常用命令

```bash
docker compose ps
docker compose logs -f npanel
docker compose restart
docker compose down
```

## 端口

如需修改暴露端口，请编辑 `.env`：

```dotenv
HOST_PORT=8081
GRPC_PORT=9012
```

## 升级

```bash
git pull --ff-only
docker compose up -d --build
```
