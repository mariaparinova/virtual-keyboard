import createKeyboard from "./keyboard-render.js";

const holdBthCodes = ['CapsLock', 'ShiftLeft', 'ShiftRight', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlLeft', 'ControlRight'];
const highlightedBtns = new Set();

function highlightButton(btnEl, btnCode) {
  const twinBtnCode = (btnEl.dataset) ? btnEl.dataset.twin : undefined;
  const twinBtnEl = twinBtnCode ? btnEl.closest('.keyboard').querySelector(`[data-code=${twinBtnCode}]`) : undefined;

  if (holdBthCodes.includes(btnCode)) {

    if (highlightedBtns.has(btnCode) || highlightedBtns.has(twinBtnCode)) {
      highlightedBtns.delete(btnCode);
      removeHighlightButton(btnEl);

      if (twinBtnEl) {
        highlightedBtns.delete(twinBtnCode);
        removeHighlightButton(twinBtnEl);
      }

      return;
    }

    highlightedBtns.add(btnCode);

    if (twinBtnEl) {
      highlightedBtns.add(twinBtnCode);
    }
  }

  btnEl.classList.add('on-hold');

  if (twinBtnEl) {
    twinBtnEl.classList.add('on-hold');
  }
}

function removeHighlightButton(btnEl, btnCode) {
  const twinBtnCode = btnEl.dataset?.twin;
  const twinBtnEl = twinBtnCode ? btnEl.closest('.keyboard').querySelector(`[data-code=${twinBtnCode}]`) : undefined;

  if (highlightedBtns.has(btnCode)) {
    return;
  }

  btnEl.classList.remove('on-hold');

  if (twinBtnEl) {
    twinBtnEl.classList.remove('on-hold');
  }
}

function printText(btnEl, textArea) {
  let character = btnEl.dataset.value;
  const text = textArea.value;
  let cursorLocation = textArea.selectionStart;
  let textStart = text.slice(0, cursorLocation);
  let textEnd = text.slice(cursorLocation);

  if (btnEl.dataset.code === 'AltLeft' || btnEl.dataset.code === 'AltRight') {
    if (highlightedBtns.has('ShiftLeft') || highlightedBtns.has('ShiftRight')) {
      changeLang(textArea, cursorLocation);

      return;
    }
  }

  if (btnEl.dataset.code === 'ShiftLeft' || btnEl.dataset.code === 'ShiftRight') {
    if (highlightedBtns.has('AltLeft') || highlightedBtns.has('AltRight')) {
      changeLang(textArea, cursorLocation);

      return;
    }
  }

  if (btnEl.dataset.code === 'Tab') {
    textArea.value = textStart + '  ' + textEnd;

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
    textArea.value += '\n';
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

function changeLang(textArea, cursorLocation) {
  const notActiveLang = localStorage.getItem('language') === 'en' ? 'ru' : 'en';

  localStorage.setItem('language', `${notActiveLang}`);

  document.querySelector('.keyboard-container').innerHTML = '';
  document.querySelector('.keyboard-container').append(createKeyboard());

  for (let highlightedBtn of highlightedBtns) {
    document.querySelector(`[data-code=${highlightedBtn}]`).classList.add('on-hold');
  }

  textArea.setSelectionRange(cursorLocation, cursorLocation);
}

document.addEventListener('keydown', (event) => {
  const btnCode = event.code;
  const btnElem = document.querySelector(`[data-code=${btnCode}]`);

  if (btnCode === 'AltLeft' || btnCode === 'AltLeft') {
    event.preventDefault();
  }

  highlightButton(btnElem, btnCode);
});

document.addEventListener('keyup', (event) => {
  const btnCode = event.code;
  const btnElem = document.querySelector(`[data-code=${btnCode}]`);

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

  printText(btnElem, document.querySelector('.textarea'));
})

document.body.addEventListener('mouseup', (event) => {
  const btnElem = event.target.closest('.keyboard-btn');

  if (!btnElem) {
    return;
  }

  const btnCode = btnElem.dataset.code;

  removeHighlightButton(btnElem, btnCode);
})
