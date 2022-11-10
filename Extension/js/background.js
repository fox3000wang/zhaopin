// background.js 核心业务都存在这里
console.log('background.js');

// TODO: 通信的借口需要统一设计
function openUrl(request, sender, sendResponse) {
  console.log(request);
  chrome.tabs.create({ url: request.url });
}
chrome.runtime.onMessage.addListener(openUrl);
