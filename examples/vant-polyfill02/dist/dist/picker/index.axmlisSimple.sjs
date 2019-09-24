function isSimple(columns) {
  return columns.length && !columns[0].values;
}

export default isSimple;