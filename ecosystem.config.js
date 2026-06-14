/**
 * PM2 ecosystem file for GreenAI (Next.js)
 *
 * Deploy:
 *   pnpm install
 *   pnpm run build
 *   pm2 start ecosystem.config.js --env production
 *
 * Other commands:
 *   pm2 reload greenai
 *   pm2 logs greenai
 *   pm2 stop greenai
 */
module.exports = {
  apps: [
    {
      name: 'greenai',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      merge_logs: true,
      time: true,
      out_file: './logs/pm2-out.log',
      error_file: './logs/pm2-error.log',
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
};
