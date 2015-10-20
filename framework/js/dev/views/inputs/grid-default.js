/*global
ADF,
_
*/
ADF.Inputs.GridDefaultView = ADF.Core.InputView.extend({
    template: ADF.templates.grids.cell,
    tagName: 'td',
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ){
        ADF.utils.message('log','CellView Initialized', options);
        this.model.set('gridCell',true);
        // this.model.set('inputField',this.model.get('inputTemplate')(this.model.toJSON()));
        this._super();
    },
    onRender: function(){
        if( this.model.get('fieldPriority') !== 0  && this.$el.css('display') === 'table-cell' ){
            ADF.utils.message('log',this.model.get('fieldName'),'should be displayed as table cell');
        }
        this._super();
    }

});