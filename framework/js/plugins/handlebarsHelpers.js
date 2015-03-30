/*global
Handlebars
*/
Handlebars.registerHelper('optionSelected', function(checkedAttr, value, currentValue) {
    var selectedProperty;
	if( Array.isArray( currentValue ) ){
		selectedProperty = currentValue.indexOf( value ) ? 'selected="selected"' : '';
	}else{
		selectedProperty = value == currentValue >= 0 ? 'selected="selected"' : '';
	}
  return new Handlebars.SafeString(selectedProperty);
});

Handlebars.registerHelper('optionChecked', function(checkedAttr, value, currentValue) {
    var checkedProperty;
    if( Array.isArray( currentValue ) ){
        checkedProperty = currentValue.indexOf( value ) >= 0 ? 'checked="checked"' : '';
    }else{
        checkedProperty = value == currentValue ? 'checked="checked"' : '';
    }
  return new Handlebars.SafeString(checkedProperty);
});

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});