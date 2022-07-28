// @ts-ignore
import { describeTable, initDbLocal } from './utils/database';

async function testYDB() {
  await initDbLocal();
}

(async () => {
  await testYDB();
  console.log('describeTable');
  await describeTable('payments');
  process.exit(0);
})();
