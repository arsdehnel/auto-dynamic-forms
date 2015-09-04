/*global
ADF,
adf,
_
*/
ADF.Inputs.WidgetView = ADF.Core.InputView.extend({
    childEvents: {
        'click'                : 'showWidgetEditor'
    },
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ){
        ADF.utils.message('log','Inputs.WidgetView Initialized', options);
        this.model.set('gridCell',true);
        this._super(options);
    },
    onRender: function(){
        if( this.model.get('fieldPriority') !== 0  && this.$el.css('display') === 'table-cell' ){
            ADF.utils.message('log',this.model.get('fieldName'),'should be displayed as table cell');
        }
        this._super();
    },
    showWidgetEditor: function(e) {
        e.preventDefault();
        adf.page.getRegion('widgetEditor').show( this );
    }

});