import { Request, Response } from 'express';

/*
https://developers.cloudpayments.ru/#obrabotka-3-d-secure
Для завершения оплаты выполните следующий метод Post3ds.

Адрес метода:
https://api.cloudpayments.ru/payments/cards/post3ds
 */
export async function succesPay(req: Request, res: Response): Promise<void> {
  console.log('succesPay body');
  console.log(req.body);
  console.log(req.query); // здесь будет id
  // res.status(200).end(JSON.stringify({ code: 0 }));
  res
    .status(200)
    .redirect(`${process.env.BASE_URL}/succespay.html?id=${req.query.id}`);
}
