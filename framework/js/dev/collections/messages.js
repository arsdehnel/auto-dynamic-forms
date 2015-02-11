/*global
ADF,
Backbone
*/
ADF.MessagesCollection = Backbone.Collection.extend({

    model: ADF.MessageModel,

    initialize: function( models, opts ){

        ADF.utils.message('log','MessagesCollection initialized', opts);

    }

});