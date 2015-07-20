/*global
ADF,
Backbone,
adf,
$
*/
ADF.Core.ActionView = Backbone.Marionette.ItemView.extend({

    template: ADF.templates.action,
    events: {
        // button handlers
        'click .btn-submit'                                                 : 'submitParentForm',
        'click .btn-query'                                                  : 'submitParentForm',
        'click .btn-submit-custom-url'                                      : 'submitCustomUrl',        
    },    
    initialize: function( options ){
        ADF.utils.message('log','Core.ActionView initialized', options );
    },
    submitParentForm: function( e ) {
        e.preventDefault();
        adf.page.getRegion(this.options.regionName).formView.submitForm(e, this);
    },

    submitCustomUrl: function( e ) {
        e.preventDefault();
        var $triggerObj = $(e.target).closest('.btn');
        $triggerObj.closest('form').attr('action',$triggerObj.attr('href')).submit();
    }        

});