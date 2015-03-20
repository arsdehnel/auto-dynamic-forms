/*global
ADF,
Backbone,
_
*/
ADF.RecordsCollection = Backbone.Collection.extend({

    model: ADF.RecordModel,

    sortDirection: 1,

    initialize: function( models, options ){
        ADF.utils.message('log','RecordsCollection Initialized', models, options);
    },

    sortRecords: function (columnName) {
        this.sortAttribute = columnName;
        console.warn(this.sortAttribute);
        this.sort();
    },

    comparator: function(a, b) {

        var a = a.get(this.sortAttribute),
            b = b.get(this.sortAttribute);

        if (a == b) return 0;

        if( _.isUndefined( a ) ){
            return -1;
        } else if( _.isUndefined( b ) ){
            return 1;
        } else if(this.sortDirection == 1) {
            return a > b ? 1 : -1;
        } else {
            return a < b ? 1 : -1;
        }

    }

});