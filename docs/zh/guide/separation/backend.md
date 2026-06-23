# 后端分离部署

本文介绍如何将 NPanel 后端与前端分离部署。当前后端仓库是 [npanel-dev/NPanel-backend](https://github.com/npanel-dev/NPanel-backend)。

## Docker Compose

```bash
git clone https://github.com/npanel-dev/NPanel-backend.git
cd NPanel-backend
docker compose up -d --build
```

后端监听：

- HTTP：`8081`
- gRPC：`9012`

配置文件位于：

```text
configs/config.docker.yaml
```

并会挂载到容器内：

```text
/data/conf/config.yaml
```

## 前端连接

将前端 API 请求指向你的后端 HTTP 地址：

```env
VITE_API_BASE_URL=https://api.example.com
```

本地测试可使用：

```env
VITE_API_BASE_URL=http://localhost:8081
```

## 反向代理

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

## 运维命令

```bash
docker compose ps
docker compose logs -f npanel
docker compose restart
```
