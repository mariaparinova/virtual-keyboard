import keyboardKeysRu from '../constants/keyboard-ru.js';
import keyboardKeysEn from '../constants/keyboard-en.js';

function createKeyboardButton(key) {
  const btnElem = document.createElement('div');

  btnElem.className = 'keyboard-btn';
  btnElem.dataset.code = key.code;
  btnElem.dataset.value = key.val;
  btnElem.innerText = key.val;

  if (key.val === 'Enter') {
    btnElem.dataset.value = '\n';
  }

  if (key.subval) {
    const subval = document.createElement('div');
    subval.className = 'keyboard-btn-subval';
    subval.innerText = key.subval;

    btnElem.append(subval);
  }

  if (key.print) {
    btnElem.dataset.print = key.print;
  }

  return btnElem;
}

function createKeyboardRow(keysRow) {
  const keyboardRow = document.createElement('div');
  keyboardRow.className = 'keyboard-line';

  keysRow.forEach((key) => keyboardRow.append(createKeyboardButton(key)));

  return keyboardRow;
}

export default function createKeyboard() {
  const keyboardKeys = localStorage.getItem('language') === 'ru' ? keyboardKeysRu : keyboardKeysEn;
  const keyboardElem = document.createElement('div');

  keyboardElem.className = 'keyboard';

  keyboardKeys.forEach((keysRow) => keyboardElem.append(createKeyboardRow(keysRow)));

  return keyboardElem;
}
