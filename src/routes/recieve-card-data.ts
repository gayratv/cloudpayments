import { v4 as uuidv4 } from 'uuid';
import { createTypedValue, driver } from '../utils/database';
import { Types, Ydb } from 'ydb-sdk';

export async function recieveCardData(
  realIP: string,
  cryptogramm: string,
  method: string,
  invoiceID: string,
  amount: number
) {
  // буду полагать invoiceID уникальным
  invoiceID = invoiceID && uuidv4();
  if (method !== 'POST') {
    return { error: 'выберите метод POST для передачи данных' };
  }

  // Записать запрос в базу
  await driver.tableClient.withSession(async (session) => {
    const query = `
        DECLARE $payId AS Utf8;
        DECLARE  $Amount as Double;
        upsert into payments (id, Amount)
          values ($payId, $Amount)
    `;

    const p1: Ydb.ITypedValue = {
      type: Types.UTF8,
      value: { textValue: 'a1' },
    };
    const p2: Ydb.ITypedValue = createTypedValue(Types.DOUBLE, 9.1);
    const params = {
      $payId: p1,
      $Amount: p2,
    };
    // WHERE subcategories_id = ${sub}
    // ORDER BY products_sort_code;
    const data = await session.executeQuery(query, params);

    return data;
  });
}
