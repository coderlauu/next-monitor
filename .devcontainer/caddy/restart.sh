# 启动 caddy，完成 docker 镜像启动，并且实现反向代理

# 用的 Windows 电脑的话，建议大家 wsl 来学习
# 直接在 WSL 完成执行，或者 Linux 服务器来完成执行

docker run -d \
    --name next-monitor-caddy \
    --restart always \
    -p 8111:80 \
    -p 443:443 \
    -v $PWD/Caddyfile:/etc/caddy/Caddyfile \
    -v /Users/coderlauu/next-monitor/apps/frontend/monitor/dist:/app/frontend/monitor \
    caddy:2.10.0
    # -v $PWD/caddy_data:/data \