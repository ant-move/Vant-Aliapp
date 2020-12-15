var antmove_export = {};
import antmove_1_module from './bem.sjs';
import antmove_2_module from './memoize.sjs';
import antmove_3_module from './add-unit.sjs';

/* eslint-disable */
var bem = antmove_1_module.bem;
var memoize = antmove_2_module.memoize;
var addUnit = antmove_3_module.addUnit;
antmove_export = {
  bem: memoize(bem),
  memoize: memoize,
  addUnit: addUnit
};
export default antmove_export;