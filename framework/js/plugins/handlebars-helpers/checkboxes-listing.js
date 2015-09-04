/*global
ADF,
Handlebars,
_
*/
Handlebars.registerHelper('checkboxesListing', function(data, dataAttributes) {

    var firstData = data[0];
    var returnString = '';
    var groups = {};

    var selectAllStr = Handlebars.helpers.checkboxesSelectAll(dataAttributes);

    if( firstData && firstData.groupLabel ){
        var groups = _.groupBy(data, function(dataItem){ 
            return dataItem.groupLabel; 
        });
        _.each(groups,function(groupItems,groupLabel){
            returnString += ADF.templates.inputHelpers.checkboxListingGroupHeader({groupLabel:groupLabel,selectAllStr:selectAllStr});
            _.each(groupItems,function(groupItem){
                returnString += ADF.templates.inputHelpers.checkboxListingItem(groupItem);
            });
            returnString += ADF.templates.inputHelpers.checkboxListingGroupFooter();
        });
    }else{
        _.each(data,function(dataItem){
            returnString += ADF.templates.inputHelpers.checkboxListingItem(dataItem);
        });
    }
    return new Handlebars.SafeString(returnString);

});