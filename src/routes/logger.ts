import { Request, Response } from 'express';

export function logger(req: Request, res: Response): void {
  console.log('Logger : ', req.body);
  res.status(200).end('');
}
