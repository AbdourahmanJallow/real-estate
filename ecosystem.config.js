import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  apps: [
    {
      name: 'real-estate-api',
      script: 'dist/server.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        JWT_SECRET: process.env.JWT_SECRET,
        OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
      },
      // {
      //    script: './service-worker/',
      //    watch: ['./service-worker']
      //  }
    },
  ],

  deploy: {
    production: {
      user: process.env.SSH_USER || 'user',
      host: process.env.DB_HOST || 'localhost',
      ref: 'origin/main',
      repo: process.env.REPO_URL || '',
      path: process.env.DEPLOY_PATH || '/var/www/production',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && npm run build && npm run migration:run && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
