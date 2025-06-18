#!/bin/bash

echo "🏗️  构建前端项目..."
cd apps/frontend/monitor
pnpm build

echo "🏗️  构建 monitor 后端..."
cd ../../backend/monitor
pnpm build

echo "🏗️  构建 dsn-server 后端..."
cd ../dsn-server
pnpm build

echo "📦  安装 PM2 (如果没有安装)..."
cd ../../../
npm install -g pm2

echo "🚀  启动所有服务..."
pm2 start ecosystem.config.js --env development

echo "📊  显示服务状态..."
pm2 status

echo "🌐  重启 Caddy 容器..."
cd .devcontainer/caddy
./restart.sh

echo "✅  所有服务已启动!"
echo "🔗  前端访问: http://localhost:8111"
echo "🔗  Monitor API: http://localhost:8001/api"
echo "🔗  DSN Server API: http://localhost:8000/api"