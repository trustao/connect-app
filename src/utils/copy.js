let textArea,
  copy;

// 判断是不是ios端
function isOS() {
  return navigator.userAgent.match(/ipad|iphone/i);
}

//创建文本元素
function createTextArea(text) {
  textArea = document.createElement('textArea');
  textArea.innerHTML = text;
  textArea.value = text;
  document.body.appendChild(textArea);
}

//选择内容
function selectText() {
  var range,
    selection;

  if (isOS()) {
    range = document.createRange();
    range.selectNodeContents(textArea);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }
}

//复制到剪贴板
function copyToClipboard(res, rej) {
  try {
    if (document.execCommand("Copy")) {
      res()
    } else {
      rej()
    }
  } catch (err) {
    rej()
  }
  document.body.removeChild(textArea);
}

export default function (text) {
  return new Promise((resolve, reject) => {
    createTextArea(text);
    selectText();
    copyToClipboard(resolve, resolve);
  })
}
