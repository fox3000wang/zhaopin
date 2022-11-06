console.log('[content_script] load');

let urls = [];

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
    await sleep(2000);
  }
}

// 点击下一页
function clickNext() {
  document.getElementsByClassName('next')[0].children[0].click();
}

// 获取明细页面信息
async function getInfo() {
  await sleep(2000);
  const txt = document.getElementsByClassName('cn')[0].children[0].innerText;
  console.log(txt);
  // 这里等着写发送数据的业务
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

// 模拟sleep()
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

main();
