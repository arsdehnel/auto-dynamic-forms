/*global
ADF,
Backbone
*/
ADF.HeaderView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.gridHeaderCell,
    tagName: 'th',
    childView: ADF.GridFilterView,
    // childViewOptions : function () {
    //     return { regionName: this.regionName };
    // },
    initialize: function( options ){
        ADF.utils.message('log','HeaderView Initialized', options);
        var headerView = this;
        headerView.regionName = options.regionName;
        this.model.set('colIndex',this.model.collection.indexOf(this.model));
        this.model.set('regionName',options.regionName);

        headerView.gridFilter = new ADF.GridFilterView({
            headerEl: headerView.$el,
            regionName: headerView.regionName,
            fieldType: headerView.model.get('type'),
            fieldName: headerView.model.get('name')
        });

    },
    render: function() {
        // TODO: use hbs template rather than all this silly JS
        this.$el
            .attr('data-column-select-priority',this.model.get('fieldPriority'))
            .attr('data-column-name',this.model.get('name'))
            .attr('id',this.model.get('regionName') + '--' + this.model.get('name'))
            .attr('data-column-index',this.model.get('colIndex'))
            .addClass(this.model.get('wrapClass'));
        if( this.model.get('tooltip') ){
            this.$el.addClass('has-tooltip');
        }

        // this.$el.append(this.childView.render());
        // this.childView.render();

        // return this.template(this.model.toJSON());
        this._super();

        this.gridFilter.render();

    }
});