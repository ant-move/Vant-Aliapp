function get(index, active) {
  if (index < active) {
    return 'finish';
  } else if (index === active) {
    return 'process';
  }

  return '';
}

export default get;