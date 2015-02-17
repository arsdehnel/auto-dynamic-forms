/*global
ADF,
Backbone,
$,
adf,
_
*/
ADF.FieldView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.formRow,
    events: {
        'change'                        : 'valueChange'
    },
    initialize: function( options ) {
        ADF.utils.message('log','FieldView Initialized', options);
        if( !_.isUndefined( this.model.get('inputTemplate') ) ){
            this.model.set('inputField',this.model.get('inputTemplate')(this.model.toJSON()));
        }else{
            ADF.utils.message('error','Attempting to assign inputField attribute to undefined template',this.model);
        }
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    renderAsChild: function(){
        return this.template(this.model.toJSON());
    },
    valueChange: function(e) {
        // console.log('input change',e,$(e.target).val(),$(e.currentTarget).val());
        this.model.set('currentValue',$(e.target).val());
    },
    showOverlayEditor: function(e) {
        e.preventDefault();
        adf.page.getRegion('overlayEditor').show( $(e.target) );
    }
});