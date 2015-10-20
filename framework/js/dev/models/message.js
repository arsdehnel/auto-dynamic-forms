/*global
ADF,
Backbone
*/
ADF.MessageModel = Backbone.Model.extend({

    initialize: function( attrs, opts ){

        this.set('id',ADF.utils.randomId());

        ADF.utils.message('log','MessageModel initialized', opts);

    }

});