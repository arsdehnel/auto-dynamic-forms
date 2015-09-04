/*global
Handlebars
*/
Handlebars.registerHelper('selectFancyLink', function(value, label) {
    if( value === label ){
        return new Handlebars.SafeString('<a href="#">'+value+'</a>');
    }else{
        return new Handlebars.SafeString('<a href="#">'+value+': '+label+'</a>');
    }
});