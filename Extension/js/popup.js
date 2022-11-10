(() => {
  const urls = [
    'https://search.51job.com/list/020000,000000,0000,00,9,99,%25E6%2595%25B0%25E6%258D%25AE%25E5%2588%2586%25E6%259E%2590%25E5%25B8%2588,2,1.html?lang=c&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&ord_field=0&dibiaoid=0&line=&welfare=',
    'https://sou.zhaopin.com/?jl=538&kw=%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E5%B8%88',
    'https://www.zhipin.com/web/geek/job?query=%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90%E5%B8%88&city=101020100',
  ];

  function btn1ClickHandler() {
    const url = urls[0];
    chrome.runtime.sendMessage({ url });
  }
  function btn2ClickHandler() {
    const url = urls[1];
    chrome.runtime.sendMessage({ url });
  }
  function btn3ClickHandler() {
    const url = urls[2];
    chrome.runtime.sendMessage({ url });
  }
  function btn0ClickHandler() {
    urls.forEach(url => {
      chrome.runtime.sendMessage({ url });
      sleep(1000);
    });
  }

  document.getElementById('btn1').addEventListener('click', btn1ClickHandler);
  document.getElementById('btn2').addEventListener('click', btn2ClickHandler);
  document.getElementById('btn3').addEventListener('click', btn3ClickHandler);
  document.getElementById('btn0').addEventListener('click', btn0ClickHandler);

  const sleep = DELAY => new Promise(resolve => setTimeout(resolve, DELAY));
})();
