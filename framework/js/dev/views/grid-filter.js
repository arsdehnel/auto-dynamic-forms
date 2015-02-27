/*global
ADF,
Backbone,
adf,
_
*/
// TODO: clear queued filters when this closes
ADF.GridFilterView = ADF.DropdownMenuView.extend({
    childView: ADF.GridFilterItemView,
    childViewContainer: '.dropdown-menu',
    collection: new Backbone.Collection(),
    events: {
        'dropdownToggle:after'                   : 'populateFilters',
        'click [data-filter-action-type=cancel]' : 'cancelFilters',
        'click [data-filter-action-type=apply]'  : 'applyFilters',
        'click [data-filter-action-type=clear]'  : 'clearFilters'
    },
    initialize: function( options ){
        ADF.utils.message('log','GridFilterView Initialized', options);

        this.regionName = options.regionName;
        this.region = adf.page.getRegion(this.regionName);
        this.gridView = this.region.gridView;
        this.gridFilterQueue = this.gridView.filterQueue;
        this.fieldName = options.fieldName;
        this.fieldType = options.fieldType;

        var footerOptions = [];

        footerOptions.push({
            href : '#',
            itemClass : 'adf-grid-filter-action',
            label : 'Clear Filters',
            dataAttributes : [
                {
                    'name' : 'filter-action-type',
                    'value' : 'clear'
                }
            ]
        });

        footerOptions.push({
            href : '#',
            itemClass : 'adf-grid-filter-action',
            label : 'Apply',
            dataAttributes : [
                {
                    'name' : 'filter-action-type',
                    'value' : 'apply'
                }
            ]
        });

        footerOptions.push({
            href : '#',
            itemClass : 'adf-grid-filter-action',
            label : 'Cancel',
            dataAttributes : [
                {
                    'name' : 'filter-action-type',
                    'value' : 'cancel'
                }
            ]
        });

        this.model.set('footerOptions',footerOptions);
        this.model.set('wrapClass','grid-header-filter');

        if( this.fieldType === 'TEXT' ){
            this.includeInRender = true;
            this.headerEl = options.headerEl;
        }else{
            this.includeInRender = false;
        }

        // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.DropdownMenuView.prototype.events,this.events);

    },
    render: function() {
        // var gridFilterView = this;

        if( this.includeInRender ) {
            this.headerEl.addClass('has-filter').append(this.template(this.model.toJSON()));
            this.setElement(this.headerEl.find('.dropdown-wrapper')[0]);
            // TODO: review if this should be here or just in the dropdownToggle function
            // this.listenTo(this.collection,'add',function(model){
            //     gridFilterView.addChild(model,gridFilterView.childView);
            // });
        }
    },
    populateFilters: function() {
        alert('yay');
    },
    dropdownToggle: function( event ) {

        // this basically just opens the dropdown
        this._super( event );

        var child = {};

        // TODO: add type-ahead-style search (or something)
        // TODO: make this spinner work with the parent code that removes the hide class
        // ADF.utils.spin(this.$el.find('.dropdown-menu'));

        // create an array based on all the values existing in the column
        var distinctValues = _.groupBy(this.region.gridView.collection.models, function( recordModel ){
            return recordModel.get(this.fieldName);
        },this);

        _.each(distinctValues,function(fieldValue, index){
            this.collection.add({fieldName:this.fieldName,fieldValue:index,records:fieldValue});
        },this);

        this.collection.each(function( model ){
            child = this.addChild(model,this.childView);
            // TODO: override the stupid rendering of ItemViews within composites and collections to not replicate their parent element
            this.$el.find('.dropdown-menu .primary-options').append(child.renderAsChild());
            child.setElement(this.$el.find('.dropdown-menu .primary-options li').last()[0]);
        },this);

        // console.log(this.collection,this.children);

    },
    cancelFilters: function( e ) {
        e.preventDefault();
        this.gridFilterQueue.reset();
    },
    applyFilters: function( e ) {
        e.preventDefault();
        this.gridView.applyFilters();
    },
    clearFilters: function( e ) {
        e.preventDefault();
        // TODO: make this smart so that it only removes the field that we're on
        this.gridView.clearFilters();
    }

});