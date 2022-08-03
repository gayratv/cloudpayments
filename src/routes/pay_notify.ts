/*
Pay
Выполняется после того, как оплата была успешно проведена и получена авторизация эмитента.

  Служит для информирования о проведенном платеже: система отправляет запрос на адрес ТСП с информацией об оплате, а сайт должен зафиксировать факт платежа.

  Параметры передаются в теле запроса, список представлен в следующей таблице:

  Параметр	Формат	Применение	Описание
*/

import { Request, Response } from 'express';
import { TableWork, TableWorkMetaData } from '../utils/ydb-tables';
import { Ydb } from 'ydb-sdk';
import PT = Ydb.Type.PrimitiveTypeId;

// В ответ на запрос система ожидает получить ответ в JSON-формате с обязательным параметром code:
// {"code":0};

export async function paynotify(req: Request, res: Response): Promise<void> {
  console.log(req.body?.TransactionId);
  res.status(200).end(JSON.stringify({ code: 0 }));
}

export class PayNotifyData extends TableWork {
  TransactionId: number; //	Целое число	Обязательный	Номер транзакции в системе
  Amount?: number; // 	Numeric, точка в качестве разделителя, две цифры после точки	Обязательный	Сумма оплаты из параметров платежа
  Currency?: string; //	String	Обязательный	Валюта: RUB/USD/EUR/GBP из параметров платежа (см. справочник)
  PaymentAmount?: string; //	String	Обязательный	Сумма списания
  PaymentCurrency?: string; //	String	Обязательный	Валюта списания
  DateTime?: string; //	yyyy-MM-dd HH:mm:ss	Обязательный	Дата/время создания платежа во временной зоне UTC
  CardFirstSix?: string; //	String(6)	Обязательный	Первые 6 цифр номера карты
  CardLastFour?: string; //	String(4)	Обязательный	Последние 4 цифры номера карты
  CardType?: string; //	String	Обязательный	Платежная система карты: Visa, Mastercard, Maestro или "МИР"
  CardExpDate?: string; //	String	Обязательный	Срок действия карты в формате MM/YY
  TestMode?: string; //	Bit (1 или 0)	Обязательный	Признак тестового режима
  Status?: string; //	String	Обязательный	Статус платежа после авторизации: Completed — для одностадийных платежей, Authorized — для двухстадийных
  OperationType?: string; //	String	Обязательный	Тип операции: Payment/CardPayout (см. справочник)
  GatewayName?: string; //	String	Обязательный	Идентификатор банка-эквайера
  InvoiceId?: string; //	String	Необязательный	Номер заказа из параметров платежа
  AccountId?: string; //	String	Необязательный	Идентификатор пользователя из параметров платежа
  SubscriptionId?: string; //	String	Необязательный	Идентификатор подписки (для рекуррентных платежей)
  Name?: string; //	String	Необязательный	Имя держателя карты
  Email?: string; //	String	Необязательный	E-mail адрес плательщика
  IpAddress?: string; //	String	Необязательный	IP-адрес плательщика
  IpCountry?: string; //	String(2)	Необязательный	Двухбуквенный код страны нахождения плательщика по ISO3166-1
  IpCity?: string; //	String	Необязательный	Город нахождения плательщика
  IpRegion?: string; //	String	Необязательный	Регион нахождения плательщика
  IpDistrict?: string; //	String	Необязательный	Округ нахождения плательщика
  IpLatitude?: string; //	String	Необязательный	Широта нахождения плательщика
  IpLongitude?: string; // 	String	Необязательный	Долгота нахождения плательщика
  Issuer?: string; //	String	Необязательный	Название банка-эмитента карты
  IssuerBankCountry?: string; //	String(2)	Необязательный	Двухбуквенный код страны эмитента карты по ISO3166-1
  Description?: string; //	String	Необязательный	Назначение оплаты из параметров платежа
  AuthCode?: string; //	String	Необязательный	Код авторизации
  Data?: any; //	Json	Необязательный	Произвольный набор параметров, переданных в транзакцию
  Token?: string; //	String	Необязательный	Токен карты для повторных платежей без ввода реквизитов
  TotalFee?: number; //	Decimal	Необязательный	Значение общей комиссии
  CardProduct?: string; //	String	Необязательный	Тип карточного продукта
  PaymentMethod?: string; //	String	Необязательный	Метод оплаты ApplePay, GooglePay или YandexPay
  FallBackScenarioDeclinedTransactionId?: string; //	Int	Необязательный	Номер первой неуспешной транзакции

  constructor(TransactionId: number) {
    super();
    this.TransactionId = TransactionId;
  }

  static {
    // начальная инициализация
    this.refMetaData = new TableWorkMetaData();
    const r = this.refMetaData;
    r.tableName = 'payments';
    r.primaryKey = 'id';
    r.getTypes = {
      id: PT.UTF8,
      Amount: PT.DOUBLE,
      Cryptogram: PT.UTF8,
      Currency: PT.UTF8,
      InvoiceId: PT.UTF8,
      IpUser: PT.UTF8,
      PaReq: PT.UTF8,
      PaymentCurrency: PT.UTF8,
      PaymentCurrencyCode: PT.UINT64,
      State: PT.UTF8,
      AcsUrl: PT.UTF8,
      TransactionId: PT.UINT64,
      timestamp: PT.TIMESTAMP,
    };
  }
}

/*

create table pay_notification (
TransactionId Uint64,
Amount double,
Currency Utf8,
PaymentAmount Utf8,
PaymentCurrency Utf8,
DateTime Utf8,
CardFirstSix Utf8,
CardLastFour Utf8,
CardType Utf8,
CardExpDate Utf8,
TestMode Utf8,
Status Utf8,
OperationType Utf8,
GatewayName Utf8,
InvoiceId Utf8,
AccountId Utf8,
SubscriptionId Utf8,
Name Utf8,
Email Utf8,
IpAddress Utf8,
IpCountry Utf8,
IpCity Utf8,
IpRegion Utf8,
IpDistrict Utf8,
IpLatitude Utf8,
IpLongitude Utf8,
Issuer Utf8,
IssuerBankCountry Utf8,
Description Utf8,
AuthCode Utf8,
Data Json,
Token Utf8,
TotalFee double,
CardProduct Utf8,
PaymentMethod Utf8,
FallBackScenarioDeclinedTransactionId Utf8,


PRIMARY KEY (TransactionId)
);
 */
