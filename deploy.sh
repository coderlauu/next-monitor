#!/bin/bash
# deploy.sh

set -e

echo "🚀 开始部署监控系统..."

# 拉取最新代码
git pull origin main

# 构建前端
echo "📦 构建前端应用..."
cd apps/frontend/monitor
pnpm install
pnpm build
cd ../../..

# 构建并启动服务
echo "🐳 启动Docker服务..."
docker compose -f .devcontainer/docker-compose.prod.yml down
docker compose -f .devcontainer/docker-compose.prod.yml build --no-cache
docker compose -f .devcontainer/docker-compose.prod.yml up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 30

# 检查服务状态
echo "✅ 检查服务状态..."
docker compose -f .devcontainer/docker-compose.prod.yml ps

echo "🎉 部署完成！"
echo "📱 访问地址: 8.134.122.242"