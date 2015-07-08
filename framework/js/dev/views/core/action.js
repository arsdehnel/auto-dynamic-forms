/*global
ADF,
Backbone
*/
ADF.Core.ActionView = Backbone.Marionette.ItemView.extend({

    template: ADF.templates.action,
    initialize: function( options ){
        ADF.utils.message('log','Core.ActionView initialized', options );
    }

});