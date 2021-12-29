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
  let eleSizes = document.getElementById(id).getBoundingClientRect();
  let vhInPixel = window.innerHeight;
  return eleSizes.top - (vhInPixel - (eleSizes.height + 10));
};
