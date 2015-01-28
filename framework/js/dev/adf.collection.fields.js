ADF.FieldsCollection = Backbone.Collection.extend({

    model: ADF.FieldModel,

    initialize: function( models, options ){
        ADF.utils.message('log','FieldsCollection Initialized', models, options);

        var that = this;

    }

});