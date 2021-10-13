export const isBlank = (str) => /^\s*$/.test(str);

export const isEmpty = (str) => !str || str.length === 0;

export const checkError = (...args) => {
  if (args[0].response)
    if (args[0].response.status >= args[1]) {
      throwError(args[2], args[3], args[4]);
    }
};
export const throwError = (...args) => {
  args[0].value = true;
  args[1].value = args[2];
  throw new Error(args[2]);
};
export const toggleInfo = (...args) => {
  args[0].value = false;
  args[1].value = true;
};
