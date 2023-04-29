export default function createTextareaForKeyboard() {
  const textareaElem = document.createElement('textarea');
  textareaElem.className = 'textarea';

  return textareaElem;
}
