/* eslint-disable prefer-const */
import { v4 as uuidv4 } from 'uuid';
// import { createTypedValue, driver } from '../utils/database';
// import { Types } from 'ydb-sdk';
import { Request, Response } from 'express';
import { PaymentData, sendMoney } from '../send_payment';
import { IPaymentsStruct } from '../utils/ydb-ipayments';

/*
 В теле получим
{
  "cryptogramm": "asdkjh",
  "invoiceID": "alskdj",
  "amount": 25
}
 */
export async function recieveCardData(
  req: Request,
  res: Response
): Promise<void> {
  let { cryptogramm, invoiceID, amount } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  const realIP = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : 'none';

  // буду полагать invoiceID уникальным
  invoiceID = invoiceID ? invoiceID : uuidv4();
  if (!amount) {
    res.status(400).end(JSON.stringify({ error: 'укажите сумму списания' }));
    return;
  }
  if (!cryptogramm) {
    res.status(400).end(JSON.stringify({ error: 'укажите криптограмму' }));
    return;
  }
  const id = invoiceID;
  /*

  // Записать запрос в базу
  await driver.tableClient.withSession(async (session) => {
    const query = `
        DECLARE  $id AS Utf8;
        DECLARE  $Amount as Double;
        DECLARE  $InvoiceId as Utf8;
        DECLARE  $IpUser as Utf8;
        DECLARE  $Cryptogam as Utf8;

        upsert into payments (id, Amount, InvoiceId, IpUser, Cryptogam)
          values ($id, $Amount,$InvoiceId,$IpUser,$Cryptogam)
    `;


    const params = {
      $id: createTypedValue(Types.UTF8, id),
      $Amount: createTypedValue(Types.DOUBLE, amount),
      $InvoiceId: createTypedValue(Types.UTF8, invoiceID),
      $IpUser: createTypedValue(Types.UTF8, realIP),
      $Cryptogam: createTypedValue(Types.UTF8, cryptogramm),
    };

    await session.executeQuery(query, params);
*/

  // Записать запрос в базу
  const clientData = new IPaymentsStruct(id);
  clientData.Amount = amount;
  clientData.InvoiceId = invoiceID;
  clientData.IpUser = realIP as string;
  clientData.Cryptogram = cryptogramm;
  await clientData.upsertTable();

  // ************************************
  // пошлем запрос на проведение транзакции
  const p: PaymentData = {
    Amount: amount,
    IpAddress: realIP as string,
    CardCryptogramPacket: cryptogramm,
    InvoiceId: invoiceID,
  };
  const sendMoneyResponce = await sendMoney(p);

  //*************************************
  // если есть 3Dsecure - получим в ответ его

  if ('data' in sendMoneyResponce) {
    // console.log(response);
    console.log(' data', sendMoneyResponce.data);
    console.log('///////////////////');
    console.log(' status', sendMoneyResponce.status);
    console.log(' statusText', sendMoneyResponce.statusText);
    console.log('///////////////////');
    console.log(' headers', sendMoneyResponce.headers);

    // await start3DSecure(
    //   id,
    //   sendMoneyResponce as unknown as IcloudResponcePayment
    // );
  }

  res.status(200).end(JSON.stringify({ status: 'OK' }));
}

export type IcloudResponcePayment_need3Dauth = {
  Model: {
    TransactionId: number; // 1266443069,
    PaReq: string; //'+/eyJNZXJjaGFudE5hbWUiOm51bGwsIkZpcnN0U2l4IjoiNDI0MjQyIiwiTGFzdEZvdXIiOiI0MjQyIiwiQW1vdW50IjoxMjMuMCwiQ3VycmVuY3lDb2RlIjoiUlVCIiwiRGF0ZSI6IjIwMjItMDctMjhUMDA6MDA6MDArMDA6MDAiLCJDdXN0b21lck5hbWUiOm51bGwsIkN1bHR1cmVOYW1lIjoicnUtUlUifQ=='
    GoReq: any;
    AcsUrl: string; // 'https://demo.cloudpayments.ru/acs',
    ThreeDsSessionData: any; // null,
    IFrameIsAllowed: boolean; // true,
    FrameWidth: any; // null,
    FrameHeight: number; // 651,
    ThreeDsCallbackId: string; //    '2fc9be0a65ad4936b419d15559ee81d1';
    EscrowAccumulationId: any; // null
  };
  Success: boolean;
  Message: string | null;
};

