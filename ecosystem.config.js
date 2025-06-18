const path = require('path')

module.exports = {
    apps: [
        {
            name: 'monitor-backend',
            script: path.join(__dirname, 'apps/backend/monitor/dist/main.js'),
            env: {
                NODE_ENV: 'production',
                PORT: 8001,
            },
            env_development: {
                NODE_ENV: 'development',
                PORT: 8001,
            },
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            autorestart: true,
            max_restarts: 10,
            min_uptime: '10s',
        },
        {
            name: 'dsn-server-backend',
            script: path.join(__dirname, 'apps/backend/dsn-server/dist/main.js'),
            env: {
                NODE_ENV: 'production',
                PORT: 8000,
            },
            env_development: {
                NODE_ENV: 'development',
                PORT: 8000,
            },
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            autorestart: true,
            max_restarts: 10,
            min_uptime: '10s',
        },
    ],
}
