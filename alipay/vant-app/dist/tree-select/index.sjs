var antmove_export = {};
import antmove_1_module from '../wxs/array.sjs';

/* eslint-disable */
var array = antmove_1_module;

function isActive(activeList, itemId) {
  if (array.isArray(activeList)) {
    return activeList.indexOf(itemId) > -1;
  }

  return activeList === itemId;
}

antmove_export.isActive = isActive;
export default antmove_export;