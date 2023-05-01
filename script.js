let keyboards;
let lang;
let capslock = false;
let shiftL = false;
let shiftR = false;

function createLayout() {
  const main = document.createElement('main');
  main.classList.add('main');

  const keyboardLabel = document.createElement('label');
  keyboardLabel.classList.add('area-label');
  keyboardLabel.innerText = 'Virtual keyboard';

  const typingArea = document.createElement('textarea');
  typingArea.setAttribute('rows', '8');
  typingArea.setAttribute('cols', '70');
  typingArea.setAttribute('placeholder', 'Start typing here');
  typingArea.setAttribute('id', 'typing-area');

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  const systemInfo = document.createElement('p');
  systemInfo.innerText = 'Клавиатура создана в операционной системе Windows';
  systemInfo.classList.add('info');

  const changeLangInfo = document.createElement('p');
  changeLangInfo.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
  changeLangInfo.classList.add('info');

  main.appendChild(keyboardLabel);
  main.appendChild(typingArea);
  main.appendChild(keyboard);
  main.appendChild(systemInfo);
  main.appendChild(changeLangInfo);
  document.body.appendChild(main);
}

function getKeySymbol(key) {
  if ((capslock || shiftL || shiftR) && !(capslock && (shiftL || shiftR)) && key.caps) {
    return key.keyName.toUpperCase();
  }
  if ((shiftL || shiftR) && key.shift) {
    return key.shift;
  }
  return key.keyName;
}

function rerenderSymbols() {
  let keyboard = [];
  keyboard = keyboards.find((element) => element.lang === lang).keyboard;

  for (let rowIndex = 0; rowIndex < keyboard.length; rowIndex += 1) {
    const row = keyboard[rowIndex];
    for (let keyIndex = 0; keyIndex < row.length; keyIndex += 1) {
      const key = row[keyIndex];
      const button = document.querySelector(`.${key.keyCode.toLowerCase()}`);
      button.innerText = getKeySymbol(key);
    }
  }
}

