ADF.CellView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.gridCell,
    tagName: 'td',
    initialize: function( options ){
        ADF.utils.message('log','CellView Initialized', options);
        this.model.set('inputField',this.model.get('inputTemplate')(this.model.toJSON()));
        // this.setElement(this.template(this.model.toJSON()));
        // <td data-column-select-priority="{{fieldPriority}}" data-header-id="{{name}}" class="{{wrapClass}}">
    },
    render: function() {
        // this.$el
        //     .attr('data-column-select-priority',this.model.get('fieldPriority'))
        //     .attr('data-header-id',this.model.get('name'))
        //     .addClass(this.model.get('wrapClass'));
        return this.template(this.model.toJSON());
    }
});