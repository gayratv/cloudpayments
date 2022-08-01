import { Request, Response } from 'express';
import { Payments } from '../utils/ydb_payments';
import axios from 'axios';
import { config } from '../config';

export async function succesPay(req: Request, res: Response): Promise<void> {
  console.log('succesPay body');
  console.log(req.body);
  console.log(req.query); // здесь будет id
  if (!req.query.id) {
    res.status(200).redirect(`${process.env.BASE_URL}/errorpay.htm`);
    return;
  }
  const transaction = await Payments.getRowByPrimaryKey<Payments>(req.query.id);
  console.log('transaction из базы запросил');
  if (!transaction) {
    // такого платежа нет
    res
      .status(200)
      .redirect(`${process.env.BASE_URL}/errorpay.htm?id=${req.query.id}`);
    return;
  }

  /*
  https://developers.cloudpayments.ru/#obrabotka-3-d-secure
  Для завершения оплаты выполните следующий метод Post3ds.

  Адрес метода:
  https://api.cloudpayments.ru/payments/cards/post3ds
 */
  const payload = {
    TransactionId: transaction.TransactionId,
    PaRes: transaction.PaReq,
  };
  console.log('payload ', payload);

  try {
    const cpData = await axios.post(
      // 'https://api.cloudpayments.ru/payments/cards/post3ds',
      config.succes_pay_url,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
        auth: {
          username: process.env.USERNAME1!,
          password: process.env.PASSWORD!,
        },
      }
    );
    console.log(' succesPay responce', cpData.data);
  } catch (err) {
    console.log('ERROR succesPay');
    const { status, statusText } = (err as any).response;
    console.error({ status, statusText });
  }
  res
    .status(200)
    .redirect(`${process.env.BASE_URL}/succespay.html?id=${req.query.id}`);
}
