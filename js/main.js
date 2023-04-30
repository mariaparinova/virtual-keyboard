import createTextareaForKeyboard from './func-library/textarea-for-keyboard.js';
import keyboardKeysEn from './constants/keyboard-en.js';
import createKeyboard from './func-library/keyboard-render.js';

function init() {
  const mainElem = document.createElement('main');
  mainElem.className = 'main';

  mainElem.append(createTextareaForKeyboard());
  mainElem.append(createKeyboard(keyboardKeysEn));

  document.body.append(mainElem);
}

init();
