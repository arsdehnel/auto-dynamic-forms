/*global
ADF,
Backbone,
adf,
$
*/
ADF.Core.ActionView = Backbone.Marionette.ItemView.extend({

    template: ADF.templates.action,
    events: {
        'click'                                 : 'handleClick'
    },    
    initialize: function( options ){
        ADF.utils.message('log','Core.ActionView initialized', options );
    },
    onRender: function(){
        this.setElement(this.$el.children().unwrap());
    },
    handleClick: function(e) {
        switch( this.model.get('type') ){
            case 'link':
                break;
            case 'submit':
                e.preventDefault();
                adf.page.getRegion(this.options.regionName).formView.submitForm(e, this);
                break;
            case 'submitCustomUrl':
                e.preventDefault();
                var $triggerObj = $(e.target).closest('.btn');
                $triggerObj.closest('form').attr('action',$triggerObj.attr('href')).submit();
                break;
            default:
                ADF.utils.message('error','Unexpected action type ('+this.model.get('type')+')');
                break;
        }
    }

});