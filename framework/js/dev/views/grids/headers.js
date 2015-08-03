/*global
ADF,
Backbone
*/
ADF.Grids.HeadersView = Backbone.Marionette.CollectionView.extend({
    template: ADF.templates.gridRow,
    tagName: 'tr',
    childView: ADF.Grids.HeaderView,
    childViewOptions : function () {
        return {
            regionName: this.regionName,
            gridView: this.gridView
        };
    },
    initialize: function( options ) {
        ADF.utils.message('log','HeadersView Initialized', options );
        this.gridView = options.gridView;
        this.regionName = options.regionName;
        this.model = new Backbone.Model({initialRenderCompleted:false});
    },
    onRender: function(){
        if( !this.model.get('initialRenderCompleted') ){
            var $cells = this.$el.children('th').detach();
            var cellTtlWidth = 0;
            this.setElement(this.$el.find('tr').append($cells));
            this.children.each(function(child){
                child.resizeInit();
                if( child.$el.is(':visible') ){
                    cellTtlWidth += parseInt( child.width );
                }
            });
            this.$el.closest('.adf-grid').css('width',cellTtlWidth);
            this.model.set('initialRenderCompleted',true);
        }
    },
    clearSortClass: function( colName ){
        this.$el.find('.sort-indicator').removeClass('.sort-asc .sort-desc');
    }
});