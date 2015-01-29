ADF.FieldView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.formRow,
    initialize: function( options ){
        ADF.utils.message('log','FieldView Initialized', options);
        this.model.set('inputField',this.model.get('inputTemplate')(this.model.toJSON()));
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});