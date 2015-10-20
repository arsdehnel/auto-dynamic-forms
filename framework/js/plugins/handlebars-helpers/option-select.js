/*global
Handlebars
*/
Handlebars.registerHelper('optionSelected', function(selectedAttr, value, currentValue) {
    var selectedProperty;
    if( selectedAttr === 'Y' ){
        selectedProperty = 'selected="selected"';
    }else{
        if( Array.isArray( currentValue ) ){
            selectedProperty = currentValue.indexOf( value ) ? 'selected="selected"' : '';
        }else{
            selectedProperty = value == currentValue ? 'selected="selected"' : '';
        }        
    }
  return new Handlebars.SafeString(selectedProperty);
});