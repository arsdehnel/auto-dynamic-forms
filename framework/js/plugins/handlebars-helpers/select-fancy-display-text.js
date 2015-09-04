/*global
ADF,
Handlebars,
_,
$
*/
Handlebars.registerHelper('selectFancyDisplayText', function(currentValue, data) {
    var dataObj = _.findWhere(data,{value:( currentValue ? currentValue.toString() : '')});
    if( dataObj ){
        return $.trim($(ADF.templates.inputHelpers.selectFancyRecord(dataObj)).text());
    }else{
        return null;
    }
});