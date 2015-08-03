/*global
ADF,
Backbone
*/
ADF.Grids.HeaderView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.gridHeaderCell,
    tagName: 'th',
    childView: ADF.Grids.FilterView,
    events: {
        'click     .sort-control'             : 'sortGrid',
        'mousedown .resize-control'           : 'resizeStart',
        'mouseup   .resize-control'           : 'resizeStop',
        'mousemove .resize-control.resizing'  : 'resizeMove'
    },
    initialize: function( options ){
        ADF.utils.message('log','HeaderView Initialized', options);
        this.gridView = options.gridView;
        var headerView = this;
        headerView.regionName = options.regionName;
        this.model.set('colIndex',this.model.collection.indexOf(this.model));
        this.model.set('regionName',options.regionName);

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
    ui: {
        resize: '.resize-control'
    },
    onRender: function() {
        this.setElement(this.$el.find('th').unwrap());

        if( this.gridView.bodyView.filters.where({fieldName:this.model.get('name')}).length > 0 ){
            this.$el.addClass('is-filtered');
        }

        this.gridFilter.render();
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
        // TODO: make this smarter so it trims down somehow to the widest content or something
        this.width = this.$el.width();
        this.$el.width(this.width);
    },
    resizeStart: function(e) {
        this.pressed = true;
        this.startX = e.pageX;
        this.startCellWidth = parseInt(this.$el.css('width'), 10);
        this.startTableWidth = parseInt(this.$el.closest('.adf-grid').css('width'), 10);
        this.ui.resize.addClass('resizing');
    },
    resizeMove: function(e) {
        if( this.pressed ){
            // console.log('resizeMove',this.startCellWidth,this.startTableWidth,e.pageX,this.startX);
            this.$el.width(this.startCellWidth+(e.pageX-this.startX));
            this.$el.closest('.adf-grid').width(this.startTableWidth+(e.pageX-this.startX));
        }
    },
    resizeStop: function(e) {
        if( this.pressed ){
            this.ui.resize.removeClass('resizing');
            this.pressed = false;
        }
    }
});