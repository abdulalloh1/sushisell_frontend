export function getScrollBarWidth() {
  const el: HTMLDivElement = document.createElement('div');
  el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute;';
  document.body.appendChild(el);
  const width: number = el.offsetWidth - el.clientWidth;
  el.remove();
  return width;
}

export function generatorRandomID () {
  return Math.floor(Math.random() * Date.now()).toString(16)
}