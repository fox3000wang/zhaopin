/**
 * 本页只负责boss直聘页面:
 * 1. 在职位检索结果列表页面逐个打开每个明细页
 * 2. 在明细页面打开以后提取职位信息发到数据库
 * 3. 关闭广告页
 */
(() => {
  console.log('[content_script_boss] boss load');

  async function main() {
    console.log('[content_script_boss] main');
    await sleep(200);
    if (!isBoss()) return;
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
    console.log('[content_script_boss] getUrlList');
    await sleep(DELAY);

    const joblist = document.getElementsByClassName('job-card-body clearfix');
    console.log('[content_script_boss] joblist.length:', joblist.length);
    for (let i = 0; i < joblist.length; i++) {
      await sleep(DELAY);
      let url = joblist[i].getElementsByClassName('job-card-left')[0].href;
      if (url) {
        chrome.runtime.sendMessage({ url });
      }
    }
    clickNext();
    getUrlList();
  }

  // 点击下一页
  function clickNext() {
    console.log('[content_script_boss] clickNext');
    document.getElementsByClassName('ui-icon-arrow-right')[0].click();
  }

  // 获取明细页面信息
  async function getInfo() {
    console.log('[content_script_boss] getInfo');
    await sleep(DELAY);

    const position =
      document.getElementsByClassName('info-primary')[0].children[1].children[0].innerText; // 职位
    const income =
      document.getElementsByClassName('info-primary')[0].children[1].children[1].innerText; // 金额

    const city = document.getElementsByClassName('text-desc text-city')[0].innerText; // 城市
    const address = document.getElementsByClassName('location-address')[0];
    const area = address ? address.innerText.split('区')[0].replace('上海', '') + '区' : '';

    const exp = document.getElementsByClassName('text-desc text-experiece')[0].innerText; //经验
    const education = document.getElementsByClassName('text-desc text-degree')[0].innerText; //学历

    const now = new Date();
    const release_month = now.getMonth() + 1; // 发布月
    const release_day = now.getDate(); // 发布日
    const release_year = now.getFullYear(); // 发布年

    const job_detail = document.getElementsByClassName('job-sec-text')[0].innerText; // 职位信息
    let work_address = document.getElementsByClassName('location-address')[0]; // 工作地址
    work_address = work_address ? work_address.innerText : null;

    const company_info = document.getElementsByClassName('level-list')[0];
    const company_name = company_info ? company_info.children[0].innerText.split('\n')[1] : ''; // 公司名
    const company_type = company_info ? company_info.children[3].innerText : ''; // 公司类型 上市，民营

    let company_financing = document.getElementsByClassName('sider-company')[0]; // 融资情况
    company_financing = company_financing ? company_financing.children[2].innerText : '';
    let company_scale = document.getElementsByClassName('sider-company')[0]; // 公司规模
    company_scale = company_scale ? company_scale.children[3].innerText : '';
    let company_trade = document.getElementsByClassName('sider-company')[0]; // 公司行业
    company_trade = company_trade ? company_trade.children[4].innerText : '';

    const source = 'Boss'; // 来源
    const url = document.baseURI; // 原始URL

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
      job_detail,
      work_address,
      company_name,
      company_type,
      company_scale,
      company_trade,
      company_financing,
      source,
      url,
    });

    window.close();
  }

  // 检测是否为boss直聘
  const isBoss = () => /zhipin.com/.test(document.baseURI);

  // 检测当前页是不是查询列表页
  const isSearchPage = () => /www.zhipin.com\/web/.test(document.baseURI);

  // 检测当前页是不是明细页
  const isInfoPage = () => /www.zhipin.com\/job_detail/.test(document.baseURI);

  // 检测是否为首页
  const isHomePage = () => /www.zhipin.com\/shanghai/.test(document.baseURI);

  // 等待页面加载完毕以后再执行main
  document.addEventListener('DOMContentLoaded', main);
})();
