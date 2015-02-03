/*global
ADF,
Backbone
*/
ADF.ActionModel = Backbone.Model.extend({

    initialize: function( attrs, opts ){

        this.set('id',ADF.utils.randomId());

        ADF.utils.message('log','ActionModel initialized', opts);

    }

});