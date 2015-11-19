/*global
ADF,
Handlebars
*/
Handlebars.registerHelper('dataAttributeWrite', function(dataAttrName, dataAttrValue, locationCode) {

    // the default
    var configLocation = 'wrapper';

    if( ADF.config.get('dataAttributes')[dataAttrName] && ADF.config.get('dataAttributes')[dataAttrName].location ){
        configLocation = ADF.config.get('dataAttributes')[dataAttrName].location;
    }

    if( configLocation === locationCode ){
        return new Handlebars.SafeString(' data-'+dataAttrName+'="'+dataAttrValue+'"');
    }else{
        return '';
    }
});