/*global
Handlebars,
_
*/
Handlebars.registerHelper('overlaySummary', function(inputData, dataAttributes) {
    // TODO: convert this to use input helper templates
    if( _.indexOf(inputData,'|') >= 0 ){
        if( dataAttributes.formatStyle ){
            switch( dataAttributes.formatStyle ){
                case 'tilde-delimited-columns':
                    return _.each(inputData.split('|'),function(record){
                        return '<tr><td>' + record.split('~').join('</td><td>') + '</td></tr>';
                    });
                default:
                    return inputData.split('|').join(', ');
            }
        }else{
            return inputData.split('|').length + ' records<div class="overlay-details-hover">' + inputData.split('|').join('<br>') + '</div>';
        }
    }else if( inputData ){
        return inputData;
    }else{
        return 'Click for details';
    }
});