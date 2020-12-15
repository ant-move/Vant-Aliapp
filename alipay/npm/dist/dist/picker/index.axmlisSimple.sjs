var antmove_export = {};

function isSimple(columns) {
  return columns.length && !columns[0].values;
}

antmove_export = isSimple;
export default antmove_export;