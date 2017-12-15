/**
 * Split a delimited component property string (e.g., `material.color`) to an object
 * containing `component` name and `property` name. If there is no delimiter, just return the
 * string back.
 *
 * Cache arrays from splitting strings via delimiter to save on memory.
 *
 * @param {string} str - e.g., `material.opacity`.
 * @param {string} delimiter - e.g., `.`.
 * @returns {array} e.g., `['material', 'opacity']`.
 */
var propertyPathCache = {};
function getComponentPropertyPath (str, delimiter) {
  if (!propertyPathCache[delimiter]) { propertyPathCache[delimiter] = {}; }
  propertyPathCache[delimiter][str] = str.split(delimiter);
  return propertyPathCache[delimiter][str];
}
module.exports.getComponentPropertyPath = getComponentPropertyPath;
module.exports.propertyPathCache = propertyPathCache;

/**
 * Get component property using encoded component name + component property name with a
 * delimiter.
 */
module.exports.getComponentProperty = function (el, name, delimiter) {
  var splitName;
  delimiter = delimiter || '.';
  if (name.indexOf(delimiter) !== -1) {
    splitName = getComponentPropertyPath(name, delimiter);
    return el.getAttribute(splitName[0])[splitName[1]];
  }
  return el.getAttribute(name);
};

/**
 * Set component property using encoded component name + component property name with a
 * delimiter.
 */
module.exports.setComponentProperty = function (el, name, value, delimiter) {
  var splitName;
  delimiter = delimiter || '.';
  if (name.indexOf(delimiter) !== -1) {
    splitName = getComponentPropertyPath(name, delimiter);
    el.setAttribute(splitName[0], splitName[1], value);
    return;
  }
  el.setAttribute(name, value);
};
