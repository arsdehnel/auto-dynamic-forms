/*global
Backbone,
Marionette,
Handlebars,
$
*/
Backbone.emulateHTTP = true;
// $.event.props.push('dataTransfer');
var ADF = ADF||{};

// Create namespaces for the views
ADF.Actions = {};
ADF.Core = {};
ADF.Forms = {};
ADF.Inputs = {};
ADF.Grids = {};
ADF.Messages = {};
ADF.Modules = {};

ADF.App = Marionette.Application.extend({
    initialize: function(options) {
        ADF.utils.message('log','App Initialized', options);
        if( ADF.utils.cookies.get('tsga-adf-debug') === 'true' ){
            this.debugEnabled = true;
        }else{
            this.debugEnabled = false;
        }
    },
    // TODO: get this working, currently having a problem that the template loads but after the initial page is rendered which is sorta useless
    importPageTemplates: function() {
        $('.adf-template').each(function(){
            var $tmplt = $(this);
            ADF.templates[ADF.utils.string.camelize($tmplt.attr('id'))] = Handlebars.compile($tmplt.html());
        });
    },
    keepSessionAlive: function() {
        var interval = 1000 * 60 * 10;    // 10 minutes
        var sessionKeeper = setInterval(function(){
            $.ajax({
                url: '../home.do',
                dataType: 'html',
                complete: function( jqXHR, textStatus ){
                    if( jqXHR.status !== 200 ){
                        ADF.utils.message('log','keepSessionAlive call failed',textStatus,jqXHR);
                        clearInterval(sessionKeeper);
                    }else{
                        ADF.utils.message('log','keepSessionAlive call completed',textStatus,jqXHR);
                    }
                }
            });
        },interval);
    }
});

var adf = new ADF.App({container: 'body'});
adf.on('before:start',function(options){
    $('.adf-template').each(function(){
        var $tmplt = $(this);
        ADF.templates[ADF.utils.string.camelize($tmplt.attr('id'))] = Handlebars.compile($tmplt.html());
    });
    adf.userPrefs = ( localStorage.getItem('userPreferences') ? JSON.parse(localStorage.getItem('userPreferences')) : {} );
});
adf.on('start', function(options){
    $.ajaxSetup({
        dataType: 'json'
    });
    adf.page = new ADF.PageLayoutView({el:'.adf-page'});
    adf.keepSessionAlive();
});

window.onerror = function( message, file, lineNumber ) {
        ADF.utils.message('error',message,file,lineNumber);
        return true;
};