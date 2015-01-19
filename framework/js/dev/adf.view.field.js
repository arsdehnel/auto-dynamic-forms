ADF.FieldView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.formRow,
    initialize: function( options ){
        var fieldView = this;
        console.log('[ADF] FieldView Initialized', options);
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
    }
});