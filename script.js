let keyboards;
let lang = 'en';

function createLayout() {
  const main = document.createElement('main');
  main.classList.add('main');

  const keyboardLabel = document.createElement('label');
  keyboardLabel.classList.add('area-label');
  keyboardLabel.innerText = 'Virtual keyboard';

  const chooseLang = document.createElement('div');
  chooseLang.classList.add('choose-lang');

  const chooseLangOption1 = document.createElement('div');
  chooseLangOption1.classList.add('choose-lang__option');

  const chooseLangInput1 = document.createElement('input');
  chooseLangInput1.setAttribute('name', 'lang');
  chooseLangInput1.setAttribute('type', 'radio');
  chooseLangInput1.setAttribute('id', 'en');
  chooseLangInput1.setAttribute('value', 'en');
  chooseLangInput1.setAttribute('checked', true);
  chooseLangInput1.classList.add('choose-lang__option');

  const labelOption1 = document.createElement('label');
  labelOption1.setAttribute('for', 'en');
  labelOption1.innerText = 'English';

  const chooseLangOption2 = document.createElement('div');
  chooseLangOption2.classList.add('choose-lang__option');

  const chooseLangInput2 = document.createElement('input');
  chooseLangInput2.name = 'lang';
  chooseLangInput2.type = 'radio';
  chooseLangInput2.id = 'ru';
  chooseLangInput2.value = 'ru';
  chooseLangInput2.classList.add('choose-lang__option');

  const labelOption2 = document.createElement('label');
  labelOption2.setAttribute('for', 'ru');
  labelOption2.innerText = 'Russian';

  const typingArea = document.createElement('textarea');
  typingArea.setAttribute('rows', '8');
  typingArea.setAttribute('cols', '75');
  typingArea.setAttribute('placeholder', 'Start typing here');
  typingArea.setAttribute('id', 'typing-area');

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  main.appendChild(keyboardLabel);
  chooseLangOption1.appendChild(chooseLangInput1);
  chooseLangOption1.appendChild(labelOption1);
  chooseLang.appendChild(chooseLangOption1);
  chooseLangOption2.appendChild(chooseLangInput2);
  chooseLangOption2.appendChild(labelOption2);
  chooseLang.appendChild(chooseLangOption2);
  main.appendChild(chooseLang);
  main.appendChild(typingArea);
  main.appendChild(keyboard);
  document.body.appendChild(main);
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

let capslock = false;
let shiftL = false;
let shiftR = false;
let rerenderKeyboard;

function toggleCaps() {
  capslock = !capslock;
  rerenderKeyboard();
}

function btnHandler(keyCode, symbol) {
  switch (keyCode) {
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

function shiftDown(side) {
  if (!(side === 'R' ? shiftR : shiftL)) {
    if (side === 'R') {
      shiftR = true;
    } else {
      shiftL = true;
    }
    rerenderKeyboard();
  }
}

function shiftUp(side) {
  if (side === 'R') {
    shiftR = false;
  } else {
    shiftL = false;
  }
  rerenderKeyboard();
}

rerenderKeyboard = function renderKeyboard() {
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

      if ((capslock || shiftL || shiftR) && !(capslock && (shiftL || shiftR)) && currentKey.caps) {
        keyboardBtn.innerText = currentKey.keyName.toUpperCase();
      } else if ((shiftL || shiftR) && currentKey.shift) {
        keyboardBtn.innerText = currentKey.shift;
      } else {
        keyboardBtn.innerText = currentKey.keyName;
      }

      keyboardBtn.classList.add(currentKey.keyCode.toLowerCase());
      if (currentKey.caps) {
        keyboardBtn.classList.add('caps');
      }

      if (currentKey.keyCode === 'ShiftLeft') {
        keyboardBtn.addEventListener('mousedown', shiftDown.bind(this, 'L'));
        keyboardBtn.addEventListener('mouseup', shiftUp.bind(this, 'L'));
        if (shiftL) {
          keyboardBtn.classList.add('active');
        }
      } else if (currentKey.keyCode === 'ShiftRight') {
        keyboardBtn.addEventListener('mousedown', shiftDown.bind(this, 'R'));
        keyboardBtn.addEventListener('mouseup', shiftUp.bind(this, 'R'));
        if (shiftR) {
          keyboardBtn.classList.add('active');
        }
      } else if (currentKey.keyCode === 'CapsLock') {
        keyboardBtn.addEventListener('click', toggleCaps);
        if (capslock) {
          keyboardBtn.classList.add('active');
        }
      } else {
        keyboardBtn.addEventListener('click', btnHandler.bind(this, currentKey.keyCode, keyboardBtn.innerText));
      }

      keyboardRaw.appendChild(keyboardBtn);
    }
    mainContainer.appendChild(keyboardRaw);
  }
};

fetch('./keyboards.json')
  .then((response) => response.json())
  .then((data) => {
    keyboards = data;
    document.addEventListener('load', createLayout());
    document.addEventListener('load', rerenderKeyboard());
  });
