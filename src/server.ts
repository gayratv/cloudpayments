import { initDotEnv } from './utils/dotenv-init';
initDotEnv();

import http from 'http';
// @ts-ignore
import { recieveCardData } from './routes/recieve-card-data';

let globCnt = 0;

const server = http.createServer((req, res) => {
  const urlPath = req.url;
  if (urlPath === '/favicon.ico') {
    res.end('');
    return;
  }

  console.log('///////////////////////////////////////////');
  console.log('Url: ' + req.url);
  console.log('Тип запроса: ' + req.method);
  console.log('User-Agent: ' + req.headers['user-agent']);
  console.log('Все заголовки');
  // console.log(req.headers);
  console.log('req.headers.host ', req.headers.host);
  console.log("['x-real-ip'] ", req.headers['x-real-ip']);
  console.log('///////////////////////////////////////////');
  console.log(req);

  switch (urlPath) {
    case 'app2/rcvcard':
      // recieveCardData();
      break;
    default:
      console.log('sss');
  }

  if (urlPath === '/app2/overview') {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        globCnt: globCnt++,
        urlPath,
        msg: 'overview assept',
      })
    );

    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      p: 'Вася',
      urlPath,
    })
  );
});

server.listen(3000, 'localhost', () => {
  console.log('Listening for request');
});