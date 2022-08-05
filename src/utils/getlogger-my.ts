import pino, { Bindings, Logger } from 'pino';
// @ts-ignore
import path from 'path';

const LOGLEVEL = process.env.YDB_SDK_LOGLEVEL || 'info';

function getLoggerMy(): Logger {
  return pino(
    {
      timestamp: pino.stdTimeFunctions.isoTime,
      //   type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | silent;
      level: LOGLEVEL,
      enabled: true,
      formatters: { bindings: (_: Bindings) => ({}) },
    },
    pino.destination(path.join(__dirname, '/log.txt'))
  );
}

export { Logger } from 'pino';
export const loggerMy = getLoggerMy();

// (obj: any, msg?: string, ...args: any[]): void;
// (msg: string, ...args: any[]): void;

export function mylog(
  obj1?: Record<string, any> | string,
  msg?: string,
  ...args: any[]
): void {
  loggerMy.info(obj1, msg, ...args);

  msg ? console.log(obj1, msg) : console.log(obj1);
}
