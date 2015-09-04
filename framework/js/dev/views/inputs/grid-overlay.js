/*global
ADF,
adf,
_
*/
ADF.Inputs.GridOverlayView = ADF.Core.InputView.extend({
    childEvents: {
        'click .adf-grid-overlay-value'           : 'showOverlayEditor'
    },
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ){
        ADF.utils.message('log','GridOverlayView Initialized', options);
        this._super();
    },
    onRender: function(){
        if( this.region instanceof ADF.GridRegion ){
            if( this.model.get('fieldPriority') !== 0  && this.$el.css('display') === 'table-cell' ){
                ADF.utils.message('log',this.model.get('fieldName'),'should be displayed as table cell');
            }
        }
        this._super();
    },
    showOverlayEditor: function(e) {
        e.preventDefault();
        adf.page.getRegion('overlayEditor').show( this );
    }

});