function getUrlList() {
  chrome.runtime.sendMessage({});
}

function getInfo() {
  // chrome.runtime.sendMessage({});
}

document.getElementById('btn1').addEventListener('click', getUrlList);
document.getElementById('btn2').addEventListener('click', getInfo);
