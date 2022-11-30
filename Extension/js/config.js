// 全局配置

const DELAY = 15000 * 2;
//const DELAY = 5000;
const POSTURL = 'http://localhost:9998/report';

// 向服服务端发送数据
async function postReport(body) {
  await superagent.post(POSTURL).type('form').send(body);
}

// 模拟sleep()
const sleep = DELAY => new Promise(resolve => setTimeout(resolve, DELAY));
