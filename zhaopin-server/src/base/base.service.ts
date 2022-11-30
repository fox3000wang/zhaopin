export class BaseService {
  pool: any;
  constructor() {
    console.log('process.env.RUNNING_ENV', process.env.RUNNING_ENV);
    const IS_PROD = process.env.RUNNING_ENV === 'prod';

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mysql = require('mysql2');
    this.pool = mysql.createPool({
      host: IS_PROD ? 'wangzm.cn' : '192.168.0.104', // TODO: add to config
      user: 'user',
      password: 'useruser',
      database: 'zhaopin',
      charset: 'utf8',
    });
    console.log(`[process.env.HOST]`, IS_PROD ? 'wangzm.cn' : '192.168.0.104');
  }

  // 封装成可以同步执行的函数
  query(sql) {
    console.log(`[BaseService][sql]: ${sql}`);
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (err, connection) {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
            // 结束会话
            connection.release();
          });
        }
      });
    });
  }
}
