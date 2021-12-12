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
