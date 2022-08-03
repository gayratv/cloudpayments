// данный код инициализации базы работает как на локальном компьютере с использованием авторизации на основе Service Account Key
// для cloud function авторизация работает на основе сервиса метаданных
// чтобы авторизация на основе сервиса метаданных работала, Вы должны создать сервисный аккаунт, дать ему необходимые права (для начала дайте admin)
// после этого при деплое функции к ней привязывается этот сервисный аккаунт и авторизация к базе данных идет на его основе
//
// для локального запуска пример запускался из под windows.
// поскольку windows автоматически не читает файл .env - то process.env.ENDPOINT не определена
// в то же время при деплое функции я передаю ей в env окружении  ENDPOINT и она определена (в конетексте уже развернутой Яндекс функции)
// поэтому в одном месте работает авторизация как на основе Service Account Key так и на основе метаданных
//
// документация:
// https://cloud.yandex.ru/docs/ydb/concepts/connect#auth

import {
  getLogger,
  Driver,
  getSACredentialsFromJson,
  IamAuthService,
  primitiveTypeToValue,
  Logger,
  Ydb,
} from 'ydb-sdk';

import { initDotEnv } from './dotenv-init';
initDotEnv();
// import { IAuthService } from 'ydb-sdk/build/credentials';

export const logger: Logger = getLogger();
export let driver: Driver;

export async function initDbLocal() {
  logger.info('Driver initializing...');
  const saKeyFile = process.env.SA_KEY_FILE;
  const saCredentials = getSACredentialsFromJson('./' + saKeyFile);
  const authService = new IamAuthService(saCredentials);
  driver = new Driver({
    endpoint: process.env.ENDPOINT,
    database: process.env.DATABASE,
    authService,
  });
  const timeout = 10000;
  if (!(await driver.ready(timeout))) {
    logger.fatal(`Driver has not become ready in ${timeout}ms!`);
    process.exit(1);
  }
  logger.info('Done');
}

export async function describeTable(tableName: string) {
  await driver.tableClient.withSession(async (session) => {
    logger.info(`Describing table: ${tableName}`);
    const result = await session.describeTable(tableName);
    for (const column of result.columns) {
      logger.info(
        `Column name '${column.name}' has type ${JSON.stringify(column.type)}`
      );
    }
  });
}

export function createTypedValue(type: Ydb.IType, val: any): Ydb.ITypedValue {
  const c1 = primitiveTypeToValue[type.typeId!];
  return { type, value: { [c1]: val } };
}

// TypedValues
// static int8(value: number): ITypedValue {
//   return TypedValues.primitive(Type.PrimitiveTypeId.INT8, value);
// }

// export function withTypeOptions(options: TypedDataOptions) {
//   return function<T extends Function>(constructor: T): T & {__options: TypedDataOptions} {
//     return _.merge(constructor, {__options: options});
//   }
// }

// static optionalNull(type: Ydb.IType): Ydb.ITypedValue
