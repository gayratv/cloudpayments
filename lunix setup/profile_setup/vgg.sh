#!/bin/bash
#chmod +x vgg.sh
#sudo cp /home/xud3jc2/download/vgg.sh /etc/profile.d

user=$(whoami)
echo
echo "START script starting"
echo "program vgg.sh in /etc/profile.d"
echo "User : $user"

if [[ "$user" != root ]]
then
  echo "cd Node SRC"
  cd /var/www/makeupkitchen.ga/node
else
  echo "Hello Gayrat"
fi
