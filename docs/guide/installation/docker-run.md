# Docker Run Deployment

Docker Compose is recommended for production. Use `docker run` only when you already have external MySQL and Redis services and want to run a single NPanel container.

## Build The Image

```bash
git clone https://github.com/npanel-dev/NPanel-backend.git
cd NPanel-backend
docker build -t npanel:latest .
```

## Prepare Configuration

```bash
mkdir -p ./npanel-config
cp configs/config.docker.yaml ./npanel-config/config.yaml
```

Edit `./npanel-config/config.yaml` and point `data.database.source` and `data.redis.addr` to your external services.

## Run

```bash
docker run -d \
  --name npanel \
  -p 8081:8081 \
  -p 9012:9012 \
  -v "$(pwd)/npanel-config:/data/conf:ro" \
  npanel:latest
```

## Operations

```bash
docker logs -f npanel
docker restart npanel
docker stop npanel
docker rm npanel
```
