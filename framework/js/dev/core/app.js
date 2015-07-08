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

// Create namespaces for the views
ADF.Core = {};
ADF.Forms = {};
ADF.Grids = {};
ADF.Messages = {};
ADF.Modules = {};

ADF.App = Marionette.Application.extend({
  initialize: function(options) {
     ADF.utils.message('log','App Initialized', options);
  },
  importPageTemplates: function() {
    $('.adf-template').each(function(){
      var $tmplt = $(this);
      ADF.templates[ADF.utils.camelize($tmplt.attr('id'))] = Handlebars.compile($tmplt.html());
    });
  },
  keepSessionAlive: function() {
    var interval = 1000 * 60 * 10;    // 10 minutes
    setInterval(function(){
      $.ajax({
        url: '../home.do',
        dataType: 'html',
        complete: function( jqXHR, textStatus ){
          ADF.utils.message('log','keepSessionAlive call completed',textStatus,jqXHR);
        }
      });
    },interval);
  }
});

var adf = new ADF.App({container: 'body'});
adf.on('before:start',function(options){
    $('.adf-template').each(function(){
      var $tmplt = $(this);
      ADF.templates[ADF.utils.camelize($tmplt.attr('id'))] = Handlebars.compile($tmplt.html());
    });
});
adf.on('start', function(options){
    $.ajaxSetup({
        dataType: 'json',
        // contentType: 'application/json'
    });
    adf.page = new ADF.PageLayoutView({el:'.adf-page'});
    adf.keepSessionAlive();
});

window.onerror = function( message, file, lineNumber ) {
    ADF.utils.message('error',message,file,lineNumber);
    return true;
};