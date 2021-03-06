/*global
ADF,
Backbone,
_
*/
ADF.Grids.HeaderView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.grids.headerCell,
    tagName: 'th',
    childView: ADF.Grids.FilterView,
    events: {
        'click     .sort-control'           : 'sortGrid',
        'mousedown .adf-grid-resize-handle' : 'resizeStart',
        'mouseup   .adf-grid-resize-handle' : 'resizeStop',
        'mousemove'                         : 'resiseMove'
    },
    initialize: function( options ){
        ADF.utils.message('log','HeaderView Initialized', options);
        this.gridView = options.gridView;
        var headerView = this;
        headerView.regionName = options.regionName;
        this.model.set('colIndex',this.model.collection.indexOf(this.model));
        this.model.set('regionName',options.regionName);

        if( this.model.get('type') !== 'actions' ){
            this.model.set('sortable',true);
        }else{
            this.model.set('sortable',false);
        }

        if( _.indexOf(ADF.config.get('grids').filters.fieldTypeInclude, this.model.get('type') ) >= 0 ){

            headerView.gridFilter = new ADF.Grids.FilterView({
                headerView: headerView,
                regionName: headerView.regionName,
                collection: new Backbone.Collection(null,{comparator: 'fieldValue'})
            });

        }

    },
    onRender: function() {
        this.setElement(this.$el.find('th').unwrap());

        if( this.gridView.bodyView.filters.where({fieldName:this.model.get('name')}).length > 0 ){
            this.$el.addClass('is-filtered');
        }

        // console.log(this.model.get('fieldPriority'),this.$el,this.$el.css('display'));

        // if( this.model.get('fieldPriority') !== 0  && this.$el.css('display') === 'table-cell' ){
        //     ADF.utils.message('info',this.model.get('fieldName'),'should be displayed as table cell');
        // }        

        // if this header has a filter then render it but some might not
        // because only certain types of fields really work to be filtered
        if( this.gridFilter ){
            this.gridFilter.render();
        }
        
    },
    sortGrid: function( e ){

        ADF.utils.spin( this.gridView.$el );

        // this will sort the collection and return us the direction
        var sortDir = this.gridView.bodyView.collection.sortRecords( this.model.get('name') );

        // clear indicators
        this.gridView.headersView.clearSortClass();

        // indicate on this header
        this.$el.addClass('sorted-'+sortDir);

        ADF.utils.spin( this.gridView.$el, { stop: true }  );

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