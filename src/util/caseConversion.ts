import { isObject, isArray, isDate, isRegExp, isBoolean, isFunction } from 'lodash';

// String conversion methods
const separateWords = (string, options) => {
  options = options || {};
  const separator = options.separator || '_';
  const split = options.split || /(?=[A-Z])/;

  return string.split(split).join(separator);
};

const processKeys = (convert, obj, options?) => {
  if (!isObject(obj) || isDate(obj) || isRegExp(obj) || isBoolean(obj) || isFunction(obj)) {
    return obj;
  }

  let output;
  let i = 0;
  let l = 0;

  if (isArray(obj)) {
    output = [];
    for (l = obj.length; i < l; i++) {
      output.push(processKeys(convert, obj[i], options));
    }
  } else {
    output = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        output[convert(key, options)] = processKeys(convert, obj[key], options);
      }
    }
  }
  return output;
};

// Sets up function which handles processing keys
// allowing the convert function to be modified by a callback
const processor = (convert, options) => {
  const callback = options && 'process' in options ? options.process : options;

  if (typeof callback !== 'function') {
    return convert;
  }

  return (string, options) => {
    return callback(string, convert, options);
  };
};

export function isNumerical(obj) {
  obj = obj - 0;
  return obj === obj;
}

export function camelize(string: string) {
  if (isNumerical(string)) {
    return string;
  }
  string = string.replace(/[\-_\s]+(.)?/g, (match, chr) => {
    return chr ? chr.toUpperCase() : '';
  });
  // Ensure 1st char is always lowercase
  return string.substr(0, 1).toLowerCase() + string.substr(1);
}

export function pascalize(string: string) {
  const camelized = camelize(string);
  // Ensure 1st char is always uppercase
  return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
}

export function decamelize(string: string, options?: object) {
  return separateWords(string, options).toLowerCase();
}

export function camelizeKeys(object: any, options?: object) {
  return processKeys(processor(camelize, options), object);
}

export function decamelizeKeys(object: any, options?: object) {
  return processKeys(processor(decamelize, options), object, options);
}
