/*global
ADF,
Backbone
*/
ADF.ColumnSelectItemView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.dropdownSelectItem,
    tagName: 'li',
    initialize: function( options ){
        ADF.utils.message('log','ColumnSelectItemView Initialized', options);
        // this.model.set('regionName',options.regionName);
    }
});