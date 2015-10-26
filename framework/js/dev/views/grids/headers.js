/*global
ADF,
Backbone
*/
ADF.Grids.HeadersView = Backbone.Marionette.CollectionView.extend({
    template: ADF.templates.grids.row,
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
            this.setElement(this.$el.find('tr').append($cells));
            this._updateColSelect();
            this.model.set('initialRenderCompleted',true);
        }
    },
    clearSortClass: function( colName ){
        this.$el.find('.sort-indicator').removeClass('.sort-asc .sort-desc');
    },
    _updateColSelect: function() {
        var headersView = this;
        var checkedInd;

        this.children.each(function(child){
            if( child.$el.css('display') === 'table-cell' ){
                checkedInd = 'Y';
            }else{
                checkedInd = 'N';
            }
            headersView.gridView.columnSelect.collection.findWhere({name:child.model.get('name')}).set({
                'checkedInd':checkedInd,
                'colSelectDispOverride': checkedInd
            });            
        });   
    }
});