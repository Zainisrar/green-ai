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
      // Pin the port here so the app cannot silently come up on a port the
      // reverse proxy is not forwarding to.
      args: 'start --port 3001',
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
      // `next start` only ever serves a production build, so there is no valid
      // NODE_ENV=development configuration here. Defaulting to development made
      // `pm2 start ecosystem.config.js` (without --env production) come up on
      // port 5000 in dev mode, which is indistinguishable from an outage.
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
};
