/*global
ADF,
Backbone,
adf
*/
ADF.Grids.HeaderView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.gridHeaderCell,
    tagName: 'th',
    childView: ADF.Grids.FilterView,
    events: {
        'click     .sort-trigger'           : 'sortGrid',
        'mousedown .adf-grid-resize-handle' : 'resizeStart',
        'mouseup   .adf-grid-resize-handle' : 'resizeStop',
        'mousemove'                         : 'resiseMove'
    },
    initialize: function( options ){
        ADF.utils.message('log','HeaderView Initialized', options);
        var headerView = this;
        headerView.regionName = options.regionName;
        this.model.set('colIndex',this.model.collection.indexOf(this.model));
        this.model.set('regionName',options.regionName);
        this.gridView = adf.page.getRegion(headerView.regionName).gridView;

        if( this.model.get('type') !== 'ACTIONS' ){
            this.model.set('sortable',true);
        }else{
            this.model.set('sortable',false);
        }

        headerView.gridFilter = new ADF.Grids.FilterView({
            headerView: headerView,
            regionName: headerView.regionName,
            collection: new Backbone.Collection(null,{comparator: 'fieldValue'})
        });

    },
    onRender: function() {
        this.setElement(this.$el.find('th').unwrap());

        if( this.gridView.bodyView.filters.where({fieldName:this.model.get('name')}).length > 0 ){
            this.$el.addClass('is-filtered');
        }

        this.gridFilter.render();
    },
    sortGrid: function( e ){
        this.gridView.sortGrid( e );
    },
    resizeInit: function() {
        this.$el.width(this.$el.width());
    },
    resizeStart: function(e) {
        // var start = $(this);
        this.pressed = true;
        this.startX = e.pageX;
        this.startWidth = this.$el.width();
        this.$el.addClass('resizing');
    },
    resiseMove: function(e) {
        if( this.pressed ){
            this.$el.width(this.startWidth+(e.pageX-this.startX));
        }
    },
    resizeStop: function(e) {
        if( this.pressed ){
            this.$el.removeClass('resizing');
            this.pressed = false;
        }
    }
});