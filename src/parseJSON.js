// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;


// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var firstAndLastChars = function (first, last) {
    return function(str) {
      return str[0] === first && str[str.length - 1] === last;
    }
  }

  var removeFirstAndLastChar = function (str) {
    str = str.trim();
    return str.slice(1, str.length - 1);
  }

  var splitByChar = function (divisor) {
    return function (str) {
      var result = [];
      var doubleQuotesOpen = false;
      var singleQuotesOpen = false;
      var arrayOpen = false;
      var objectOpen = false;
      var arrayBracketCount = 0;
      var objectBracketCount = 0;
      var currentString = '';
      for (var i = 0 ; i < str.length; i += 1) {
        if (str[i] === '"') {
          doubleQuotesOpen = !doubleQuotesOpen;
        } else if (str[i] === "'") {
          singleQuotesOpen = !singleQuotesOpen;
        } else if (str[i] === '[') {
          arrayBracketCount += 1;
          arrayOpen = true;
        } else if (str[i] === ']') {
          arrayBracketCount -= 1;
          if (arrayBracketCount === 0) {
            arrayOpen = false;
          }
        } else if (str[i] === '{') {
          objectBracketCount += 1;
          objectOpen = true;
        } else if (str[i] === '}') {
          objectBracketCount -= 1;
          if (objectBracketCount === 0) {
            objectOpen = false;
          }
        } else {
          null;
        }

        if (str[i] === divisor && !doubleQuotesOpen && !singleQuotesOpen && !arrayOpen && !objectOpen) {
          if (currentString !== '') {
            result.push(currentString.trim());
            currentString = '';
          }
        } else {
          currentString += str[i];
        }
      }
      if (currentString !== '') result.push(currentString.trim());
      return result;
    }
  }


  var parseString = function (str) {
    //helper functions give you the tools
    var isArray = firstAndLastChars('[', ']');
    var isObjectect = firstAndLastChars('{', '}');
    var hasDoubleQuotes = firstAndLastChars('"', '"');
    var hasSingleQuotes = firstAndLastChars("'", "'");
    var isNumber = function(str){
      return +str + '' === str;
    };
    var isString = function (str) {
      str = str.trim();
      return (hasSingleQuotes(str) || hasDoubleQuotes(str));
    };
    var separateStringByCommas = splitByChar(',');
    var separateStringByColons = splitByChar(':');


    //parseString function implements these
    str = str.trim();
    if (isArray(str)) {
      var arrayContent  = separateStringByCommas(removeFirstAndLastChar(str));
      var parsedArrayContent = [];
      var acceptable = 'true';
      for (var mj = 0 ; mj < arrayContent.length ; mj++){
        parsedArrayContent.push(parseString(arrayContent[mj]));
      }
      for (var r = 0 ; r < parsedArrayContent.length ; r++){
        (/[\\]+$/).test(parsedArrayContent[r]) ? acceptable = 'false' : null;
      }
      return acceptable === 'true' ? parsedArrayContent : undefined;
    }
    if (isObjectect(str)) {
      var obj = {};
      var arrayOfKeyValues = separateStringByCommas(removeFirstAndLastChar(str));
      for (var z = 0 ; z < arrayOfKeyValues.length; z++){
        var currKeyValuePair = separateStringByColons(arrayOfKeyValues[z]);
        if (currKeyValuePair.length === 2){
          obj[parseString(currKeyValuePair[0])] = parseString(currKeyValuePair[1]);
        }
      }
      return obj;
    }
    if (isString(str)) {
      return removeFirstAndLastChar(str).replace(/([\\]{1})([\\"]{1})/g, '$2');
    }
    if (isNumber(str)) return +str
    if (str === 'null') return null
    if (str === 'false') return false
    if (str === 'true') return true
    if (str === 'undefined') return undefined
  }
  return parseString(json)

};

//is it an object, an array, a member, a pair,
