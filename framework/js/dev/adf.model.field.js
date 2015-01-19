ADF.FieldModel = Backbone.Model.extend({

    initialize: function( data ){
        console.log('[ADF] FieldModel Initialized', data);
        this.set("inputField",ADF.templates['inputType'+ADF.utils.capitalize(ADF.utils.camelize(this.get('type')))](this.toJSON()));
    }

});