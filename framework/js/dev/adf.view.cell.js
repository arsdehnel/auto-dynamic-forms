ADF.CellView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.gridCell,
    tagName: 'td',
    initialize: function( options ){
        console.log('[ADF] CellView Initialized', options);
        // this.setElement(this.template(this.model.toJSON()));
        // <td data-column-select-priority="{{fieldPriority}}" data-header-id="{{name}}" class="{{wrapClass}}">
    },
    render: function() {
        this.$el
            .attr('data-column-select-priority',this.model.get('fieldPriority'))
            .attr('data-header-id',this.model.get('name'))
            .addClass(this.model.get('wrapClass'));
        this._super();
    }
});