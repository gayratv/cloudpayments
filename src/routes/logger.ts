import { Request, Response } from 'express';
import { loggerMy } from '../utils/getlogger-my';

export function logger(req: Request, res: Response): void {
  // console.log('Logger : ', req.body);
  loggerMy.info(req.body, 'outer Logger');
  res.status(200).end('');
}
