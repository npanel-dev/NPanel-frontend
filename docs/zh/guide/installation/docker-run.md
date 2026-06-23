# Docker Run 部署

生产环境推荐使用 Docker Compose。只有在你已经拥有外部 MySQL 与 Redis，并且只想运行单个 NPanel 容器时，才建议使用 `docker run`。

## 构建镜像

```bash
git clone https://github.com/npanel-dev/NPanel-backend.git
cd NPanel-backend
docker build -t npanel:latest .
```

## 准备配置

```bash
mkdir -p ./npanel-config
cp configs/config.docker.yaml ./npanel-config/config.yaml
```

编辑 `./npanel-config/config.yaml`，将 `data.database.source` 和 `data.redis.addr` 指向你的外部服务。

## 运行

```bash
docker run -d \
  --name npanel \
  -p 8081:8081 \
  -p 9012:9012 \
  -v "$(pwd)/npanel-config:/data/conf:ro" \
  npanel:latest
```

## 运维命令

```bash
docker logs -f npanel
docker restart npanel
docker stop npanel
docker rm npanel
```
