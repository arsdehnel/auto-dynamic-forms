/*global
ADF
*/
// ADF.Grids.CellView = Backbone.Marionette.ItemView.extend({
ADF.Grids.CellView = ADF.Core.FieldView.extend({
    template: ADF.templates.gridCell,
    tagName: 'td',
    initialize: function( options ){
        ADF.utils.message('log','CellView Initialized', options);
        
        this.model.set('gridCell',true);
        this.model.set('inputField',this.model.get('inputTemplate')(this.model.toJSON()));
    },
    onRender: function(){
        this.setElement(this.$el.find('td').unwrap());
        if( this.model.get('fieldPriority') !== 0  && this.$el.css('display') === 'table-cell' ){
            ADF.utils.message('log',this.model.get('fieldName'),'should be displayed as table cell');
        }
    }

});