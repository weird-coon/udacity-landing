const DEFAULT_DEBOUNCE_TIMEOUT = 300; // ms

/**
 * Call func after the timer
 * How to use: const processChange = debounce(() => someFunction())
 *
 * @param {*} func
 * @param {*} timeout
 * @returns
 */
export const debounce = (func, timeout = DEFAULT_DEBOUNCE_TIMEOUT) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
