import pino, { Bindings, Logger } from 'pino';

const LOGLEVEL = process.env.YDB_SDK_LOGLEVEL || 'info';

function getLoggerMy() {
  return pino(
    {
      timestamp: pino.stdTimeFunctions.isoTime,
      //   type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | silent;
      level: LOGLEVEL,
      enabled: true,
      formatters: { bindings: (_: Bindings) => ({}) },
    }
    // pino.destination('./log.txt')
  );
}

export { Logger } from 'pino';

export const loggerMy2: Logger = getLoggerMy();

loggerMy2.info('');
loggerMy2.info(`--------- START -----------------`);
loggerMy2.info(`hello world`);
loggerMy2.info({ a: 1, b: 2, c: 'asdsaq', e: { k: 55 } }, 'MSGGG');
loggerMy2.error('err');

// const child = logger.child({ a: 'property' });
// child.info('hello child!');
