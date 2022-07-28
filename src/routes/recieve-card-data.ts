/* eslint-disable prefer-const */
import { v4 as uuidv4 } from 'uuid';
import { createTypedValue, driver } from '../utils/database';
import { Types } from 'ydb-sdk';
import { Request, Response } from 'express';
import { PaymentData, sendMoney } from '../send_payment';

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
      $id: createTypedValue(Types.UTF8, invoiceID),
      $Amount: createTypedValue(Types.DOUBLE, amount),
      $InvoiceId: createTypedValue(Types.UTF8, invoiceID),
      $IpUser: createTypedValue(Types.UTF8, realIP),
      $Cryptogam: createTypedValue(Types.UTF8, cryptogramm),
    };

    await session.executeQuery(query, params);

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
    }
  });
  res.status(200).end(JSON.stringify({ status: 'OK' }));
}
