# Сайт

Создаёт папку для сайта

```
mkdir -p /var/www/cloudpayments1.tk/html
mkdir -p /var/www/makeupkitchen.ga/html
```

Добавляет индексный файл

```
nano /var/www/cloudpayments1.tk/html/index.html
nano /var/www/makeupkitchen.ga/html/index.html
```

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <title>Например curl makeupkitchen.ga</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Например curl makeupkitchen.ga</h1>
</body>
</html>
```

Создаёт папки для конфига

```
mkdir -p /etc/nginx/sites-available/
mkdir -p /etc/nginx/sites-enabled/
```

Правит конфиг

```
nano /etc/nginx/sites-available/cloudpayments1.tk.conf
nano /etc/nginx/sites-available/makeupkitchen.ga.conf
```

```
server {
    listen 80;
    listen [::]:80;

    server_name cloudpayments1.tk www.cloudpayments1.tk;
    root /var/www/cloudpayments1.tk/html;
    index index.html index.xml;
}
```


```
server {
    listen 80;
    listen [::]:80;

    server_name makeupkitchen.ga www.makeupkitchen.ga;
    root /var/www/makeupkitchen.ga/html;
    index index.html index.xml;
}
```

Включает конфиг

```
ln -s /etc/nginx/sites-available/cloudpayments1.tk.conf /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/makeupkitchen.ga.conf /etc/nginx/sites-enabled/
```

Проверяет конфиг

```
nginx -t
```

Рестартует nginx

```
sudo systemctl restart nginx
```

Проверяет домен

```
curl cloudpayments1.tk
curl makeupkitchen.ga
```
