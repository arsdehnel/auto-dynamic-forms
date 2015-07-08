/*global
ADF,
Handlebars,
_,
$
*/
Handlebars.registerHelper('fancySelectDisplayText', function(currentValue, data) {
    var dataObj = _.findWhere(data,{value:( currentValue ? currentValue.toString() : '')});
    if( dataObj ){
        return $.trim($(ADF.templates.inputHelperSelectFancyRecord(dataObj)).text());
    }else{
        return null;
    }
});