ADF.HeadersView = Backbone.Marionette.CollectionView.extend({
    template: ADF.templates.gridRow,
    tagName: 'tr',
    childView: ADF.HeaderView,
    childViewOptions : function () {
        return { regionName: this.regionName };
    },
    initialize: function( options ) {
        // TODO: get the children to render inside this <tr>
        ADF.utils.message('log','HeadersView Initialized', options );
        this.regionName = options.regionName;
    }

});