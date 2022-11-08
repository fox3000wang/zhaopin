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
    await sleep(500);
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

    const joblist = document.getElementsByClassName('j_joblist')[0].children;
    for (let i = 0; i < joblist.length; i++) {
      await sleep(DELAY);
      let url = joblist[i].getElementsByClassName('el')[0].href;
      chrome.runtime.sendMessage({ url });
    }

    clickNext();
    await sleep(DELAY);
    getUrlList();
  }

  // 点击下一页
  function clickNext() {
    document.getElementsByClassName('next')[0].children[0].click();
  }

  // 获取明细页面信息
  async function getInfo() {
    await sleep(DELAY);

    const position = document.getElementsByClassName('cn')[0].children[0].innerText; // 职位
    const income = document.getElementsByClassName('cn')[0].children[1].innerText; // 金额

    const other = document.getElementsByClassName('cn')[0].children[2].innerText.split('|');
    const city = other[0].split('-')[0].trim(); // 城市
    let area = other[0].split('-')[1]; // 区
    area = area ? area.trim() : '';

    let exp, education, release_month, release_day;
    if (other.length === 4) {
      exp = other[1].trim(); //经验
      education = other[2].trim(); //学历
      release_month = other[3].trim().replace('发布', '').split('-')[0]; // 发布月
      release_day = other[3].trim().replace('发布', '').split('-')[1]; // 发布日
    }
    if (other.length === 3) {
      exp = '';
      education = other[1].trim(); //学历
      release_month = other[2].trim().replace('发布', '').split('-')[0]; // 发布月
      release_day = other[2].trim().replace('发布', '').split('-')[1]; // 发布日
    }

    let release_year;
    const now = new Date();
    if (now.getMonth < 3 && release_month > 9) {
      release_year = now.getFullYear() - 1;
    } else {
      release_year = now.getFullYear();
    }

    const job_detail = document.getElementsByClassName('bmsg job_msg inbox')[0].innerText; // 职位信息
    const work_address = document.getElementsByClassName('fp')[1].innerText.split('\n')[1]; // 工作地址
    const company_name = document.getElementsByClassName('com_name')[0].innerText; // 公司名
    const company_type = document.getElementsByClassName('com_tag')[0].children[0].innerText; // 公司类型 上市，民营
    const company_scale = document.getElementsByClassName('com_tag')[0].children[1].innerText; // 公司规模
    const company_trade = document.getElementsByClassName('com_tag')[0].children[2].innerText; // 公司类型 上市，民营

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
  const isSearchPage = () => /search.zhipin.com/.test(document.baseURI);

  // 检测当前页是不是明细页
  const isInfoPage = () => /jobs.zhipin.com/.test(document.baseURI);

  // 检测是否为首页
  const isHomePage = () => /www.zhipin.com/.test(document.baseURI);

  main();
})();
