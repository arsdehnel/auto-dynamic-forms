ADF.HeaderView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.gridHeaderCell,
    tagName: 'th',
    initialize: function( options ){
        ADF.utils.message('log','HeaderView Initialized', options);
        this.model.set('colIndex',this.model.collection.indexOf(this.model))
        this.model.set('regionName',options.regionName);
    },
    render: function() {
        // TODO: use hbs template rather than all this silly JS
        this.$el
            .attr('data-column-select-priority',this.model.get('fieldPriority'))
            .attr('id',this.model.get('regionName') + '--' + this.model.get('name'))
            .attr('data-column-index',this.model.get('colIndex'))
            .addClass(this.model.get('wrapClass'));
        if( this.model.get('tooltip') ){
            this.$el.addClass('has-tooltip');
        }
        // return this.template(this.model.toJSON());
        this._super();
    }
});