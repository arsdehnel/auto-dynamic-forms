/*global
ADF,
adf,
_
*/
// TODO: clear queued filters when this closes
// TODO: only show clear filters option when there are applied filters
ADF.GridFilterView = ADF.DropdownMenuView.extend({
    childView: ADF.GridFilterItemView,
    childViewContainer: '.dropdown-menu',
    // collection: new Backbone.Collection(),
    // collection: Backbone.Collection,
    model: new ADF.DropdownMenuModel(),
    events: {
        'dropdownToggle:open'                     : 'showFilters',
        'click *[data-filter-action-type=cancel]' : 'cancelFilters',
        'click *[data-filter-action-type=apply]'  : 'applyFilters',
        'click *[data-filter-action-type=clear]'  : 'clearFilters'
    },
    initialize: function( options ){
        ADF.utils.message('log','GridFilterView Initialized', options);

        this.regionName = options.regionName;
        this.region = adf.page.getRegion(this.regionName);
        this.gridView = this.region.gridView;
        this.gridFilterQueue = this.gridView.filterQueue;
        this.fieldName = options.fieldName;
        this.fieldType = options.fieldType;
        this.filtersGenerated = false;

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
        this.model.set('caretSvg','filter');

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
        }
    },
    generateFilters: function() {

        // create an array based on all the values existing in the column
        var distinctValues = _.groupBy(this.region.gridView.collection.models, function( recordModel ){
            return recordModel.get(this.fieldName);
        },this);

        // add those as models to a new collection
        _.each(distinctValues,function(fieldValue, index){
            // console.log(fieldValue,index);
            this.collection.add({fieldName:this.fieldName,fieldValue:index,records:fieldValue});
        },this);

        // TODO: get this sorting to work properly so the filter listing is in alpha order
        this.collection.reset(_.sortBy(this.collection.models,function( filterModel ){
            filterModel.get('fieldName');
        }));

        this.filtersGenerated = true;

    },
    showFilters: function(e) {

        var child = {};
        var existingFilter = {};

        // TODO: add type-ahead-style search (or something)
        // TODO: make this spinner work with the parent code that removes the hide class
        ADF.utils.spin(this.$el.find('.dropdown-menu .primary-options'));

        if( !this.filtersGenerated ){
            this.generateFilters();
        }

        if( this.children.length !== this.collection.length ){

            if( this.children.length !== 0 ){
                console.error('this should never actually happen');
            }

            // render those as options
            this.collection.each(function( model ){
                existingFilter = this.gridView.filters.find(function(filterModel){
                    return filterModel.get('fieldName') === model.get('fieldName');
                });
                if( existingFilter ){
                    // console.log('something',existingFilter.get('filterValues'));
                    model.set('currentValue',existingFilter.get('filterValues'));
                }
                // console.log( model.get('fieldName'), existingFilter ? existingFilter.get('filterValues') : false );
                child = this.addChild(model,this.childView);
                // TODO: override the stupid rendering of ItemViews within composites and collections to not replicate their parent element
                this.$el.find('.dropdown-menu .primary-options').append(child.renderAsChild());
                child.setElement(this.$el.find('.dropdown-menu .primary-options li').last()[0]);
            },this);

        }else{

            this.$el.find('.dropdown-menu .primary-options').empty();
            this.children.each(function(filterItemView){
                this.$el.find('.dropdown-menu .primary-options').append(child.renderAsChild());
                child.setElement(this.$el.find('.dropdown-menu .primary-options li').last()[0]);
            });

        }

        ADF.utils.spin(this.$el.find('.dropdown-menu .primary-options'), {stop:true});

        // console.log(this.collection,this.children);

    },
    cancelFilters: function( e ) {

        // close the drop down (also handles the prevention of the events default action)
        this.dropdownToggle( e );

        ADF.utils.message('debug','cancelFilters called');

        // empty the queue so we don't apply the selected filters that haven't explicitly been applied
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