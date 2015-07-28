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

        if( this.sortAttribute === columnName ){
            // multiply times -1 rather than just set to -1 so that if we keep clicking
            // on the same field we alternate between the two directions
            this.sortDirection *= -1;
        }else{
            this.sortAttribute = columnName;
            this.sortDirection = 1;
        }
        this.sort();

        // return this so the header that called it can get the right class
        return ( this.sortDirection === 1 ? 'asc' : 'desc' );
    },

    comparator: function(a, b) {

        var a = a.get(this.sortAttribute),
            b = b.get(this.sortAttribute);

        if (a == b) return 0;

        if( _.isUndefined( a ) ){
            return -1;
        } else if( _.isUndefined( b ) ){
            return 1;
        } else if(this.sortDirection === 1) {
            return a > b ? 1 : -1;
        } else {
            return a < b ? 1 : -1;
        }

    }

});