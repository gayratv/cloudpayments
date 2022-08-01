import axios from 'axios';
import { Payments } from '../utils/ydb_payments';
import querystring from 'node:querystring';
import { Response } from 'express';

// https://axios-http.com/docs/urlencoded

export async function send3Drequest(
  storeVal: Payments,
  TermUrl: string,
  res: Response
) {
  const { TransactionId, PaReq, AcsUrl } = storeVal;
  const bodyFormData = { PaReq, MD: TransactionId!.toString(), TermUrl };

  try {
    const response = await axios.post(
      AcsUrl!,
      querystring.stringify(bodyFormData),
      {
        /*
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    */
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: process.env.USERNAME1!,
          password: process.env.PASSWORD!,
        },
      }
    );
    // @ts-ignore
    // console.log(response);

    // res.status(200).render(response.data);
    res.status(200).send(response.data);

    /*
    config: {
     xsrfCookieName: 'XSRF-TOKEN',
     xsrfHeaderName: 'X-XSRF-TOKEN',
    }

     */
  } catch (err) {
    //handle error
    console.error(err);
  }
}
