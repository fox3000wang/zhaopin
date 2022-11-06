console.log('[content_script] load');

const delay = 3000;
const postUrl = 'http://localhost:9070/report';

async function main() {
  console.log('[content_script] main');
  await sleep(1000);
  isSearchPage() ? getUrlList() : null;
  isInfoPage() ? getInfo() : null;
}

/**
 * 处理查询列表
 */
async function getUrlList() {
  console.log('[content_script] getUrlList');

  const joblist = document.getElementsByClassName('j_joblist')[0].children;
  for (let i = 0; i < joblist.length; i++) {
    let url = joblist[i].getElementsByClassName('el')[0].href;
    chrome.runtime.sendMessage({ url });
    await sleep(delay);
  }
}

// 点击下一页
function clickNext() {
  document.getElementsByClassName('next')[0].children[0].click();
}

// 获取明细页面信息
async function getInfo() {
  await sleep(delay);
  const txt = document.getElementsByClassName('cn')[0].children[0].innerText;
  console.log(txt);
  // todo 这里等着写发送数据的业务
  await postReport({ txt });
  window.close();
}

// 检测当前页是不是查询列表页
function isSearchPage() {
  console.log(`[content_script] isSearchPage `, /search.51job.com/.test(document.baseURI));
  return /search.51job.com/.test(document.baseURI);
}

// 检测当前页是不是明细页
function isInfoPage() {
  console.log(`[content_script] isInfoPage `, /jobs.51job.com/.test(document.baseURI));
  return /jobs.51job.com/.test(document.baseURI);
}

// 向服服务端发送数据
async function postReport(body) {
  await superagent.post(postUrl).type('form').send(body);
}

// 模拟sleep()
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

main();
