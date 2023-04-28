import createTextareaForKeyboard from './func-library/textarea-for-keyboard.js';

function init() {
  const mainElem = document.createElement('main');
  mainElem.className = 'main';
  document.body.append(mainElem);

  document.querySelector('.main').append(createTextareaForKeyboard());
}

init();
