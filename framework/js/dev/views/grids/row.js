/*global
ADF,
adf,
_
*/
// combine this and Forms.FieldsView (and maybe Core.RecordView) into one Core.InputsView
ADF.Grids.RowView = ADF.Core.RecordView.extend({
    template: ADF.templates.gridRow,
    tagName: 'tr',
    getChildView: function(model) {
        var viewClass;
        switch( model.get('type').toLowerCase() ){
            case 'textarea':
                viewClass = ADF.Inputs.TextareaView;
                break;
            case 'select-fancy':
                viewClass = ADF.Inputs.SelectFancyView;
                break;
            default:
                viewClass = ADF.Inputs.GridDefaultView;
                break;
        }
        return viewClass;
    },
    childViewOptions : function () {
        return {
            regionName: this.regionName,
            region: this.region,
            template: ADF.templates.gridCell,
            tagName: 'td'
        };
    },
    initialize: function( options ) {
        ADF.utils.message('log','GridRowView Initialized', options);
        this.regionName = options.regionName;
        this.region = adf.page.getRegion(this.regionName);

        // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.Core.RecordView.prototype.events,this.events);
        this._super( options );
    },
    onRender: function(){
        var $cells = this.$el.children('td');
        this.setElement(this.$el.find('tr').unwrap().append($cells));
    }
});