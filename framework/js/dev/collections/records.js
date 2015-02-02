ADF.RecordsCollection = Backbone.Collection.extend({

    model: ADF.RecordModel,

    initialize: function( models, options ){
        ADF.utils.message('log','RecordsCollection Initialized', models, options);

        var recordsCollection = this;

        // recordsCollection.regionName = options.regionName;

    }

});