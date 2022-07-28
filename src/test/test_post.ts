import axios, { AxiosInstance } from 'axios';

// DOTENV
import dotenv from 'dotenv';

// console.log(dotenv.config());
dotenv.config();
console.log('PASSWORD');
console.log(process.env.PASSWORD);

const aInst: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

async function sendMoney() {
  const resp = await aInst.post(
    'posts',

    {
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
    { headers: { 'Content-Type': 'application/json' } }
  );
  // console.log(resp);
  console.log(' data', resp.data);
  console.log('///////////////////');
  console.log(' status', resp.status);
  console.log(' statusText', resp.statusText);
  console.log('///////////////////');
  console.log(' headers', resp.headers);

  /*

  {
    id: 101,
      title: 'foo',
    body: 'bar',
    userId: 1
  }*/
}

async function main() {
  await sendMoney();
}

(async () => {
  await main();
})();
