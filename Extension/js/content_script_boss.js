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

    const joblist = document.getElementsByClassName('job-card-body clearfix');
    for (let i = 0; i < joblist.length; i++) {
      await sleep(DELAY);
      let url = joblist[i].getElementsByClassName('job-card-left')[0].href;
      if (url) {
        chrome.runtime.sendMessage({ url });
      }
    }
    clickNext();
    //await sleep(DELAY);
    getUrlList();
  }

  // 点击下一页
  function clickNext() {
    document.getElementsByClassName('next')[0].children[0].click();
  }

  // 获取明细页面信息
  async function getInfo() {
    await sleep(DELAY);

    const position =
      document.getElementsByClassName('info-primary')[0].children[1].children[0].innerText; // 职位
    const income =
      document.getElementsByClassName('info-primary')[0].children[1].children[1].innerText; // 金额

    const city = document.getElementsByClassName('text-desc text-city')[0].innerText; // 城市
    const address = document.getElementsByClassName('location-address')[0].innerText;
    const area = address.split('区')[0].replace('上海', '') + '区';

    const exp = document.getElementsByClassName('text-desc text-experiece')[0].innerText; //经验
    const education = document.getElementsByClassName('text-desc text-degree')[0].innerText; //学历

    const now = new Date();
    const release_month = now.getMonth() + 1; // 发布月
    const release_day = now.getDate(); // 发布日
    const release_year = now.getFullYear(); // 发布年

    const job_detail = document.getElementsByClassName('job-sec-text')[0].innerText; // 职位信息
    const work_address = document.getElementsByClassName('location-address')[0].innerText; // 工作地址

    const company_info = document.getElementsByClassName('level-list')[0];
    const company_name = company_info.children[0].innerText.split('\n')[1]; // 公司名
    const company_type = company_info.children[3].innerText; // 公司类型 上市，民营

    const company_financing =
      document.getElementsByClassName('sider-company')[0].children[2].innerText; // 融资情况
    const company_scale = document.getElementsByClassName('sider-company')[0].children[3].innerText; // 公司规模
    const company_trade = document.getElementsByClassName('sider-company')[0].children[4].innerText; // 公司行业

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
  window.onload = main;
})();
