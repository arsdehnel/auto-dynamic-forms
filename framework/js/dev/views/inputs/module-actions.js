/*global
ADF,
_
*/
ADF.Inputs.ModuleActionsView = ADF.Core.InputView.extend({
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ){
        ADF.utils.message('log','Inputs.ModuleActionsView Initialized', options);
        this.moduleView = options.moduleView;
        // TODO: move this to the model or commonize it or something?
        _.each(this.model.get('actions'),function(action,index){
            if( action.dataAttributes ){
                action.actionDisplayFilter = _.findWhere(action.dataAttributes,{name:'ACTION_DISPLAY_FILTER'});
                action.actionDisplayFilter = action.actionDisplayFilter ? ADF.utils.string.querystringToObj( action.actionDisplayFilter.value ) : false;
            }
            action.type = action.type.toLowerCase();
        },this);
        this._super();
    },
    onRender: function() {
        this._applyActionDisplayFilter();
        this._stringSubstitueHrefs();
        // TODO: make this into a common marionette behavior for all grid inputs
        this._super();        
    },
    _applyActionDisplayFilter: function() {
        // TODO: make the actions array into a proper BB collection and do this stuff within models
        _.each(this.model.get('actions'),function(action,index){
            if( action.actionDisplayFilter ){
                _.each(action.actionDisplayFilter,function(filterVal, filterField){
                    if( this.moduleView.collection.findWhere({name:filterField}).get('currentValue') !== filterVal ){
                        this.$el.find('[data-page-dtl-id='+action.pageDetailId+']').hide();
                    }
                },this);
            }
        },this);        
    },
    _stringSubstitueHrefs: function() {
        // TODO: make the actions array into a proper BB collection and do this stuff within models
        _.each(this.model.get('actions'),function(action){
            this.$el.find('[data-page-dtl-id='+action.pageDetailId+']').attr('href',ADF.utils.string.substitute( action.url, this.moduleView.model.toJSON() ));
        },this); 
    }

});