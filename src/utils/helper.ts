export function getScrollBarWidth() {
  const el: HTMLDivElement = document.createElement('div');
  el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute;';
  document.body.appendChild(el);
  const width: number = el.offsetWidth - el.clientWidth;
  el.remove();
  return width;
}