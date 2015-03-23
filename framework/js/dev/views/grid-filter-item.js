/*global
ADF,
Marionette,
adf,
$
*/
ADF.GridFilterItemView = Marionette.ItemView.extend({
    template: ADF.templates.dropdownSelectItem,
    tagName: 'li',
    events: {
        'change :input'                          : 'filterSelect'
    },
    initialize: function( options ){
        ADF.utils.message('log','GridFilterItemView Initialized', options);
        this.regionName = options.regionName;
        // this.setElement(this.$el.replaceWith(this.template({})));
        this.model.set('label',this.model.get('fieldValue') + ' (' + this.model.get('records').length + ' )');
        this.model.set('id',ADF.utils.randomId());
        this.model.set('name',this.regionName+'--'+this.model.get('fieldName')+'--'+this.model.get('fieldValue'));
        this.gridView = adf.page.getRegion(this.regionName).gridView;
        this.gridFilterQueue = this.gridView.filterQueue;
    },
    render: function() {
        // have this so the default marionette renderer doesn't render anything
    },
    renderAsChild: function() {
        return this.template(this.model.toJSON());
    },
    filterSelect: function( e ) {
        e.preventDefault();
        if( $(e.target).is(':checked') ){
            // console.log('this one is checked',this.model.id);
            this.gridFilterQueue.add(this.model.toJSON());
        }else{
            // console.log('this one is not checked',this.model.id);
            this.gridFilterQueue.remove(this.model.id);
        }
        // console.log('within GridFilterItemView',this.gridFilterQueue);
    }

});