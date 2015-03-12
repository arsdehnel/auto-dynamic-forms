/*global
ADF,
Backbone,
adf,
_
*/
ADF.GridFilterView = ADF.DropdownMenuView.extend({
    childView: ADF.GridFilterItemView,
    childViewContainer: '.dropdown-menu',
    collection: new Backbone.Collection(),
    model: new ADF.DropdownMenuModel(),
    initialize: function( options ){
        ADF.utils.message('log','GridFilterView Initialized', options);

        this.region = adf.page.getRegion(options.regionName);
        this.regionName = options.regionName;
        this.fieldName = options.fieldName;
        this.fieldType = options.fieldType;

        var footerOptions = [];

        footerOptions.push({
            href : '#',
            itemClass : 'adf-grid-filter-action',
            label : 'Clear Actions',
            dataAttributes : [
                {
                    'name' : 'filter-action-type',
                    'value' : 'clear'
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
            this.$el.find('.dropdown-menu .divider').before(child.renderAsChild());
            child.setElement(this.$el.find('.dropdown-menu .divider').prev()[0]);
        },this);

        // console.log(this.collection,this.children);

    }

});