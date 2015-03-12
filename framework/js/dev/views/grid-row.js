/*global
ADF
*/
ADF.GridRowView = ADF.RecordView.extend({
    template: ADF.templates.gridRow,
    tagName: 'tr',
    childView: ADF.CellView,
    childViewClass: ADF.CellView,
    events: {
        'click .adf-grid-overlay-value' : 'showOverlayEditor'
    },
    initialize: function( options ) {
        ADF.utils.message('debug','GridRowView Initialized', options);

        // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.RecordView.prototype.events,this.events);

        this._super( options );

    }
})