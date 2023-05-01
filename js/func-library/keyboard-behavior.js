import createKeyboard from './keyboard-render.js';

const textArea = document.querySelector('.textarea');
const holdBthCodes = ['CapsLock'];
const highlightedBtns = new Set();
let isAlt = false;
let isShift = false;
let isCtrl = false;

function changeLang(cursorLocation) {
  const notActiveLang = localStorage.getItem('language') === 'en' ? 'ru' : 'en';

  localStorage.setItem('language', `${notActiveLang}`);

  document.querySelector('.keyboard-container').innerHTML = '';
  document.querySelector('.keyboard-container').append(createKeyboard());

  if (highlightedBtns.has('CapsLock')) {
    document.querySelector('[data-code=CapsLock]').classList.add('on-hold');
  }

  if (isAlt) {
    document.querySelector('[data-code=AltLeft]').classList.add('on-hold');
  }

  if (isShift) {
    document.querySelector('[data-code=ShiftLeft]').classList.add('on-hold');
  }

  if (isCtrl) {
    document.querySelector('[data-code=ControlLeft]').classList.add('on-hold');
  }

  textArea.setSelectionRange(cursorLocation, cursorLocation);
}

function checkCombBtnForSwitchLang(btnCode, cursorLocation) {
  if (btnCode === 'AltLeft') {
    if (document.querySelector('[data-code=ControlLeft]').classList.contains('on-hold')) {
      changeLang(cursorLocation);

      return;
    }
  }

  if (btnCode === 'ControlLeft') {
    if (document.querySelector('[data-code=AltLeft]').classList.contains('on-hold')) {
      changeLang(cursorLocation);
    }
  }
}

function removeHighlightButton(btnEl, btnCode) {
  if (highlightedBtns.has(btnCode)) {
    return;
  }

  btnEl.classList.remove('on-hold');
}

function highlightButton(btnEl, btnCode) {
  if (holdBthCodes.includes(btnCode)) {
    if (highlightedBtns.has(btnCode)) {
      highlightedBtns.delete(btnCode);
      removeHighlightButton(btnEl);

      return;
    }

    highlightedBtns.add(btnCode);
  }

  btnEl.classList.add('on-hold');
}

function printText(btnEl) {
  let character = btnEl.dataset.value;
  const text = textArea.value;
  const cursorLocation = textArea.selectionStart;
  let textStart = text.slice(0, cursorLocation);
  let textEnd = text.slice(cursorLocation);

  if (btnEl.dataset.code === 'Tab') {
    textArea.value = `${textStart}  ${textEnd}`;
    textArea.setSelectionRange(cursorLocation + 2, cursorLocation + 2);

    return;
  }

  if (btnEl.dataset.code === 'Backspace') {
    textStart = text.slice(0, cursorLocation - 1);

    textArea.value = textStart + textEnd;
    textArea.setSelectionRange(cursorLocation - 1, cursorLocation - 1);

    return;
  }

  if (btnEl.dataset.code === 'Delete') {
    textEnd = text.slice(cursorLocation + 1);
    textArea.value = textStart + textEnd;

    textArea.setSelectionRange(cursorLocation, cursorLocation);

    return;
  }

  if (btnEl.dataset.code === 'Enter') {
    character = '\n';
    textArea.value = `${textStart}${character}${textEnd}`;

    textArea.setSelectionRange(cursorLocation + 1, cursorLocation + 1);

    return;
  }

  if (highlightedBtns.has('CapsLock')) {
    character = character.toUpperCase();
  }

  if (btnEl.dataset.print) {
    textArea.value = textStart + character + textEnd;

    textArea.setSelectionRange(cursorLocation + 1, cursorLocation + 1);
  }
}

document.addEventListener('keydown', (event) => {
  const btnCode = event.code;
  const btnElem = document.querySelector(`[data-code=${btnCode}]`);
  const cursorLocation = textArea.selectionStart;

  if (btnCode === 'AltLeft' || btnCode === 'AltRight') {
    event.preventDefault();
  }

  if (btnCode === 'AltLeft') {
    isAlt = true;

    checkCombBtnForSwitchLang(btnCode, cursorLocation);
  }

  if (btnCode === 'ShiftLeft') {
    isShift = true;
  }

  if (btnCode === 'ControlLeft') {
    isCtrl = true;
    checkCombBtnForSwitchLang(btnCode, cursorLocation);
  }

  highlightButton(btnElem, btnCode);
});

document.addEventListener('keyup', (event) => {
  const btnCode = event.code;
  const btnElem = document.querySelector(`[data-code=${btnCode}]`);

  if (btnCode === 'AltLeft') {
    isAlt = false;
  }

  if (btnCode === 'ShiftLeft') {
    isShift = false;
  }

  if (btnCode === 'ControlLeft') {
    isCtrl = false;
  }

  removeHighlightButton(btnElem, btnCode);
});

document.body.addEventListener('mousedown', (event) => {
  const btnElem = event.target.closest('.keyboard-btn');

  if (!btnElem) {
    return;
  }

  const btnCode = btnElem.dataset.code;

  if (holdBthCodes.includes(btnCode)) {
    highlightButton(btnElem, btnCode);
  }

  printText(btnElem, textArea);
});

document.body.addEventListener('mouseup', (event) => {
  const btnElem = event.target.closest('.keyboard-btn');

  if (!btnElem) {
    return;
  }

  const btnCode = btnElem.dataset.code;

  removeHighlightButton(btnElem, btnCode);
});
