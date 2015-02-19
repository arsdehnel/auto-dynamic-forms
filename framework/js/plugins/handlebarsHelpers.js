/*global
Handlebars
*/
Handlebars.registerHelper('optionSelected', function(value, currentValue) {
    var selectedProperty;
	if( Array.isArray( currentValue ) ){
		selectedProperty = currentValue.indexOf( value ) ? 'selected="selected"' : '';
	}else{
		selectedProperty = value == currentValue ? 'selected="selected"' : '';
	}
  return new Handlebars.SafeString(selectedProperty);
});

Handlebars.registerHelper('optionChecked', function(value, currentValue) {
    var checkedProperty;
    if( Array.isArray( currentValue ) ){
        checkedProperty = currentValue.indexOf( value ) ? 'checked="checked"' : '';
    }else{
        checkedProperty = value == currentValue ? 'checked="checked"' : '';
    }
  return new Handlebars.SafeString(checkedProperty);
});

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});