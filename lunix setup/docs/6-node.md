https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04
https://selectel.ru/blog/tutorials/how-to-install-node-js-on-ubuntu-20-04/

https://cloudpayments1.tk/app2/overview



```
systemctl restart nginx
```

ls /var/www/cloudpayments1.tk/node

node /var/www/cloudpayments1.tk/node/server.js
nodemon server.js

cd /var/www/cloudpayments1.tk/node
ts-node ./src/send_payment.ts
nodemon server.js

/var/www/cloudpayments1.tk/node/node_modules/.bin/nodemon /var/www/cloudpayments1.tk/node/server.js
./node_modules/.bin/nodemon server.js


/root/.nvm/versions/node/v16.16.0/bin/node

tmux attach
Ctrl B D


tmux new -s node
tmux attach -t  node
tmux list-commands
tmux ls
