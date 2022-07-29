import { Request, Response } from 'express';

export async function succesPay(req: Request, res: Response): Promise<void> {
  console.log('succesPay body');
  console.log(req.body);
  console.log(req.query);
  // res.status(200).end(JSON.stringify({ code: 0 }));
  res
    .status(200)
    .redirect(`https://cloudpayments1.tk/succespay.html?id=${req.query.id}`);
}
