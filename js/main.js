import createTextareaForKeyboard from './func-library/textarea-for-keyboard.js';
import keyboardKeysEn from './constants/keyboard-en.js';
import keyboardKeysRu from './constants/keyboard-ru.js';
import createKeyboard from './func-library/keyboard-render.js';

// let language = 'en';
// language / en / ru

function getInfoEl() {
  const infElem = document.createElement('div');
  infElem.className = '';

  infElem.innerHTML = 'os windows | press Ait + Shift to switch language';

  return infElem;
}

function init() {
  const mainElem = document.createElement('main');
  mainElem.className = 'main';

  const keyboardContainer = document.createElement('div');
  keyboardContainer.className = 'keyboard-container';
  keyboardContainer.append(createKeyboard());

  mainElem.append(getInfoEl());
  mainElem.append(createTextareaForKeyboard());
  mainElem.append(keyboardContainer);

  document.body.append(mainElem);
}

init();
