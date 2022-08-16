Последовательность обмена

#### 1. Браузер
Сформировать криптограмму, послать на свой сервер makeupkitchen.ga
/app2/rcvcard

#### 2. Сервер makeupkitchen.ga получил криптограмму, invoice id, amount

#### 3. Сервер makeupkitchen.ga
Вызвал POST:
https://api.cloudpayments.ru/payments/cards/charge
передал заголовки
  HTTP Basic Auth

Передал данные
  Amount: amount,
  IpAddress: realIP as string,
  CardCryptogramPacket: cryptogramm,
  InvoiceId: invoiceID,

#### 4. Cloudpayments
Принял от меня запрос, вернул ответ с требованием 3D Secure

#### 5. Передал в браузер передресацию на адрес AcsUrl + параметры
MD — параметр TransactionId из ответа сервера;
PaReq — одноименный параметр из ответа сервера;
TermUrl — адрес на вашем сайте для возврата плательщика после аутентификации.

#### 6. 3D secure вызывает методом POST TermUrl  на сервере  makeupkitchen.ga

**Проблема: в POST тело пустое!!!!**
После аутентификации плательщик будет возвращен на TermUrl с параметрами MD и PaRes, переданными методом POST.

#### 7. Для завершения оплаты вызываю метод Post3ds.

Адрес метода:
https://api.cloudpayments.ru/payments/cards/post3ds

передал заголовки
HTTP Basic Auth

передал в теле Body
TransactionId
PaRes - **проблема!** - поскольку PaRes я не получил - то передал PaReq
