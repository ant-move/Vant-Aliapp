var antmove_export = {};
import antmove_1_module from './utils.sjs';

/* eslint-disable */
var utils = antmove_1_module;

function getMonths(minDate, maxDate) {
  var months = [];
  var cursor = getDate(minDate);
  cursor.setDate(1);

  do {
    months.push(cursor.getTime());
    cursor.setMonth(cursor.getMonth() + 1);
  } while (utils.compareMonth(cursor, getDate(maxDate)) !== 1);

  return months;
}

function getButtonDisabled(type, currentDate) {
  if (currentDate == null) {
    return true;
  }

  if (type === 'range') {
    return !currentDate[0] || !currentDate[1];
  }

  if (type === 'multiple') {
    return !currentDate.length;
  }

  return !currentDate;
}

antmove_export = {
  getMonths: getMonths,
  getButtonDisabled: getButtonDisabled
};
export default antmove_export;