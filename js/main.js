import createTextareaForKeyboard from './func-library/textarea-for-keyboard.js';
import createKeyboard from './func-library/keyboard-render.js';

function getInfoEl() {
  const infElem = document.createElement('div');
  infElem.className = '';

  infElem.innerHTML = 'windows<br>Для переключения языка комбинация: левыe ctrl + alt';

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
