// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var result;

  if (typeof obj === 'object' && obj !== null) {
    //non-empty arrays and objects
    if (Array.isArray(obj)){
      //for arrays specifically
      result = '[';
      for (var j = 0; j < obj.length; j++) {
        result += stringifyJSON(obj[j]);
        j < obj.length-1 ? result += ',' : null;
      }
      result += ']';
    } else {
      //for objects speficially
      result = '{';
      var count = 0;
      for (var key in obj) {
        if (obj[key] === undefined) {
          null;
        } else if (typeof obj[key] === 'function') {
          null;
        } else {
          result += '"' + key + '":' + stringifyJSON(obj[key]);
          Object.keys(obj).length-1 !== count ? result += ',' : null;
          count++;
        }
      }
        result += '}';
    }
  } else if (typeof obj === 'string') {
    result = '"' + obj + '"';
  } else {
    result = '' + obj + '';
  }
  return result;
};
