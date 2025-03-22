module.exports = {
  apps : [{
    name: 'real-estate-api',
    script: 'dist/server.js',
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: '8080',
      DB_USER:'real_estate_admin',
      DB_PASSWORD: 'secret_password',
      DB_NAME: 'real_estate',
      DB_PORT: '5432',
      JWT_SECRET: 'secret',
      JWT_EXPIRES_IN: '1d',
      OPENCAGE_API_KEY: '8954668604a54dd7a2bdea5a0de3acbc',
      DB_HOST: '209.38.200.92',
  },
// {
//    script: './service-worker/',
//    watch: ['./service-worker']
//  }
}],

  deploy : {
    production : {
      user : 'devopuser',
      host : '209.38.200.92',
      ref  : 'origin/main',
      repo : 'https://github.com/AbdourahmanJallow/real-estate.git',
      path : '/home/devopuser/real-estate',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && npm run migration:run && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
