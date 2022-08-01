import { TableWork, TableWorkMetaData } from '../utils/ydb-tables';
import { Ydb } from 'ydb-sdk';
import PT = Ydb.Type.PrimitiveTypeId;

export class SuccesTransactionData extends TableWork {
  TransactionId?: number; //	Целое число	Обязательный	Номер транзакции в системе
  Amount?: number; // 	Numeric, точка в качестве разделителя, две цифры после точки	Обязательный	Сумма оплаты из параметров платежа
  Currency?: string; // RUB/USD/EUR/GBP из параметров платежа (см. справочник)
  CurrencyCode?: number; // 0,
  PaymentAmount?: number; //456,
  PaymentCurrency?: string; //'RUB',
  PaymentCurrencyCode?: number; // 0,
  InvoiceId?: string; // '88',
  AccountId?: string; // null,
  Email?: string; // null,
  Description?: string; // null,
  JsonData?: string; // null,
  CreatedDate?: string; // '/Date(1659370487146)/',
  PayoutDate?: string; // null,
  PayoutDateIso?: string; // null,
  PayoutAmount?: string; // null,
  CreatedDateIso?: string; // '2022-08-01T16:14:47',
  AuthDate?: string; // '/Date(1659370496176)/',
  AuthDateIso?: string; // '2022-08-01T16:14:56',
  ConfirmDate?: string; // '/Date(1659370496176)/',
  ConfirmDateIso?: string; // '2022-08-01T16:14:56',
  AuthCode?: string; // 'A1B2C3',
  TestMode?: boolean; // true,
  Rrn?: string; // null,
  OriginalTransactionId?: string; // null,
  FallBackScenarioDeclinedTransactionId?: string; // null,
  IpAddress?: string; // '94.198.134.49',
  IpCountry?: string; // 'RU',
  IpCity?: string; // 'Королев',
  IpRegion?: string; // 'Московская область',
  IpDistrict?: string; // 'Центральный федеральный округ',
  IpLatitude?: number; // 55.944397,
  IpLongitude?: number; // 37.864746,
  CardFirstSix?: string; // '424242',
  CardLastFour?: string; // '4242',
  CardExpDate?: string; // '01/25',
  CardType?: string; // 'Visa',
  CardProduct?: string; // 'I',
  CardCategory?: string; // 'Visa Infinite (Infinite)',
  EscrowAccumulationId?: string; // null,
  IssuerBankCountry?: string; // 'RU',
  Issuer?: string; // 'CloudPayments',
  CardTypeCode?: string; // 0,
  CultureName?: string; // 'ru',
  AndroidPay?: string; // false,
  WalletType?: string; // '',
  TotalFee?: number; // 0,
  IsLocalOrder?: boolean; // false,
  Gateway?: number; // 0,
  MasterPass?: boolean; // false
  Success?: boolean;

  constructor() {
    super();
  }

