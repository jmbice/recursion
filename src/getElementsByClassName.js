// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var results = []; // MDN documents:  Returns an array-like object of all child elements which have all of the given class names. When called on the document object, the complete document is searched, including the root node.
  var root = [document.body];
  var regEx = new RegExp("(^|\\s)" + className + "(\\s|$)");

  var accessElements = function(input) {
    for (var j = 0; j < input.length; j++) {
      if (regEx.test(input[j].className)) {
        results.push(input[j]);
      } else {
        null;
      }
      accessElements(input[j].children);
    }
  }
  accessElements(root)

  return results;

};

//We were encouraged to use, 'element.classList', 'element.childNodes', 'document.body'. This is what these terms look like:
// console.log(document.body); // logs all the body
// console.log(document.body.childNodes); // logs array of all nodes, including text nodes without elements
// console.log(document.body.children); // logs array of elements nodes.
//console.log(document.body.classList); //logs array of all assigned class names as string;
