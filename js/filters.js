//http://stackoverflow.com/questions/17289448/angularjs-to-output-plain-text-instead-of-html
// No html code
app.filter('htmlToPlain', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
)