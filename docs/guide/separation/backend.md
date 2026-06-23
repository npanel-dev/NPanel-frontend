# Backend Separation Deployment

This guide explains how to deploy the NPanel backend separately from the frontend. The current backend repository is [npanel-dev/NPanel-backend](https://github.com/npanel-dev/NPanel-backend).

## Docker Compose

```bash
git clone https://github.com/npanel-dev/NPanel-backend.git
cd NPanel-backend
docker compose up -d --build
```

The backend listens on:

- HTTP: `8081`
- gRPC: `9012`

Configuration lives in:

```text
configs/config.docker.yaml
```

and is mounted into the container as:

```text
/data/conf/config.yaml
```

## Frontend Connection

Point frontend API requests to your backend HTTP origin:

```env
VITE_API_BASE_URL=https://api.example.com
```

For local testing:

```env
VITE_API_BASE_URL=http://localhost:8081
```

## Reverse Proxy

```nginx
server {
    listen 443 ssl http2;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Operations

```bash
docker compose ps
docker compose logs -f npanel
docker compose restart
```
