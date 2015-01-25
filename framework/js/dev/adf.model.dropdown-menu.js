ADF.DropdownMenuModel = Backbone.Model.extend({
    defaults: {
        buttonLabel: "Menu Name",
        footerOptions: []
    },
    initialize: function( data ){
        ADF.utils.message('log','DropdownMenuModel Initialized', data);
    }
});