var antmove_export = {};

/**
 * Simple memoize
 * wxs doesn't support fn.apply, so this memoize only support up to 2 args
 */
function isPrimitive(value) {
  var type = typeof value;
  return type === 'boolean' || type === 'number' || type === 'string' || type === 'undefined' || value === null;
} // mock simple fn.call in wxs


function call(fn, args, len) {
  if (len === 2) {
    return fn(args[0], args[1]);
  }

  if (len === 1) {
    return fn(args[0]);
  }

  return fn();
}

function serializer(args, len) {
  if (len === 1 && isPrimitive(args[0])) {
    return args[0];
  }

  var length = 0;

  if (args[1] !== undefined) {
    length = 2;
  } else if (args[0] !== undefined) {
    length = 1;
  }

  var obj = {};

  for (var i = 0; i < len; i++) {
    obj['key' + i] = args[i];
  }

  return JSON.stringify(obj);
}

function memoize(fn) {
  var cache = {};
  return function () {
    var key = serializer(arguments, arguments.length);

    if (cache[key] === undefined) {
      cache[key] = call(fn, arguments, arguments.length);
    }

    return cache[key];
  };
}

antmove_export.memoize = memoize;
export default antmove_export;