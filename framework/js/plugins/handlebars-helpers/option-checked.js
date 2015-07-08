/*global
Handlebars,
_
*/
Handlebars.registerHelper('optionChecked', function(checkedAttr, value, currentValue) {
    var checkedProperty;
    if( checkedAttr === true || checkedAttr === 'Y' ){
        checkedProperty = 'checked="checked"';
    }else{
        if( Array.isArray( currentValue ) ){
            checkedProperty = currentValue.indexOf( value ) >= 0 ? 'checked="checked"' : '';
        }else if( _.isUndefined( currentValue ) || _.isNull( currentValue ) ){
            checkedProperty = '';
        }else{
            checkedProperty = value == currentValue ? 'checked="checked"' : '';
        }
    }
  return new Handlebars.SafeString(checkedProperty);
});