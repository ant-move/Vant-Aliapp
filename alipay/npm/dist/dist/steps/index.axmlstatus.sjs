var antmove_export = {};

function get(index, active) {
  if (index < active) {
    return 'finish';
  } else if (index === active) {
    return 'process';
  }

  return 'inactive';
}

antmove_export = get;
export default antmove_export;