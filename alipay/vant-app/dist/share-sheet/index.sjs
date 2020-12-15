var antmove_export = {};

/* eslint-disable */
function isMulti(options) {
  if (options == null || options[0] == null) {
    return false;
  }

  return "Array" === options.constructor && "Array" === options[0].constructor;
}

antmove_export = {
  isMulti: isMulti
};
export default antmove_export;