function setButtonActive(classSelector, active) {
  const button = document.querySelector(`.${classSelector}`);
  if (!button) return;
  if (active) {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
}

function printToTextArea(symbol) {
  const textArea = document.querySelector('#typing-area');
  const startPos = textArea.selectionStart;
  const endPos = textArea.selectionEnd;

  textArea.value = textArea.value.substring(0, startPos) + symbol
    + textArea.value.substring(endPos, textArea.value.length);
  textArea.selectionStart = startPos + symbol.length;
  textArea.selectionEnd = startPos + symbol.length;
  textArea.focus();
}

function backspaceTextArea() {
  const textArea = document.querySelector('#typing-area');
  let startPos = textArea.selectionStart;
  const endPos = textArea.selectionEnd;

  if (startPos === endPos) {
    if (startPos === 0) return;
    startPos -= 1;
  }

  textArea.value = textArea.value.substring(0, startPos)
    + textArea.value.substring(endPos, textArea.value.length);
  textArea.selectionStart = startPos;
  textArea.selectionEnd = startPos;
  textArea.focus();
}

function deleteTextArea() {
  const textArea = document.querySelector('#typing-area');
  const textLength = textArea.value.length;
  const startPos = textArea.selectionStart;
  let endPos = textArea.selectionEnd;

  if (startPos === endPos) {
    if (endPos === textLength) return;
    endPos += 1;
  }

  textArea.value = textArea.value.substring(0, startPos)
    + textArea.value.substring(endPos, textArea.value.length);
  textArea.selectionStart = startPos;
  textArea.selectionEnd = startPos;
  textArea.focus();
}

function toggleCaps() {
  capslock = !capslock;
  setButtonActive('capslock', capslock);
  rerenderSymbols();
}

function btnHandler(key) {
  const symbol = getKeySymbol(key);
  switch (key.keyCode) {
    case 'CapsLock':
      toggleCaps();
      break;
    case 'ShiftLeft': case 'ShiftRight': case 'ControlLeft': case 'ControlRight': case 'AltLeft': case 'AltRight': case 'MetaLeft':
      break;
    case 'Delete':
      deleteTextArea();
      break;
    case 'Backspace':
      backspaceTextArea();
      break;
    case 'Tab':
      printToTextArea('\t');
      break;
    case 'Enter':
      printToTextArea('\n');
      break;
    case 'Space':
      printToTextArea(' ');
      break;
    default: {
      printToTextArea(symbol);
      break;
    }
  }
}

function shiftDown() {
  if (this.classList.contains('shiftright')) {
    shiftR = true;
  } else {
    shiftL = true;
  }
  this.classList.add('active');
  rerenderSymbols();
}

function shiftUp() {
  if (this.classList.contains('shiftright')) {
    shiftR = false;
  } else {
    shiftL = false;
  }
  this.classList.remove('active');
  rerenderSymbols();
}

function renderKeyboard() {
  const mainContainer = document.querySelector('.keyboard');
  mainContainer.innerHTML = '';
  let keyboard = [];

  keyboard = keyboards.find((element) => element.lang === lang).keyboard;

  for (let i = 0; i < 5; i += 1) {
    const keyboardRaw = document.createElement('div');
    keyboardRaw.classList.add('keyboard__raw');
    for (let j = 0; j < keyboard[i].length; j += 1) {
      const currentKey = keyboard[i][j];
      const keyboardBtn = document.createElement('button');
      keyboardBtn.setAttribute('type', 'button');
      keyboardBtn.classList.add('keyboard__key');

      keyboardBtn.innerText = getKeySymbol(currentKey);

      keyboardBtn.classList.add(currentKey.keyCode.toLowerCase());
      if (currentKey.caps) {
        keyboardBtn.classList.add('caps');
      }

      if (currentKey.keyCode === 'ShiftLeft') {
        keyboardBtn.addEventListener('mousedown', shiftDown);
        keyboardBtn.addEventListener('mouseup', shiftUp);
      } else if (currentKey.keyCode === 'ShiftRight') {
        keyboardBtn.addEventListener('mousedown', shiftDown);
        keyboardBtn.addEventListener('mouseup', shiftUp);
      } else {
        keyboardBtn.addEventListener('click', btnHandler.bind(this, currentKey));
      }

      keyboardRaw.appendChild(keyboardBtn);
    }
    mainContainer.appendChild(keyboardRaw);
  }
}

function getKeyByCode(code) {
  let keyboard = [];
  keyboard = keyboards.find((element) => element.lang === lang).keyboard;

  for (let rowIndex = 0; rowIndex < keyboard.length; rowIndex += 1) {
    const row = keyboard[rowIndex];
    for (let keyIndex = 0; keyIndex < row.length; keyIndex += 1) {
      const key = row[keyIndex];
      if (key.keyCode === code) {
        return key;
      }
    }
  }
  return '';
}

document.addEventListener('keydown', (event) => {
  const key = getKeyByCode(event.code);
  if (!key) return;
  event.preventDefault();
  btnHandler(key);

  if (event.altKey && event.ctrlKey) {
    if (lang === 'en') {
      lang = 'ru';
    } else {
      lang = 'en';
    }
    rerenderSymbols();
  }

  switch (event.code) {
    case 'CapsLock':
      break;
    case 'ShiftLeft':
      shiftDown.call(document.querySelector('.shiftleft'));
      break;
    case 'ShiftRight':
      shiftDown.call(document.querySelector('.shiftright'));
      break;
    default: {
      const keyCode = event.code.toLowerCase();
      setButtonActive(keyCode, true);
      break;
    }
  }
});

document.addEventListener('keyup', (event) => {
  event.preventDefault();
  document.querySelector('#typing-area').focus();

  switch (event.code) {
    case 'CapsLock':
      break;
    case 'ShiftLeft': case 'ShiftRight':
      shiftUp.call(document.querySelector('.shiftleft'));
      shiftUp.call(document.querySelector('.shiftright'));
      break;
    default: {
      const keyCode = event.code.toLowerCase();
      setButtonActive(keyCode, false);
      break;
    }
  }
});

window.addEventListener('load', () => {
  lang = localStorage.getItem('lang') || 'en';

  fetch('./keyboards.json')
    .then((response) => response.json())
    .then((data) => {
      keyboards = data;
      createLayout();
      renderKeyboard();
    });
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('lang', lang);
});
