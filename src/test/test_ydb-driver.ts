// тестирование на отваливание драйвера
// ts-node ./src/test/test_ydb-driver.ts

import { initDotEnv } from '../utils/dotenv-init';
initDotEnv();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
import { driver, initDbLocal, initDbLocalFail } from '../utils/database';
import pino, { Bindings } from 'pino';
import path from 'path';

const mylog = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
    //   type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | silent;
    level: 'info',
    enabled: true,
    formatters: { bindings: (_: Bindings) => ({}) },
  },
  pino.destination(path.join(__dirname, '//logtest.txt'))
);
console.log(path.join(__dirname, '//logtest.txt'));
// throw new Error('glob error');

import express from 'express';
import cors from 'cors';

const app = express();
const port = 3020;

process.on('uncaughtException', async (err) => {
  mylog.info('Ошибка на верхнем уровне process.on');
  const err1: any = err;

  /*  for (const errKey in err) {
    console.log(errKey);
  }*/

  mylog.info(`err1.code  ${err1.code}`);
  mylog.info(err1.details, 'err1.details ');
  mylog.info('');
  mylog.info('Полная распечатка ошибки');
  mylog.info(err);

  if (err1.code === 14 && err1.details === 'Stream refused by server') {
    // проблема с YDB
    mylog.info('>>>>>>> Error YDB problem');
    driver.destroy();
    await initDbLocal();
    mylog.info('call initDbLocal');
    return;
  }

  // process.exit(1); //mandatory (as per the Node docs)
});

(async () => {
  await initDbLocal();
  // initDbLocalFail();
})();

mylog.info('== Start ===  ');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.options('*', cors());
app.use(cors());

app.get('/', (_req, res) => {
  res.send(`Hello World! test app\n`);
});

app.get('/apptest', (_req, res) => {
  mylog.info('/apptest');
  res.send('Hello World 2! /apptest');
});

app.listen(port, () => {
  mylog.info(`Example app listening on port ${port}`);
});

/*
err1.code  14
err1.details  Stream refused by server

2022-08-03T20:32:48.869Z
Полная распечатка ошибки
Error: 14 UNAVAILABLE: Stream refused by server
    at Object.callErrorFromStatus (/var/www/makeupkitchen.ga/node/node_modules/@grpc/grpc-js/src/call.ts:81:17)
    at Object.onReceiveStatus (/var/www/makeupkitchen.ga/node/node_modules/@grpc/grpc-js/src/client.ts:352:36)
    at Object.onReceiveStatus (/var/www/makeupkitchen.ga/node/node_modules/@grpc/grpc-js/src/client-interceptors.ts:462:34)
    at Object.onReceiveStatus (/var/www/makeupkitchen.ga/node/node_modules/@grpc/grpc-js/src/client-interceptors.ts:424:48)
    at /var/www/makeupkitchen.ga/node/node_modules/@grpc/grpc-js/src/call-stream.ts:330:24
    at processTicksAndRejections (node:internal/process/task_queues:78:11)
for call at
    at Client.makeUnaryRequest (/var/www/makeupkitchen.ga/node/node_modules/@grpc/grpc-js/src/client.ts:324:26)
    at IamTokenService.rpcImpl (/var/www/makeupkitchen.ga/node/node_modules/ydb-sdk/build/cjs/utils.js:71:20)
    at IamTokenService.rpcCall (/var/www/makeupkitchen.ga/node/node_modules/protobufjs/src/rpc/service.js:94:21)
    at executor (/var/www/makeupkitchen.ga/node/node_modules/@protobufjs/aspromise/index.js:44:16)
    at new Promise (<anonymous>)
    at Object.asPromise (/var/www/makeupkitchen.ga/node/node_modules/@protobufjs/aspromise/index.js:28:12)
    at IamTokenService.rpcCall (/var/www/makeupkitchen.ga/node/node_modules/protobufjs/src/rpc/service.js:86:21)
    at IamTokenService.Create (/var/www/makeupkitchen.ga/node/node_modules/ydb-sdk-proto/proto/bundle.js:92967:37)
    at IamAuthService.sendTokenRequest (/var/www/makeupkitchen.ga/node/node_modules/ydb-sdk/build/cjs/credentials.js:88:39)
    at IamAuthService.updateToken (/var/www/makeupkitchen.ga/node/node_modules/ydb-sdk/build/cjs/credentials.js:92:41) {  code: 14,
  details: 'Stream refused by server',
  metadata: Metadata { internalRepr: Map(0) {}, options: {} }
}
 */
