import { Request, Response } from 'express';
import { Payments } from '../utils/ydb_payments';
import axios from 'axios';
import { config } from '../config';
import { SuccesTransactionData } from '../utils/ydb-succes-transaction';
import { loggerMy } from '../utils/getlogger-my';

export async function succesPay(req: Request, res: Response): Promise<void> {
  loggerMy.info('succesPay 1111111');
  // console.log(req.body);

  // На входе должен получить параметры
  //  { MD: '1272561364', PaRes: 'AQ==', CRes: 'AQ==' }

  // @ts-ignore
  const { MD, PaRes, CRes } = req.body;

  loggerMy.info(req.query); // здесь будет id
  if (!req.query.id) {
    // res.status(200).redirect(`${process.env.BASE_URL}/errorpay.htm`);
    res.status(400);
    return;
  }
  const transaction = await Payments.getRowByPrimaryKey<Payments>(req.query.id);
  loggerMy.info('transaction из базы запросил');
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

  /*console.log(
    'transaction.TransactionId ',
    transaction.TransactionId,
    'MD : ',
    MD
  );*/
  // transaction.TransactionId === MD

  const payload = {
    TransactionId: transaction.TransactionId,
    PaRes: PaRes,
  };
  // console.log('payload ', payload);

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
    loggerMy.info(' succesPay responce');
    loggerMy.info(cpData.data.Success, ' Success pay ');
    // console.log('Model : ', cpData.data.Model);
    // console.log(' succesPay responce', cpData.data);
    cpData.data.Model.Success = cpData.data.Success;

    const st = new SuccesTransactionData();
    for (const stKey in st) {
      st[stKey] = cpData.data.Model[stKey];
    }
    await st.upsertTable();
  } catch (err) {
    loggerMy.info(err as object, 'ERROR succesPay');
  }
  res
    .status(200)
    .redirect(`${process.env.BASE_URL}/succespay.html?id=${req.query.id}`);
}
