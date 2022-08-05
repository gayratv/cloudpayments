import { mylog } from '../utils/getlogger-my';

mylog('');
mylog(`--------- START -----------------`);
mylog(`hello world`);
mylog({ a: 1, b: 2, c: 'asdsaq', e: { k: 55 } }, 'MSGGG');

// const child = logger.child({ a: 'property' });
// child.info('hello child!');
