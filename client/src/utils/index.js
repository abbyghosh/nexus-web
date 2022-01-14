/**
 *
 * @param {Function} fn - Calback Function
 * @param {Number} time - Time in ms
 * @returns Function
 */
export const debounce = (fn, time) => {
  let timer;

  return function (...args) {
    let context = this;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
};

export const scrollToMovieCardPixel = (id) => {
  let ele = document.getElementById(id);
  if (ele) {
    let eleSizes = ele.getBoundingClientRect();
    let vhInPixel = window.innerHeight;
    return eleSizes.top - (vhInPixel - (eleSizes.height + 10));
  }
};
