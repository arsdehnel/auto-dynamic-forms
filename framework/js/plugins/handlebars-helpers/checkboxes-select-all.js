/*global
Handlebars,
_
*/
Handlebars.registerHelper('checkboxesSelectAll', function(dataAttributes) {
    
    var selectAllOption = _.findWhere(dataAttributes,{name:'select-all-option'});

    // check that we found a data attribute and it's set to true
    if( selectAllOption && selectAllOption.value ){
        // TODO: convert this to an input helper template
        return new Handlebars.SafeString('<button class="adf-checkbox-select-all-toggle">Select All</button>');
    }

});