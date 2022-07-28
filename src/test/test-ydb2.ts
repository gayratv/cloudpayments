import { TypedData } from 'ydb-sdk';
import { driver, initDbLocal } from '../utils/database';

export interface Ipayments {
  id: string;
  Amount: number;
  Currency: string;
  InvoiceId: string;
  IpUser: string;
  PaReq: string;
  PaymentCurrency: string;
  PaymentCurrencyCode: number;
  State: string;
  TransactionId: number;
  timestamp: Date;
}

export async function readTable() {
  const finRes = await driver.tableClient.withSession(async (session) => {
    const query = `
        select *
        from payments;
    `;
    // WHERE subcategories_id = ${sub}
    // ORDER BY products_sort_code;
    const data = await session.executeQuery(query);
    const typedData: Ipayments[] = TypedData.createNativeObjects(
      data.resultSets[0]
    ) as unknown as Ipayments[];

    return typedData;
  });
  return finRes;
}

async function testYDB() {
  await initDbLocal();
  const a = await readTable();
  console.log(a);
  console.log(typeof a[0].timestamp);
  console.log(a[0].timestamp);
}

(async () => {
  await testYDB();
  process.exit(0);
})();
