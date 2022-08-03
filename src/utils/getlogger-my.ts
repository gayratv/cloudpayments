import pino, { Bindings } from 'pino';

const LOGLEVEL = process.env.YDB_SDK_LOGLEVEL || 'info';

function getLoggerMy() {
  const logger = pino(
    {
      timestamp: pino.stdTimeFunctions.isoTime,
      //   type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | silent;
      level: LOGLEVEL,
      enabled: true,
      formatters: { bindings: (_: Bindings) => ({}) },
    },
    pino.destination('./log.txt')
  );

  return logger;
}

export { Logger } from 'pino';
export const loggerMy = getLoggerMy();
