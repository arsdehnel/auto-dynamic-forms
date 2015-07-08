/*global
Handlebars,
_
*/
Handlebars.registerHelper('dataAttributeBoolean', function(dataAttributes, attributeName, attributeValue, returnString) {
    if( attributeValue ){
        return _.size(_.where(dataAttributes,{name:attributeName,value:attributeValue})) > 0 ? returnString : '';
    }else{
        return _.size(_.where(dataAttributes,{name:attributeName})) > 0 ? returnString : '';
    }
});