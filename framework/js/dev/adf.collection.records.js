ADF.RecordsCollection = Backbone.Collection.extend({

    model: ADF.RecordModel,

    initialize: function( models, options ){

        var recordsCollection = this;

        recordsCollection.regionName = options.regionName;

    }

});