import { Types, Ydb } from 'ydb-sdk';
import { createTypedValue, driver, initDbLocal } from './utils/database';

export async function upsertTable() {
  return await driver.tableClient.withSession(async (session) => {
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

async function testYDB() {
  await initDbLocal();
  const a = await upsertTable();
  console.log(a);
}

(async () => {
  await testYDB();
  process.exit(0);
})();
