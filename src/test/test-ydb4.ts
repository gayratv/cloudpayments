// @ts-ignore
import { TypedValues, Ydb } from 'ydb-sdk';
import { driver, initDbLocal } from '../utils/database';
import PT = Ydb.Type.PrimitiveTypeId;
import { optionalYdbValue, requiredYdbValue } from '../utils/helpers';

export interface IPayments {
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
  TermUrl?: string;
  TransactionId?: number;
  timestamp?: Date;
}

// type AA = keyof IPaymentsStruct.getTypes;

export class IPaymentsStruct {
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
  TermUrl?: string;
  TransactionId?: number;
  timestamp?: Date;

  constructor(id: string) {
    this.id = id;
  }

  static getTypes = {
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
    TermUrl: PT.UTF8,
    TransactionId: PT.UINT64,
    timestamp: PT.TIMESTAMP,
  } as const;
  static primaryKey = 'id';

  getQuery() {
    let resOutput = `upsert into payments ( ${IPaymentsStruct.primaryKey}`;
    let valOutput = `values ($${IPaymentsStruct.primaryKey}`;
    let declareOutput = `DECLARE $${IPaymentsStruct.primaryKey} as ${
      PT[IPaymentsStruct.getTypes[IPaymentsStruct.primaryKey]]
    };`;

    for (const prop in this) {
      if (this[prop] && prop !== IPaymentsStruct.primaryKey) {
        resOutput += `, ${prop}`;
        valOutput += `, $${prop}`;
        declareOutput += `\nDECLARE $${prop} as     ${
          PT[IPaymentsStruct.getTypes[prop as string]]
        }?;`;
      }
    }
    resOutput += `)\n`;
    valOutput += `);\n`;
    declareOutput += `\n`;
    return declareOutput + resOutput + valOutput;
    // values ($id,$Amount,$Cryptogram);
  }

  getParams() {
    /*
    const params = {
      $id: requiredYdbValue(PT.UTF8, data.id),
      $Amount: optionalYdbValue(PT.DOUBLE, data.Amount),
      $Cryptogram: optionalYdbValue(PT.UTF8, data.Cryptogram),
    };
    */
    const pk = `$${IPaymentsStruct.primaryKey}`;
    const params = {
      [pk]: requiredYdbValue(
        IPaymentsStruct.getTypes[IPaymentsStruct.primaryKey],
        this[IPaymentsStruct.primaryKey]
      ),
    };
    for (const prop in this) {
      if (this[prop] && prop !== IPaymentsStruct.primaryKey) {
        const key = `$${prop}`;
        params[key] = optionalYdbValue(
          IPaymentsStruct.getTypes[prop as string],
          this[prop as string]
        );
      }
    }
    return params;
  }
}

export async function upsertTable(data: IPaymentsStruct) {
  return await driver.tableClient.withSession(async (session) => {
    const query = data.getQuery();

    /* const params = {
      $id: TypedValues.utf8(data.id),
      $Amount: optionalYdbValue(PT.DOUBLE, data.Amount),
      $Cryptogram: optionalYdbValue(PT.UTF8, data.Cryptogram),
    };*/

    const params = data.getParams();

    return await session.executeQuery(query, params);
  });
}

// @ts-ignore
async function testYDB() {
  await initDbLocal();
  const p = new IPaymentsStruct('84');

  // p.Amount = 50;
  // p.Cryptogram = 'crypt45';
  p.InvoiceId = 'asdasww';
  const a = await upsertTable(p);
  console.log(a);
}

(async () => {
  await testYDB();
  process.exit(0);
})();

/*

const a = new IPaymentsStruct('1');
a.Amount = 1;
a.TransactionId = 5;
// console.log(a.genDeclare());
console.log(a.getQuery());
*/
