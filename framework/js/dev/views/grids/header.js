/*global
ADF,
Backbone,
adf
*/
ADF.Grids.HeaderView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.gridHeaderCell,
    tagName: 'th',
    childView: ADF.Grids.FilterView,
    // childViewOptions : function () {
    //     return { regionName: this.regionName };
    // },
    events: {
        'click .sort-trigger'    : 'sortGrid'
    },
    initialize: function( options ){
        ADF.utils.message('log','HeaderView Initialized', options);
        var headerView = this;
        headerView.regionName = options.regionName;
        this.model.set('colIndex',this.model.collection.indexOf(this.model));
        this.model.set('regionName',options.regionName);
        this.gridView = adf.page.getRegion(headerView.regionName).gridView;

        headerView.gridFilter = new ADF.Grids.FilterView({
            headerEl: headerView.$el,
            regionName: headerView.regionName,
            fieldType: headerView.model.get('type'),
            fieldName: headerView.model.get('name'),
            collection: new Backbone.Collection(null,{comparator: 'fieldValue'})
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
        if( this.model.get('type') !== 'ACTIONS' ){
            this.$el.addClass('is-sortable');
            this.model.set('sortable',true);
        }else{
            this.model.set('sortable',false);
        }

        if( this.gridView.bodyView.filters.where({fieldName:this.model.get('name')}).length > 0 ){
            this.$el.addClass('is-filtered');
        }

        this._super();

        this.gridFilter.render();

    },
    sortGrid: function( e ){
        this.gridView.sortGrid( e );
    }
});