/*global
ADF,
Backbone
*/
ADF.Grids.HeadersView = Backbone.Marionette.CollectionView.extend({
    template: ADF.templates.gridRow,
    tagName: 'tr',
    childView: ADF.Grids.HeaderView,
    childViewOptions : function () {
        return { regionName: this.regionName };
    },
    initialize: function( options ) {
        ADF.utils.message('log','HeadersView Initialized', options );
        this.regionName = options.regionName;
        this.model = new Backbone.Model({initialRenderCompleted:false});
    },
    onRender: function(){
        // if( !this.model.get('initialRenderCompleted') ){
        //     var $cells = this.$el.children('th').detach();
        //     this.setElement(this.$el.find('tr').append($cells));
        //     this.children.each(function(child){
        //         child.resizeInit();
        //     });
        //     this.model.set('initialRenderCompleted',true);
        // }
    }
});