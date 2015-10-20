/*global
ADF,
Marionette,
adf,
$
*/
ADF.Grids.FilterItemView = Marionette.ItemView.extend({
    template: ADF.templates.dropdowns.selectItem,
    tagName: 'li',
    events: {
        'change :input'                          : 'filterSelect'
    },
    initialize: function( options ){
        ADF.utils.message('log','GridFilterItemView Initialized', options);
        this.regionName = options.regionName;
        // this.setElement(this.$el.replaceWith(this.template({})));
        // this.model.set('selectedValues',options.selectedValues);
        this.model.set('label',this.model.get('fieldValue') + ' (' + this.model.get('records').length + ')');
        this.model.set('id',ADF.utils.randomId());
        this.model.set('name',this.regionName+'--'+this.model.get('fieldName')+'--'+this.model.get('fieldValue'));
        // this.model.set('currentValue',false);
        this.gridView = adf.page.getRegion(this.regionName).gridView;
        this.gridFilterQueue = this.gridView.bodyView.filterQueue;
    },
    render: function() {
        // have this so the default marionette renderer doesn't render anything
    },
    renderAsChild: function() {
        // console.log(this.model.get('selectedValues'));
        return this.template(this.model.toJSON());
    },
    filterSelect: function( e ) {
        e.preventDefault();
        if( $(e.target).is(':checked') ){
            // console.log('this one is checked',this.model.id);
            // this.gridFilterQueue.add(this.model.toJSON());
            this.gridFilterQueue.add(this.model);
        }else{
            // console.log('this one is not checked',this.model.id);
            this.gridFilterQueue.remove(this.gridFilterQueue.findWhere({fieldName:this.model.get('fieldName'),fieldValue:this.model.get('fieldValue')}));
        }
        // console.log('within GridFilterItemView',this.gridFilterQueue);
    }

});