//http://stackoverflow.com/questions/17289448/angularjs-to-output-plain-text-instead-of-html
// No html code
app.filter('htmlToPlain', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
)

.filter('search', function () {
  return function (input, key) {
  	// No key, return quickly
  	if (!key) {
       return input;
    }

    var found = [];
   
    angular.forEach(input, function (line) {
    	var reg = new RegExp(key, "i");
    	console.log("Here");
     	if (line.source.search(reg) != -1 ||
     		line.username.search(reg) != -1 ||
     		(line.text!==undefined && line.text.search(reg) != -1)) {
        	found.push(line);
      	} 
    });

    // Combined list
    return found;
  };
});