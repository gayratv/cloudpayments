import { initDotEnv } from './utils/dotenv-init';
initDotEnv();
import { initDbLocal } from './utils/database';

/*
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3020;

 */

(async () => {
  await initDbLocal();
})();

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); //mandatory (as per the Node docs)
});

throw new Error('glob error');

/*
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.options('*', cors());
app.use(cors());

app.get('/', (_req, res) => {
  res.send(`Hello World! test app\n`);
});

app.get('/apptest', (_req, res) => {
  console.log('/apptest');
  res.send('Hello World 2! /apptest');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


 */
