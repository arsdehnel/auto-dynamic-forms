/*global
ADF,
Handlebars,
_
*/
Handlebars.registerHelper('selectFancyLink', function(value, label, tooltip, fieldNames) {
	var returnString = '';
	if( fieldNames ){
		_.each(label.split('|'),function(labelPiece){
			if( labelPiece.length > 0 ){
				returnString += '<td>'+labelPiece+'</td>';
			}
		});
	}else{
	    if( value === label ){
	        returnString += '<td colspan="2">'+value+'</td>';
	    }else{
	        returnString += '<td>'+value+'</td><td>'+label+'</td>';
	    }		
	}
    returnString += ADF.templates.inputHelpers.selectFancyTooltip({tooltip:tooltip});
    return new Handlebars.SafeString(returnString);
});