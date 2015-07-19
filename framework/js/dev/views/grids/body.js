/*global
ADF,
Backbone,
Marionette,
adf,
$,
_
*/
ADF.Grids.BodyView = Marionette.CompositeView.extend({
    // TODO: overlay template adjusted to handle array of data with format/delimiter from data-supl-info attribute
    // TODO: grid-level action for saving all records

    className: 'adf-grid',
    tagName: 'tbody',
    template: function(){
        return '';
    },
    childView: ADF.Grids.RowView,
    childViewOptions : function () {
        return { regionName: this.regionName };
    },
    initialize: function( options ) {
        ADF.utils.message('log','Grids.BodyView Initialized', options );
        // this.baseCollection = options.baseCollection;
        this.regionName = options.regionName;
        this.region = adf.page.getRegion(this.regionName);
        // this.collection = new ADF.RecordsCollection(this.baseCollection.models);
        this.filters = new Backbone.Collection();
        this.filterQueue = new Backbone.Collection();

        this.stopListening(this.collection,'add');
        this.stopListening(this.collection,'remove');
        this.stopListening(this.collection,'reset');

        this.listenTo(this.collection,'add',this.refreshFilteredRecords);
        this.listenTo(this.collection,'remove',this.refreshFilteredRecords);
        this.listenTo(this.collection,'reset',this.refreshFilteredRecords);

        // this.listenTo(this.collection,'sort',this.refreshFilteredRecords);
        this.listenTo(this.region.fieldsCollection,'change:colSelectDispOverride',this._updateColSelectDispOverride);

        this._super();

    },
    filter: function (childModel, index, collection) {
        if( this.filters.length > 0 ){
            var filterMatch = true;
            this.filters.each(function(filterModel){
                if( _.indexOf(filterModel.get('filterValues'),childModel.get(filterModel.get('fieldName'))) < 0 ){
                    filterMatch = false;
                    return;
                }
            },this);
            return filterMatch;
        }else{
            return true;
        }
    },
    onRender: function() {
        ADF.utils.inputHandlerRefresh();
    },
    refreshFilteredRecords: function() {
        // ADF.utils.message('error','BodyView refreshFilteredRecords called');

        // console.log('refreshFilteredRecords', this.filters.length, arguments);

        // start with everything we have and (maybe) filter from there
        this.filteredRecords = this.collection;

        if( this.filters.length ){
            // console.log('filters to be applied');
            // this.filteredRecords = this.collection;
            // console.log(this.filteredRecords.models.length,this.filters.toJSON());

            // go through each filter and trim down our records
            this.filters.each(function(filterModel){
                this.filteredRecords = new Backbone.Collection(this.filteredRecords.filter(function(recordModel){
                    // console.log('filter comparison',filterModel.get('filterValues'),recordModel.get(filterModel.get('fieldName')),_.indexOf(filterModel.get('filterValues'),recordModel.get(filterModel.get('fieldName'))));
                    return _.indexOf(filterModel.get('filterValues'),recordModel.get(filterModel.get('fieldName'))) >= 0;
                }));
            },this);
            // console.log(this.filteredRecords.models.length,this.filters.toJSON());
            // this.filteredRecords.reset(this.collection.where(this.filters));
        }


        adf.page.getRegion(this.regionName).gridView.render();

    },
    applyFilters: function() {

        // we will start by just building an array of the selected values
        var filterValues = [];
        var filterFieldName = this.filterQueue.models[0].get('fieldName');

        // now we go through the filterQueue collection and turn them into our filterValues array
        // because that's all we want for the stored filters
        _.each(this.filterQueue.models,function(model){
            filterValues.push(model.get('fieldValue'));
        });

        // do we have an existing filter for this field
        var existingFilter = this.filters.find(function(model){
            return model.get('fieldName') === filterFieldName;
        });

        // if we have an existing model in the collection for this field then we just update its value
        if( existingFilter ){
            existingFilter.set('filterValues',filterValues);
        }else{
            // otherwise we need to create a new model for the particular field we're adding to our filters
            var filterModel = new Backbone.Model();
            filterModel.set('fieldName',filterFieldName);
            filterModel.set('filterValues',filterValues);
            this.filters.add(filterModel);
        }
        this.render();
        this.filterQueue.reset();
    },
    clearFilters: function() {
        this.filters.reset();
        this.refreshFilteredRecords();
        this.filterQueue.reset();
    },

    sortGrid: function( e ) {

        e.preventDefault();

        var $triggerObj = $(e.currentTarget),
            columnName = $triggerObj.closest('th').attr('data-column-name'),
            gridSortAttribute = this.collection.sortAttribute;

        // Toggle sort if the current column is sorted
        if (columnName === gridSortAttribute) {
            this.collection.sortDirection *= -1;
        } else {
            this.collection.sortDirection = 1;
        }

        // Adjust the indicators.  Reset everything to hide the indicator
        $triggerObj.closest('thead').find('.sort-trigger').removeClass('sort-up sort-down');

        // Now show the correct icon on the correct column
        if (this.collection.sortDirection == 1) {
            $triggerObj.addClass('sort-up');
        } else {
            $triggerObj.addClass('sort-down');
        }

        // Now sort the collection
        this.collection.sortRecords(columnName);

    },

    _updateColSelectDispOverride: function( model ) {
        console.warn(model.changed,'within bodyView');
        this.children.each(function(childView){
            console.warn(childView.collection.findWhere({name:model.get('name')}).set(model.changed));
        });
    }




});