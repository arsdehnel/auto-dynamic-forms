/*global
ADF,
Backbone
*/
ADF.ActionsCollection = Backbone.Collection.extend({

    model: ADF.ActionModel,

    initialize: function( models, opts ){

        ADF.utils.message('debug','ActionsCollection initialized', opts);

    }

});