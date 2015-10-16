/*global
ADF,
adf,
_
*/
// TODO: combine this and Forms.FieldsView (and maybe Core.RecordView) into one Core.InputsView
ADF.Grids.RowView = ADF.Core.RecordView.extend({
    template: ADF.templates.grids.row,
    tagName: 'tr',
    getChildView: function(model) {
        var viewClass;
        switch( model.get('type') ){
            case 'actions':
                viewClass = ADF.Inputs.GridActionsView;
                break;
            case 'selectFancy':
                viewClass = ADF.Inputs.SelectFancyView;
                break;
            case 'textarea':
                viewClass = ADF.Inputs.TextareaView;
                break;
            case 'widget':
                viewClass = ADF.Inputs.WidgetView;
                break;
            case 'gridOverlay':
                viewClass = ADF.Inputs.GridOverlayView;
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
            rowView: this,
            template: ADF.templates.grids.cell,
            tagName: 'td'
        };
    },
    initialize: function( options ) {
        ADF.utils.message('log','GridRowView Initialized', options);
        this.regionName = options.regionName;
        this.region = adf.page.getRegion(this.regionName);
        this.gridView = options.gridView;

        // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.Core.RecordView.prototype.events,this.events);
        this._super( options );
    },
    onRender: function(){
        var $cells = this.$el.children('td');
        this.setElement(this.$el.find('tr').unwrap().append($cells));
        this.gridView.updateRecordCounter();
        // ADF.utils.message('info','increment rendered row counter');
    }
});