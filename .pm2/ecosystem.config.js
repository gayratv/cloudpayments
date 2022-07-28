module.exports = {
  apps : [
  {
    name   : "strapi",
    script : "npm",
    args : "run develop",
    autorestart: false,
    restart_delay: 2000,
    env_production: {
      NODE_ENV: "production"
    },
    cwd: "/var/www/tests-server.xyz/strapi"
  },
    {
      name   : "kraken-read",
      script : "node",
      args : "./worker-read-kraken/kraken-read.js",
      autorestart: true,
      restart_delay: 2000,
      env_production: {
        NODE_ENV: "production"
      },
      cwd: "/var/www/tests-server.xyz/node/"
    } ,
    {
      name   : "kraken-websocket",
      script : "node",
      args : "./worker-websocket/websocket-server.js",
      autorestart: true,
      restart_delay: 2000,
      env_production: {
        NODE_ENV: "production"
      },
      cwd: "/var/www/tests-server.xyz/node/"
    }
]
}
