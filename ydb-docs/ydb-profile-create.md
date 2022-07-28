## Команды YDB CLI
https://cloud.yandex.ru/docs/ydb/reference/ydb-cli/commands

## Создай сервсиный аккаунт 
нажми на каталог/Сервисные аккаунты

Создай в каталоге (в котором размещена база) сервисный аккаунт с именем
```
srv-acc-ydb-access
```
дай ему права админ

## Создай авторизованный ключ для сервисного аккаунта
Для создания авторизованного ключа для сервисного аккаунта воспользуйтесь документацией: [Ссылка](https://cloud.yandex.ru/docs/iam/operations/authorized-key/create)

Запусти команду (предварительно настрой yc)
```bash
yc iam key create --service-account-name srv-acc-ydb-access -o service_account_key_file.json
```

Ключ будет лежать в корне проекта и называться так: 
```bash
service_account_key_file.json
```

### удали старый профиль
ydb config profile delete import1C

### создай профиль
```bash
ydb config profile create import1C
```

при создании профиля будут спрашивать параметры

введи параметры:
grpcs://ydb.serverless.yandexcloud.net:2135

база данных - введи параметр "База данных" из обзора:
/ru-central1/b1gu1b9o1gq4ptfngmvq/etn85ishlocokootp7et

На последнем шаге спросят:
```
Pick desired action to configure authentication method:

нажми цифру 5
[5] Use service account key file (sa-key-file)
введи значение

/mnt/f/_prg/battery-istochnik-eleventy/service_account_key_file.json
```

На вопрос
```Activate profile "import1C" to use by default?```
ответь Yes

### Проверка профиля

```bash
проверь виден ли профиль
ydb config profile list

посмотри схему базы данных на которую настроен профиль
ydb scheme ls

запрос схемы YDB при обращении к профилю
ydb -p import1C  scheme ls
```

Если что то не так - удали профиль и начни все заново.

активация другого профиля:
```
ydb config profile activate istapi
```

### Список комманд YDB 
[Список комманд YDB](https://cloud.yandex.ru/docs/ydb/reference/ydb-cli/commands)