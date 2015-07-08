/*global
ADF,
Backbone,
$
*/
ADF.Core.ActionsView = Backbone.Marionette.CollectionView.extend({
    tagName: 'a',
    childView: ADF.Core.ActionView,
    events: {
        // button handlers
        'click .btn-submit'                                                 : 'submitParentForm',
        'click .btn-query'                                                  : 'submitParentForm',
        'click .btn-submit-custom-url'                                      : 'submitCustomUrl',        
    },
    initialize: function( options ) {
        ADF.utils.message('log','Core.ActionsView Initialized', options );
        $.extend(this.options,options);
        this.listenTo(this.collection,'reset',this.render);
    },

    submitParentForm: function( e ) {
        e.preventDefault();
        this.options.parentView.submitForm();
    },

    submitCustomUrl: function( e ) {
        e.preventDefault();
        var $triggerObj = $(e.target).closest('.btn');
        $triggerObj.closest('form').attr('action',$triggerObj.attr('href')).submit();
    }

});