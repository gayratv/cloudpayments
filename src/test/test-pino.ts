import pino, { Bindings, Logger } from 'pino';

const LOGLEVEL = process.env.YDB_SDK_LOGLEVEL || 'info';
export let logger: Logger;

function getLoggerMy() {
  if (!logger) {
    logger = pino(
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
  return logger;
}

export { Logger } from 'pino';

logger = getLoggerMy();

logger.info('');
logger.info(`--------- START -----------------`);
logger.info(`hello world`);
logger.info({ a: 1, b: 2, c: 'asdsaq', e: { k: 55 } });
logger.error('err');

// const child = logger.child({ a: 'property' });
// child.info('hello child!');
