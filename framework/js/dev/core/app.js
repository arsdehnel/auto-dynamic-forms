/*global
Backbone,
Marionette,
Handlebars,
$
*/
// TODO: svg rendering
Backbone.emulateHTTP = true;
$.event.props.push('dataTransfer');
var ADF = ADF||{};
ADF.App = Marionette.Application.extend({
  initialize: function(options) {
     ADF.utils.message('log','App Initialized', options);
  }
});

var adf = new ADF.App({container: 'body'});
adf.on('start', function(options){
    $.ajaxSetup({
        dataType: 'json',
        // contentType: 'application/json'
    });
    adf.page = new ADF.PageLayoutView({el:'.adf-page'});
    $('.adf-template').each(function(){
      var $tmplt = $(this);
      ADF.templates[ADF.utils.camelize($tmplt.attr('id'))] = Handlebars.compile($tmplt.html());
    });
});

window.onerror = function( message, file, lineNumber ) {
    ADF.utils.message('error',message,file,lineNumber);
    return true;
};