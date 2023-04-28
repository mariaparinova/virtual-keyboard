export default function createTextareaForKeyboard() {
  const textareaElem = document.createElement('textarea');
  textareaElem.className = 'textarea';

  textareaElem.cols = 30;
  textareaElem.rows = 10;

  return textareaElem;
}
