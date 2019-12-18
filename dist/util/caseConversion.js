"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
// String conversion methods
const separateWords = (string, options) => {
    options = options || {};
    const separator = options.separator || '_';
    const split = options.split || /(?=[A-Z])/;
    return string.split(split).join(separator);
};
const processKeys = (convert, obj, options) => {
    if (!lodash_1.isObject(obj) || lodash_1.isDate(obj) || lodash_1.isRegExp(obj) || lodash_1.isBoolean(obj) || lodash_1.isFunction(obj)) {
        return obj;
    }
    let output;
    let i = 0;
    let l = 0;
    if (lodash_1.isArray(obj)) {
        output = [];
        for (l = obj.length; i < l; i++) {
            output.push(processKeys(convert, obj[i], options));
        }
    }
    else {
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
function isNumerical(obj) {
    obj = obj - 0;
    return obj === obj;
}
exports.isNumerical = isNumerical;
function camelize(string) {
    if (isNumerical(string)) {
        return string;
    }
    string = string.replace(/[\-_\s]+(.)?/g, (match, chr) => {
        return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
}
exports.camelize = camelize;
function pascalize(string) {
    const camelized = camelize(string);
    // Ensure 1st char is always uppercase
    return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
}
exports.pascalize = pascalize;
function decamelize(string, options) {
    return separateWords(string, options).toLowerCase();
}
exports.decamelize = decamelize;
function camelizeKeys(object, options) {
    return processKeys(processor(camelize, options), object);
}
exports.camelizeKeys = camelizeKeys;
function decamelizeKeys(object, options) {
    return processKeys(processor(decamelize, options), object, options);
}
exports.decamelizeKeys = decamelizeKeys;
//# sourceMappingURL=caseConversion.js.map