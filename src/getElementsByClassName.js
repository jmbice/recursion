// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node) {
  node = node || document.body;
  var results = [];
  var regEx = new RegExp("(^|\\s)" + className + "(\\s|$)");

  if (regEx.test(node.className)){
    results.push(node);
  }

  for (var i = 0; i < node.children.length; i++) {
    var childResults = getElementsByClassName(className, node.children[i]);
    results = results.concat(childResults);
  }

  return results;
};

//We were encouraged to use, 'element.classList', 'element.childNodes', 'document.body'. This is what these terms look like:
// console.log(document.body); // logs all the body
// console.log(document.body.childNodes); // logs array of all nodes, including text nodes without elements
// console.log(document.body.children); // logs array of elements nodes.
//console.log(document.body.classList); //logs array of all assigned class names as string;
