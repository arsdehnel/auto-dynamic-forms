/*global
ADF,
Backbone,
$
*/
ADF.Core.ActionsView = Backbone.Marionette.CollectionView.extend({
    tagName: 'a',
    childView: ADF.Core.ActionView,
    childViewOptions : function () {
        return { regionName: this.options.regionName };
    },    
    initialize: function( options ) {
        ADF.utils.message('log','Core.ActionsView Initialized', options );
        $.extend(this.options,options);
        this.listenTo(this.collection,'reset',this.render);
    }

});