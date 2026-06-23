# Docker Compose Deployment

Docker Compose is the recommended NPanel deployment method. It builds the backend source locally and starts all required services.

## Quick Start

```bash
git clone https://github.com/npanel-dev/NPanel-backend.git
cd NPanel-backend
docker compose up -d --build
```

The backend repository already includes a Compose file that builds `npanel:latest` and starts:

- MySQL 8.4
- Redis 7
- NPanel HTTP service on `8081`
- NPanel gRPC service on `9012`

## Configuration

Edit these files before production use:

```text
.env
configs/config.docker.yaml
```

The application config is mounted into the container as:

```text
/data/conf/config.yaml
```

## Common Commands

```bash
docker compose ps
docker compose logs -f npanel
docker compose restart
docker compose down
```

## Ports

To change exposed ports, edit `.env`:

```dotenv
HOST_PORT=8081
GRPC_PORT=9012
```

## Upgrade

```bash
git pull --ff-only
docker compose up -d --build
```
