import { TableWork, TableWorkMetaData } from './ydb-tables';
import { Ydb } from 'ydb-sdk';
import { initDbLocal } from './database';
import PT = Ydb.Type.PrimitiveTypeId;

class Tbl1_new_payments extends TableWork {
  id: string;
  Amount?: number;
  Cryptogram?: string;
  Currency?: string;
  InvoiceId?: string;
  IpUser?: string;
  PaReq?: string;
  PaymentCurrency?: string;
  PaymentCurrencyCode?: number;
  State?: string;
  AcsUrl?: string;
  TransactionId?: number;
  timestamp?: Date;

  constructor(id: string) {
    super();
    this.id = id;
  }

  static {
    // начальная инициализация
    this.refMetaData = new TableWorkMetaData();
    const r = this.refMetaData;
    r.tableName = 'payments';
    r.primaryKey = 'id';
    r.getTypes = {
      id: PT.UTF8,
      Amount: PT.DOUBLE,
      Cryptogram: PT.UTF8,
      Currency: PT.UTF8,
      InvoiceId: PT.UTF8,
      IpUser: PT.UTF8,
      PaReq: PT.UTF8,
      PaymentCurrency: PT.UTF8,
      PaymentCurrencyCode: PT.UINT64,
      State: PT.UTF8,
      AcsUrl: PT.UTF8,
      TransactionId: PT.UINT64,
      timestamp: PT.TIMESTAMP,
    };
  }
}

(async () => {
  await initDbLocal();
  const a = new Tbl1_new_payments('99');
  a.Amount = 456;
  await a.upsertTable();
  process.exit(0);
})();
