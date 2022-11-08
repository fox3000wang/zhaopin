console.log('[content_script] load');

const delay = 15000;
const postUrl = 'http://localhost:9070/report';

async function main() {
  console.log('[content_script] main');
  await sleep(500);
  if (!is51job()) return;
  checkAd();
  isSearchPage() ? getUrlList() : null;
  isInfoPage() ? getInfo() : null;
}

// 检查是不是广告页, 广告页就直接关闭
function checkAd() {
  if (!isSearchPage() && !isInfoPage() && !isHomePage()) {
    window.close();
  }
}

// 处理查询列表
async function getUrlList() {
  console.log('[content_script] getUrlList');

  const joblist = document.getElementsByClassName('j_joblist')[0].children;
  for (let i = 0; i < joblist.length; i++) {
    await sleep(delay);
    let url = joblist[i].getElementsByClassName('el')[0].href;
    chrome.runtime.sendMessage({ url });
  }

  clickNext();
  await sleep(delay);
  getUrlList();
}

// 点击下一页
function clickNext() {
  document.getElementsByClassName('next')[0].children[0].click();
}

// 获取明细页面信息
async function getInfo() {
  await sleep(delay);

  const position = document.getElementsByClassName('cn')[0].children[0].innerText; // 职位
  const income = document.getElementsByClassName('cn')[0].children[1].innerText; // 金额
  const other = document.getElementsByClassName('cn')[0].children[2].innerText.split('|'); // 金额

  const city = other[0].split('-')[0].trim(); // 城市
  let area = other[0].split('-')[1]; // 区
  area = area ? area.trim() : '';

  const exp = other[1].trim(); //经验
  const education = other[2].trim(); //学历
  const release_month = other[3].trim().replace('发布', '').split('-')[0]; // 发布月
  const release_day = other[3].trim().replace('发布', '').split('-')[1]; // 发布日
  const release_year = new Date().getFullYear(); // 发布月

  // todo 这里等着写发送数据的业务
  await postReport({
    position,
    income,
    city,
    area,
    exp,
    education,
    release_month,
    release_day,
    release_year,
  });
  window.close();
}

// 检测是否为51job
const is51job = () => /51job.com/.test(document.baseURI);

// 检测当前页是不是查询列表页
const isSearchPage = () => /search.51job.com/.test(document.baseURI);

// 检测当前页是不是明细页
const isInfoPage = () => /jobs.51job.com/.test(document.baseURI);

// 检测是否为首页
const isHomePage = () => /www.51job.com/.test(document.baseURI);

// 向服服务端发送数据
async function postReport(body) {
  await superagent.post(postUrl).type('form').send(body);
}

// 模拟sleep()
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

main();