  static {
    // начальная инициализация
    this.refMetaData = new TableWorkMetaData();
    const r = this.refMetaData;
    r.tableName = 'SuccesTransactionData';
    r.primaryKey = 'TransactionId';
    r.getTypes = {
      TransactionId: PT.UINT64, //: number; //	Целое число	Обязательный	Номер транзакции в системе
      Amount: PT.DOUBLE, //?: number; // 	Numeric, точка в качестве разделителя, две цифры после точки	Обязательный	Сумма оплаты из параметров платежа
      Currency: PT.UTF8, //?: string; // RUB/USD/EUR/GBP из параметров платежа (см. справочник)
      CurrencyCode: PT.UINT32, //?: number; // 0,
      PaymentAmount: PT.DOUBLE, //?: number; //456,
      PaymentCurrency: PT.UTF8, //?: string; //'RUB',
      PaymentCurrencyCode: PT.UINT32, //?: number; // 0,
      InvoiceId: PT.UTF8, //?: string; // '88',
      AccountId: PT.UTF8, //?: string; // null,
      Email: PT.UTF8, //?: string; // null,
      Description: PT.UTF8, //?: string; // null,
      JsonData: PT.UTF8, //?: string; // null,
      CreatedDate: PT.UTF8, //?: string; // '/Date(1659370487146)/',
      PayoutDate: PT.UTF8, //?: string; // null,
      PayoutDateIso: PT.UTF8, //?: string; // null,
      PayoutAmount: PT.UTF8, //?: string; // null,
      CreatedDateIso: PT.UTF8, //?: string; // '2022-08-01T16:14:47',
      AuthDate: PT.UTF8, //?: string; // '/Date(1659370496176)/',
      AuthDateIso: PT.UTF8, //?: string; // '2022-08-01T16:14:56',
      ConfirmDate: PT.UTF8, //?: string; // '/Date(1659370496176)/',
      ConfirmDateIso: PT.UTF8, //?: string; // '2022-08-01T16:14:56',
      AuthCode: PT.UTF8, //?: string; // 'A1B2C3',
      TestMode: PT.BOOL, //?: boolean; // true,
      Rrn: PT.UTF8, //?: string; // null,
      OriginalTransactionId: PT.UTF8, //?: string; // null,
      FallBackScenarioDeclinedTransactionId: PT.UTF8, //?: string; // null,
      IpAddress: PT.UTF8, //?: string; // '94.198.134.49',
      IpCountry: PT.UTF8, //?: string; // 'RU',
      IpCity: PT.UTF8, //?: string; // 'Королев',
      IpRegion: PT.UTF8, //?: string; // 'Московская область',
      IpDistrict: PT.UTF8, //?: string; // 'Центральный федеральный округ',
      IpLatitude: PT.DOUBLE, //?: number; // 55.944397,
      IpLongitude: PT.DOUBLE, //?: number; // 37.864746,
      CardFirstSix: PT.UTF8, //?: string; // '424242',
      CardLastFour: PT.UTF8, //?: string; // '4242',
      CardExpDate: PT.UTF8, //?: string; // '01/25',
      CardType: PT.UTF8, //?: string; // 'Visa',
      CardProduct: PT.UTF8, //?: string; // 'I',
      CardCategory: PT.UTF8, //?: string; // 'Visa Infinite (Infinite)',
      EscrowAccumulationId: PT.UTF8, //?: string; // null,
      IssuerBankCountry: PT.UTF8, //?: string; // 'RU',
      Issuer: PT.UTF8, //?: string; // 'CloudPayments',
      CardTypeCode: PT.UINT32, //?: string; // 0,
      CultureName: PT.UTF8, //?: string; // 'ru',
      AndroidPay: PT.BOOL, //?: string; // false,
      WalletType: PT.UTF8, //?: string; // '',
      TotalFee: PT.DOUBLE, //?: number; // 0,
      IsLocalOrder: PT.BOOL, //?: boolean; // false,
      Gateway: PT.UINT32, //?: number; // 0,
      MasterPass: PT.BOOL, //?: boolean; // false
      Success: PT.BOOL,
    };
  }
}

/*

create table SuccesTransactionData (
TransactionId  UINT64,
Amount  DOUBLE,
Currency  UTF8,
CurrencyCode  UINT32,
PaymentAmount  DOUBLE,
PaymentCurrency  UTF8,
PaymentCurrencyCode  UINT32,
InvoiceId  UTF8,
AccountId  UTF8,
Email  UTF8,
Description  UTF8,
JsonData  UTF8,
CreatedDate  UTF8,
PayoutDate  UTF8,
PayoutDateIso  UTF8,
PayoutAmount  UTF8,
CreatedDateIso  UTF8,
AuthDate  UTF8,
AuthDateIso  UTF8,
ConfirmDate  UTF8,
ConfirmDateIso  UTF8,
AuthCode  UTF8,
TestMode  BOOL,
Rrn  UTF8,
OriginalTransactionId  UTF8,
FallBackScenarioDeclinedTransactionId  UTF8,
IpAddress  UTF8,
IpCountry  UTF8,
IpCity  UTF8,
IpRegion  UTF8,
IpDistrict  UTF8,
IpLatitude  DOUBLE,
IpLongitude  DOUBLE,
CardFirstSix  UTF8,
CardLastFour  UTF8,
CardExpDate  UTF8,
CardType  UTF8,
CardProduct  UTF8,
CardCategory  UTF8,
EscrowAccumulationId  UTF8,
IssuerBankCountry  UTF8,
Issuer  UTF8,
CardTypeCode  UINT32,
CultureName  UTF8,
AndroidPay  BOOL,
WalletType  UTF8,
TotalFee  DOUBLE,
IsLocalOrder  BOOL,
Gateway  UINT32,
MasterPass  BOOL,
Success  BOOL,

PRIMARY KEY (TransactionId)
);
 */
