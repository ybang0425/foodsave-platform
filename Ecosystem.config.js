module.exports = {
  apps: [
    {
      name: 'foodsave-server',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 5000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_memory_restart: '1G',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      exp_backoff_restart_delay: 100
    }
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: process.env.DEPLOY_HOST,
      ref: 'origin/main',
      repo: 'git@github.com:logisave/foodsave-platform.git',
      path: '/var/www/foodsave',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && cd client && npm install && npm run build && cd .. && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
