function createKeyboardButton(key) {
  const btnElem = document.createElement('div');
  btnElem.className = 'keyboard-button';
  btnElem.innerText = key.val;

  if (key.subval) {
    const subval = document.createElement('div');
    subval.className = 'keyboard-button-subval';
    subval.innerText = key.subval;

    btnElem.append(subval);
  }

  return btnElem;
}

function createKeyboardRow(keysRow) {
  const keyboardRow = document.createElement('div');
  keyboardRow.className = 'keyboard-line';

  keysRow.forEach((key) => keyboardRow.append(createKeyboardButton(key)));

  return keyboardRow;
}

export default function createKeyboard(keyboardKeys) {
  const keyboardElem = document.createElement('div');
  keyboardElem.className = 'keyboard';

  keyboardKeys.forEach((keysRow) => keyboardElem.append(createKeyboardRow(keysRow)));

  return keyboardElem;
}
