import { initDotEnv } from './utils/dotenv-init';
initDotEnv();
import { initDbLocal } from './utils/database';

import express from 'express';
import cors from 'cors';

import { recieveCardData } from './routes/recieve-card-data';
import { paynotify } from './routes/pay_notify';
import { succesPay } from './routes/succes-pay';

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  await initDbLocal();
})();

app.use(express.json());
app.options('*', cors());
app.use(cors());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

// http://localhost:3000/app2/rcvcard?id=5
app.post('/app2/rcvcard', async (req, res) => {
  // console.log('query :', req.query); // query : { id: '5' }
  // console.log('params :', req.params);
  // console.log(req.body);
  // console.log(req.headers);
  await recieveCardData(req, res);
});

app.post('/app2/paynotify', async (req, res) => {
  console.log('paynotify');
  await paynotify(req, res);
});

app.post('/app2/succespay', async (req, res) => {
  console.log('/app2/succespay');
  await succesPay(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
