/*global
Handlebars,
_
*/
Handlebars.registerHelper('checkboxesSelectAll', function(dataAttributes, dataAttrValue, locationCode) {
    
    var selectAllOption = _.findWhere(dataAttributes,{name:'select-all-option'});

    // check that we found a data attribute and it's set to true
    if( selectAllOption && selectAllOption.value ){
        return new Handlebars.SafeString('<button class="adf-checkbox-select-all-toggle">Select All</button>');
    }

});