import { TypedData, Ydb } from 'ydb-sdk';
import PT = Ydb.Type.PrimitiveTypeId;
import { optionalYdbValue, requiredYdbValue } from './helpers';
import { driver } from './database';

export class TableWorkMetaData {
  primaryKey = '';
  tableName = '';
  getTypes: Record<string, PT> = { '4552asdwwdwdasa1d5': PT.UTF8 };
}

export class TableWork {
  public static refMetaData: TableWorkMetaData;

  /*a() {
    const refMeta: TableWorkMetaData = (this.constructor as typeof TableWork)
      .refMetaData;
    console.log(refMeta);
  }

  static b() {
    const refMeta: TableWorkMetaData = this.refMetaData;
    console.log(refMeta);
  }*/

  getQuery() {
    const refMeta: TableWorkMetaData = (this.constructor as typeof TableWork)
      .refMetaData;
    let resOutput = `upsert into ${refMeta.tableName} ( ${refMeta.primaryKey}`;
    let valOutput = `values ($${refMeta.primaryKey}`;
    let declareOutput = `DECLARE $${refMeta.primaryKey} as ${
      PT[refMeta.getTypes[refMeta.primaryKey]]
    };`;

    for (const prop in this) {
      if (this[prop] && prop !== refMeta.primaryKey) {
        resOutput += `, ${prop}`;
        valOutput += `, $${prop}`;
        declareOutput += `\nDECLARE $${prop} as     ${
          PT[refMeta.getTypes[prop as string]]
        }?;`;
      }
    }
    resOutput += `)\n`;
    valOutput += `);\n`;
    declareOutput += `\n`;
    return declareOutput + resOutput + valOutput;
  }

  getParams() {
    const refMeta: TableWorkMetaData = (this.constructor as typeof TableWork)
      .refMetaData;
    const pk = `$${refMeta.primaryKey}`;
    const params = {
      [pk]: requiredYdbValue(
        refMeta.getTypes[refMeta.primaryKey],
        this[refMeta.primaryKey]
      ),
    };
    for (const prop in this) {
      if (this[prop] && prop !== refMeta.primaryKey) {
        const key = `$${prop}`;
        params[key] = optionalYdbValue(
          refMeta.getTypes[prop as string],
          this[prop as string]
        );
      }
    }
    return params;
  }

  async upsertTable() {
    return await driver.tableClient.withSession(async (session) => {
      const query = this.getQuery();

      const params = this.getParams();

      return await session.executeQuery(query, params);
    });
  }

  // static async getRowByPrimaryKey(primaryKey: any): Promise<TableWork> {
  static async getRowByPrimaryKey<T extends TableWork>(
    primaryKey: any
  ): Promise<T | null> {
    const refMeta: TableWorkMetaData = this.refMetaData;

    const query = `
        DECLARE $Param as ${PT[refMeta.getTypes[refMeta.primaryKey]]};
        select * from ${refMeta.tableName}
        where ${refMeta.primaryKey} = $Param;
    `;
    const params = {
      $Param: requiredYdbValue(
        refMeta.getTypes[refMeta.primaryKey],
        primaryKey
      ),
    };

    return await driver.tableClient.withSession(async (session) => {
      const data = await session.executeQuery(query, params);
      const resultSet = TypedData.createNativeObjects(data.resultSets[0]);
      if (resultSet.length > 0) return resultSet[0] as unknown as T;
      else return null;
    });
  }
}