export type IcloudResponcePayment_canceled = {
  Model: {
    ReasonCode: number; // В поле ReasonCode код ошибки
    PublicId: string;
    TerminalUrl: string;
    TransactionId: number;
    Amount: number;
    Currency: string;
    CurrencyCode: number;
    PaymentAmount: number;
    PaymentCurrency: string;
    PaymentCurrencyCode: number;
    InvoiceId: string;
    AccountId: string;
    Email?: any;
    Description: string;
    JsonData?: any;
    CreatedDate: Date;
    PayoutDate?: any;
    PayoutDateIso?: any;
    PayoutAmount?: any;
    CreatedDateIso: Date;
    AuthDate?: any;
    AuthDateIso?: any;
    ConfirmDate?: any;
    ConfirmDateIso?: any;
    AuthCode?: any;
    TestMode: boolean;
    Rrn?: any;
    OriginalTransactionId?: any;
    FallBackScenarioDeclinedTransactionId?: any;
    IpAddress: string;
    IpCountry: string;
    IpCity: string;
    IpRegion: string;
    IpDistrict: string;
    IpLatitude: number;
    IpLongitude: number;
    CardFirstSix: string;
    CardLastFour: string;
    CardExpDate: string;
    CardType: string;
    CardProduct?: any;
    CardCategory?: any;
    EscrowAccumulationId?: any;
    IssuerBankCountry: string;
    Issuer: string;
    CardTypeCode: number;
    Status: string;
    StatusCode: number;
    CultureName: string;
    Reason: string;
    CardHolderMessage: string;
    Type: number;
    Refunded: boolean;
    Name: string;
    Token: string;
    SubscriptionId?: any;
    GatewayName: string;
    ApplePay: boolean;
    AndroidPay: boolean;
    WalletType: string;
    TotalFee: number;
  };

  Success: boolean;
  Message?: any;
};

export interface IcloudResponcePayment_SUCCES {
  Model: {
    ReasonCode: number; // 0
    PublicId: string;
    TerminalUrl: string;
    TransactionId: number;
    Amount: number;
    Currency: string;
    CurrencyCode: number;
    PaymentAmount: number;
    PaymentCurrency: string;
    PaymentCurrencyCode: number;
    InvoiceId: string;
    AccountId: string;
    Email?: any;
    Description: string;
    JsonData?: any;
    CreatedDate: Date;
    PayoutDate?: any;
    PayoutDateIso?: any;
    PayoutAmount?: any;
    CreatedDateIso: Date;
    AuthDate: Date;
    AuthDateIso: Date;
    ConfirmDate?: any;
    ConfirmDateIso?: any;
    AuthCode: string;
    TestMode: boolean;
    Rrn?: any;
    OriginalTransactionId?: any;
    FallBackScenarioDeclinedTransactionId?: any;
    IpAddress: string;
    IpCountry: string;
    IpCity: string;
    IpRegion: string;
    IpDistrict: string;
    IpLatitude: number;
    IpLongitude: number;
    CardFirstSix: string;
    CardLastFour: string;
    CardExpDate: string;
    CardType: string;
    CardProduct: string;
    CardCategory: string;
    EscrowAccumulationId?: any;
    IssuerBankCountry: string;
    Issuer: string;
    CardTypeCode: number;
    Status: string;
    StatusCode: number;
    CultureName: string;
    Reason: string;
    CardHolderMessage: string;
    Type: number;
    Refunded: boolean;
    Name: string;
    Token: string;
    SubscriptionId?: any;
    GatewayName: string;
    ApplePay: boolean;
    AndroidPay: boolean;
    WalletType: string;
    TotalFee: number;
  };
  Success: boolean; // TRUE
  Message?: any;
}

export type IcloudResponcePayment =
  | IcloudResponcePayment_need3Dauth
  | IcloudResponcePayment_canceled
  | IcloudResponcePayment_SUCCES;

function IcloudResponcePayment_need3Dauth(
  o: IcloudResponcePayment
): o is IcloudResponcePayment_need3Dauth {
  return (o as IcloudResponcePayment_need3Dauth).Model.PaReq !== undefined;
}

// если Success = false и AcsUrl не null - то перйти на AcsUrl

/*
Обработка 3-D Secure
Для проведения 3-D Secure аутентификации нужно отправить плательщика на адрес, указанный в параметре AcsUrl ответа сервера с передачей следующих параметров:

MD — параметр TransactionId из ответа сервера;
PaReq — одноименный параметр из ответа сервера;
TermUrl — адрес на вашем сайте для возврата плательщика после аутентификации.
 */
// @ts-ignore
async function start3DSecure(
  id: string,
  sendMoneyResponce: IcloudResponcePayment
) {
  if (IcloudResponcePayment_need3Dauth(sendMoneyResponce)) {
    // ------- нужна 3D secure -----------
    // для начала сохраним дополнительные параметры
    // Записать запрос в базу

    const { TransactionId, PaReq, AcsUrl } = sendMoneyResponce.Model;
    const storeVal = new IPaymentsStruct(id);
    storeVal.TransactionId = TransactionId;
    storeVal.PaReq = PaReq;
    storeVal.TermUrl = AcsUrl;
    await storeVal.upsertTable();
  }
}
