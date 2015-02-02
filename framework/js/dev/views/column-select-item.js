ADF.ColumnSelectItemView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.dropdownSelectItem,
    tagName: 'li',
    initialize: function( options ){
        ADF.utils.message('log','ColumnSelectItemView Initialized', options);
        // this.model.set('regionName',options.regionName);
    },
    renderOld: function() {
        // TODO: make this use a proper and complete HBS file rather than this weird innerHTML stuff
        this._super();
    }
});