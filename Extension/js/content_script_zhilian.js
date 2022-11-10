/**
 * 本页只负责智联招聘:
 * 1. 在职位检索结果列表页面逐个打开每个明细页
 * 2. 在明细页面打开以后提取职位信息发到数据库
 * 3. 关闭广告页
 */
(() => {
  console.log('[content_script_zhilian] zhilian load');

  async function main() {
    console.log('[content_script_zhilian] main');
    await sleep(200);
    if (!isZhiLian()) return;
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
    console.log('[content_script_zhilian] getUrlList');
    await sleep(DELAY);

    const joblist = document.getElementsByClassName('positionlist')[0].children;
    for (let i = 0; i < joblist.length; i++) {
      await sleep(DELAY);
      let url = joblist[i].children[0] ? joblist[i].children[0].href : null;
      if (url) {
        chrome.runtime.sendMessage({ url });
      }
    }
    clickNext();
    getUrlList();
  }

  // 点击下一页
  function clickNext() {
    console.log('[content_script_zhilian] clickNext');
    document.getElementsByClassName('btn soupager__btn')[1].click();
  }

  // 获取明细页面信息 更新于 11月7日
  async function getInfo() {
    console.log('[content_script_zhilian] getInfo');
    await sleep(DELAY);

    const position = document.getElementsByClassName('summary-plane__title')[0].innerText; // 职位
    const income = document.getElementsByClassName('summary-plane__salary')[0].innerText; // 金额

    const city =
      document.getElementsByClassName('summary-plane__info')[0].children[0].children[0].innerText; // 城市
    let area = document.getElementsByClassName('summary-plane__info')[0].children[0].children[1]; // 区
    area = area ? area.innerText : '';

    const exp = document.getElementsByClassName('summary-plane__info')[0].children[1].innerText; // 经验
    const education =
      document.getElementsByClassName('summary-plane__info')[0].children[2].innerText; // 教育

    const date = document
      .getElementsByClassName('summary-plane__time')[0]
      .innerText.replace('更新于 ', ''); // 10月2日

    let release_year;
    const now = new Date();
    if (now.getMonth < 3 && release_month > 9) {
      release_year = now.getFullYear() - 1;
    } else {
      release_year = now.getFullYear();
    }

    let release_month, release_day;
    if (date === '今天') {
      release_month = now.getMonth() + 1;
      release_day = now.getDate();
    } else {
      release_month = date.split('月')[0]; // 发布月
      release_day = date.split('月')[1].replace('日', ''); // 发布日
    }

    const job_detail = document.getElementsByClassName('describtion__detail-content')[0].innerText; // 职位信息
    const work_address = document.getElementsByClassName('job-address__content-text')[0].innerText; // 工作地址
    const company_name = document.getElementsByClassName('company__title')[0].innerText; // 公司名
    let company_trade = document.getElementsByClassName('company__industry')[0]; // 公司行业   金融, 地产
    company_trade = company_trade ? company_trade.innerText : '';
    let company_scale = document.getElementsByClassName('company__size')[0]; // 公司规模   50人, 1000人
    company_scale = company_scale ? company_scale.innerText : '';
    let company_financing = document.getElementsByClassName('company__size')[1]; // 融资情况
    company_financing = company_financing ? company_financing.innerText : '';

    const company_type = ''; // 公司类型    上市,民营,合资

    const source = '智联招聘'; // 来源
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

  // 检测是否为智联
  const isZhiLian = () => /zhaopin.com/.test(document.baseURI);

  // 检测当前页是不是查询列表页
  const isSearchPage = () => /sou.zhaopin.com/.test(document.baseURI);

  // 检测当前页是不是明细页
  const isInfoPage = () => /jobs.zhaopin.com/.test(document.baseURI);

  // 检测是否为首页
  const isHomePage = () => /www.zhaopin.com/.test(document.baseURI);

  // 等待页面加载完毕以后再执行main
  document.addEventListener('DOMContentLoaded', main);
})();
