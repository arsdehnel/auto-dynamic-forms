/*global
ADF,
Backbone,
$,
adf
*/
ADF.FieldView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.formRow,
    events: {
        'change'                        : 'valueChange'
    },
    initialize: function( options ) {
        ADF.utils.message('log','FieldView Initialized', options);
        this.model.set('inputField',this.model.get('inputTemplate')(this.model.toJSON()));
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