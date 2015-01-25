ADF.HeadersView = Backbone.Marionette.CollectionView.extend({
    template: ADF.templates.gridRow,
    tagName: 'tr',
    childView: ADF.HeaderView,
    initialize: function( options ) {
        ADF.utils.message('log','HeadersView Initialized', options );
        this.collection.regionName = options.gridView.options.region.options.regionName;
    }

});