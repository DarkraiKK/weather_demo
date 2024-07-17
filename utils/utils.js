export function debounce(fn, delay) {
  let timeoutId = null;
  return function(...args) {
    if (timeoutId) clearTimeout(timeoutId); // 清除之前的定时器
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}