/*global
Handlebars
*/
Handlebars.registerHelper('numberInputMinMaxBuilder', function(stringLength, fillString) {
    var retString = '';
    for( var i = 0; i < stringLength; i++ ){
        retString += fillString;
    }
    return retString;
});