/*global
Marionette,
$
*/
// TODO: svg rendering
var ADF = ADF||{};
ADF.App = Marionette.Application.extend({
  initialize: function(options) {
     ADF.utils.message('log','App Initialized', options);
  }
});

var adf = new ADF.App({container: 'body'});
adf.on('start', function(options){
    $.ajaxSetup({
        dataType: 'json'
    });
    adf.page = new ADF.PageLayoutView({el:'.adf-page'});
});

window.onerror = function( message, file, lineNumber ) {
    ADF.utils.message('error',message,file,lineNumber);
    return true;
};