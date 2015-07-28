/*global
ADF,
Backbone
*/
ADF.DropdownMenuModel = Backbone.Model.extend({
    defaults: {
        footerOptions: []
    },
    initialize: function( data ){
        ADF.utils.message('log','DropdownMenuModel Initialized', data);
    }
});