/*global
ADF,
adf,
_
*/
// TODO: clear queued filters when this closes
// TODO: only show clear filters option when there are applied filters
ADF.Grids.FilterView = ADF.Core.DropdownView.extend({
    childView: ADF.Grids.FilterItemView,
    // collection: new Backbone.Collection(),
    // collection: Backbone.Collection,
    model: new ADF.DropdownMenuModel(),
    events: {
        'dropdownToggle:open'                     : 'showFilters',
        'click *[data-filter-action-type=cancel]' : 'cancelFilters',
        'click *[data-filter-action-type=apply]'  : 'applyFilters',
        'click *[data-filter-action-type=clear]'  : 'clearFilters',
        'keyup .dropdown-text-filter'             : 'textFilterRefresh'
    },
    initialize: function( options ){
        ADF.utils.message('log','GridFilterView Initialized', options);

        this.regionName = options.regionName;
        this.region = adf.page.getRegion(this.regionName);
        this.gridView = this.region.gridView;
        this.headerView = options.headerView;
        this.gridFilterQueue = this.gridView.bodyView.filterQueue;
        this.fieldName = this.headerView.model.get('name');
        this.fieldType = this.headerView.model.get('type');
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
        this.model.set('textFilterInput',true);
        this.model.set('wrapClass','filter-control adf-header-control');
        this.model.set('caretSvg','filter');

        // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.Core.DropdownView.prototype.events,this.events);

    },
    render: function() {
        // var gridFilterView = this;

        // if( this.fieldType === 'text' ){
            this.headerView.$el.addClass('has-filter').append(this.template(this.model.toJSON()));
            this.setElement(this.headerView.$el.find('.dropdown-wrapper')[0]);
        // }

    },
    generateFilters: function() {

        // create an array based on all the values existing in the column
        var distinctValues = _.groupBy(this.region.gridView.bodyView.collection.models, function( recordModel ){
            return recordModel.get(this.fieldName);
        },this);

        // add those as models to a new collection
        _.each(distinctValues,function(fieldValue, index){
            // console.log(fieldValue,index);
            this.collection.add({fieldName:this.fieldName,fieldValue:index,records:fieldValue});
        },this);

        // TODO: get this sorting to work properly so the filter listing is in alpha order
        // this.collection.reset(_.sortBy(this.collection.toJSON(),'fieldValue'));
        // this.collection.reset(_.sortBy(this.collection.toJSON(),function( filterObj ){
        //     filterModel.get('fieldValue');
        // }));

        this.filtersGenerated = true;

    },
    showFilters: function(e) {

        var gridFilter = this;
        var child = {};
        var existingFilter = {};
        var crntFilterModel;

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

            // check for (and retrieve) any existing filters
            if( this.gridView.bodyView.filters ){
                existingFilter = this.gridView.bodyView.filters.find(function(filterModel){
                    return filterModel.get('fieldName') === this.fieldName;
                },this);
            }

            // if there is an existing filter we should pre-populate our filterQueue with it's values
            if( existingFilter ){
                _.each(existingFilter.get('filterValues'),function(filterValue){
                    crntFilterModel = gridFilter.collection.findWhere({'fieldValue':filterValue});
                    if( crntFilterModel ){
                        gridFilter.gridFilterQueue.add(gridFilter.collection.findWhere({'fieldValue':filterValue}).toJSON());
                    }
                },this);
            }

            // render those as options
            this.collection.each(function( model ){

                // check if there is an existing filter and if this one matches with it
                if( existingFilter ){
                    model.set('currentValue',existingFilter.get('filterValues'));
                }

                // add a childview for re-rendering later
                child = this.addChild(model,this.childView);

                this.$el.find('.dropdown-menu .primary-options').append(child.renderAsChild());
                child.setElement(this.$el.find('.dropdown-menu .primary-options li').last()[0]);
            },this);

        }else{

            this.$el.find('.dropdown-menu .primary-options').empty();
            this.children.each(function(filterItemView){
                this.$el.find('.dropdown-menu .primary-options').append(filterItemView.renderAsChild());
                filterItemView.setElement(this.$el.find('.dropdown-menu .primary-options li').last()[0]);
            },this);

        }

        ADF.utils.spin(this.$el.find('.dropdown-menu .primary-options'), {stop:true});

        this.$el.find('.dropdown-text-filter').focus();
        this.textFilterRefresh();

        // console.log(this.collection,this.children);

    },
    cancelFilters: function( e ) {

        // close the drop down (also handles the prevention of the events default action)
        this.dropdownToggle( e );

        ADF.utils.message('log','cancelFilters called');

        // empty the queue so we don't apply the selected filters that haven't explicitly been applied
        this.gridFilterQueue.reset();

    },
    applyFilters: function( e ) {
        e.preventDefault();
        this.dropdownToggle( e );
        this.gridView.bodyView.applyFilters();
        this.headerView.$el.addClass('is-filtered');
        // this.$el.find('.dropdown-menu').addClass('hide');
    },
    clearFilters: function( e ) {
        e.preventDefault();
        // TODO: make this smart so that it only removes the field that we're on
        this.gridView.bodyView.clearFilters();
    },
    textFilterRefresh: function( e ) {
        var $input = this.$el.find('.dropdown-text-filter');
        var crntString = $input.val().toLowerCase();
        var matchIdx;
        if( crntString.length > 0 ){
            this.children.each(function(child){
                matchIdx = child.model.get('fieldValue').toLowerCase().indexOf(crntString);
                if( matchIdx >= 0 ){
                    child.$el.removeClass('hide');
                }else{
                    child.$el.addClass('hide');
                }
            });
        }else{
            this.children.each(function(child){
                child.$el.removeClass('hide');
            });
        }
    }

});