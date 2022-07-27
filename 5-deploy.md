# Деплой

Копирует содержимое текущей папки

```
rsync --archive --compress --delete . user@example.com:/var/www/example.com/html/
```
. - текущапя папка



cd /mnt/f/tempg/cloudpayments/var/www/cloudpayments1.tk/html


rsync -avz --delete --progress -e "ssh -p 22"  /mnt/f/tempg/cloudpayments/var/www/cloudpayments1.tk/html/ cp:/var/www/cloudpayments1.tk/html/

rsync -avz --delete --progress -e "ssh -p 22"  /mnt/f/tempg/cloudpayments/var/www/cloudpayments1.tk/node/ cp:/var/www/cloudpayments1.tk/node/

avz 
a - archive 
z - compress
v - verbose


ls /root/.ssh/comp_cloud/id_rsa-private.txt
chmod 600 /root/.ssh/comp_cloud/id_rsa-private.txt