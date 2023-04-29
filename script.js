const keyboards = [
  {
    lang: 'en',
    keyboard: [
      [
        {
          keyName: '`',
          keyCode: '`',
          caps: false,
        },
        {
          keyName: '1',
          keyCode: '1',
          caps: false,
        },
        {
          keyName: '2',
          keyCode: '2',
          caps: false,
        },
        {
          keyName: '3',
          keyCode: '3',
          caps: false,
        },
        {
          keyName: '4',
          keyCode: '4',
          caps: false,
        },
        {
          keyName: '5',
          keyCode: '5',
          caps: false,
        },
        {
          keyName: '6',
          keyCode: '6',
          caps: false,
        },
        {
          keyName: '7',
          keyCode: '7',
          caps: false,
        },
        {
          keyName: '8',
          keyCode: '8',
          caps: false,
        },
        {
          keyName: '9',
          keyCode: '9',
          caps: false,
        },
        {
          keyName: '0',
          keyCode: '0',
          caps: false,
        },
        {
          keyName: '-',
          keyCode: '-',
          caps: false,
        },
        {
          keyName: '=',
          keyCode: '=',
          caps: false,
        },
        {
          keyName: 'Backspace',
          keyCode: 'Backspace',
          caps: false,
        },
      ],
      [
        {
          keyName: 'Tab',
          keyCode: 'Tab',
          caps: false,
        },
        {
          keyName: 'q',
          keyCode: 'q',
          caps: true,
        },
        {
          keyName: 'w',
          keyCode: 'w',
          caps: true,
        },
        {
          keyName: 'e',
          keyCode: 'e',
          caps: true,
        },
        {
          keyName: 'r',
          keyCode: 'r',
          caps: true,
        },
        {
          keyName: 't',
          keyCode: 't',
          caps: true,
        },
        {
          keyName: 'y',
          keyCode: 'y',
          caps: true,
        },
        {
          keyName: 'u',
          keyCode: 'u',
          caps: true,
        },
        {
          keyName: 'i',
          keyCode: 'i',
          caps: true,
        },
        {
          keyName: 'o',
          keyCode: 'o',
          caps: true,
        },
        {
          keyName: 'p',
          keyCode: 'p',
          caps: true,
        },
        {
          keyName: '[',
          keyCode: '[',
          caps: false,
        },
        {
          keyName: ']',
          keyCode: ']',
          caps: false,
        },
        {
          keyName: '\\',
          keyCode: '\\',
          caps: false,
        },
      ],
      [
        {
          keyName: 'CapsLock',
          keyCode: 'CapsLock',
          caps: false,
        },
        {
          keyName: 'a',
          keyCode: 'a',
          caps: true,
        },
        {
          keyName: 's',
          keyCode: 's',
          caps: true,
        },
        {
          keyName: 'd',
          keyCode: 'd',
          caps: true,
        },
        {
          keyName: 'f',
          keyCode: 'f',
          caps: true,
        },
        {
          keyName: 'g',
          keyCode: 'g',
          caps: true,
        },
        {
          keyName: 'h',
          keyCode: 'h',
          caps: true,
        },
        {
          keyName: 'j',
          keyCode: 'j',
          caps: true,
        },
        {
          keyName: 'k',
          keyCode: 'k',
          caps: true,
        },
        {
          keyName: 'l',
          keyCode: 'l',
          caps: true,
        },
        {
          keyName: ';',
          keyCode: ';',
          caps: false,
        },
        {
          keyName: "'",
          keyCode: "'",
          caps: false,
        },
        {
          keyName: 'Enter',
          keyCode: 'Enter',
          caps: false,
        },
      ],
      [
        {
          keyName: 'Shift',
          keyCode: 'Shift',
          caps: false,
        },
        {
          keyName: 'z',
          keyCode: 'z',
          caps: true,
        },
        {
          keyName: 'x',
          keyCode: 'x',
          caps: true,
        },
        {
          keyName: 'c',
          keyCode: 'c',
          caps: true,
        },
        {
          keyName: 'v',
          keyCode: 'v',
          caps: true,
        },
        {
          keyName: 'b',
          keyCode: 'b',
          caps: true,
        },
        {
          keyName: 'n',
          keyCode: 'n',
          caps: true,
        },
        {
          keyName: 'm',
          keyCode: 'm',
          caps: true,
        },
        {
          keyName: ',',
          keyCode: ',',
          caps: false,
        },
        {
          keyName: '.',
          keyCode: '.',
          caps: false,
        },
        {
          keyName: '/',
          keyCode: '/',
          caps: false,
        },
        {
          keyName: '▲',
          keyCode: 'ArrowUp',
          caps: false,
        },
        {
          keyName: 'Shift',
          keyCode: 'Shift',
          caps: false,
        },
      ],
      [
        {
          keyName: 'Ctrl',
          keyCode: 'Ctrl',
          caps: false,
        },
        {
          keyName: 'Win',
          keyCode: 'Meta',
          caps: false,
        },
        {
          keyName: 'Alt',
          keyCode: 'Alt',
          caps: false,
        },
        {
          keyName: '',
          keyCode: '',
          caps: false,
        },
        {
          keyName: 'Alt',
          keyCode: 'Alt',
          caps: false,
        },
        {
          keyName: '◄',
          keyCode: 'ArrowLeft',
          caps: false,
        },
        {
          keyName: '▼',
          keyCode: 'ArrowDown',
          caps: false,
        },
        {
          keyName: '►',
          keyCode: 'ArrowRight',
          caps: false,
        },
        {
          keyName: 'Ctrl',
          keyCode: 'Ctrl',
          caps: false,
        },
      ],
    ],
  },
  {
    lang: 'ru',
  },
];

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
  labelOption1.innerText = 'EN';

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
  labelOption2.innerText = 'RU';

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

function renderKeyboard(lang) {
  let keyboard = {};
  for (let i = 0; i < keyboards.length; i += 1) {
    if (keyboards[i].lang === lang) {
      keyboard = keyboards[i].keyboard;
    }
  }
  for (let i = 0; i < 5; i += 1) {
    let keyboardRaw = document.createElement('div');
    keyboardRaw.classList.add('keyboard__raw');
    for (let j = 0; j < keyboard[i].length; j += 1) {
      const keyboardBtn = document.createElement('button');
      keyboardBtn.setAttribute('type', 'button');
      keyboardBtn.classList.add('keyboard__key');
      keyboardBtn.innerText = keyboard[i][j].keyName;
      keyboardBtn.classList.add(keyboard[i][j].keyCode ? keyboard[i][j].keyCode.toLowerCase() : 'space');
      if (keyboard[i][j].caps) {
        keyboardBtn.classList.add('caps');
      }
      keyboardRaw.appendChild(keyboardBtn);
    }
    document.querySelector('.keyboard').appendChild(keyboardRaw);
    keyboardRaw = '';
  }
}

document.addEventListener('load', createLayout());
document.addEventListener('load', renderKeyboard('en'));