/*global
ADF,
_
*/
ADF.Inputs.GridActionsView = ADF.Core.InputView.extend({
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ){
        ADF.utils.message('log','Inputs.GridActionsView Initialized', options);
        this.model.set('gridCell',true);
        this.rowView = options.rowView;
        this._setActionDisplayFilter();
        this._super();
    },
    onRender: function() {
        this._applyActionDisplayFilter();
        this._stringSubstitueHrefs();
        // TODO: make this into a common marionette behavior for all grid inputs
        if( this.model.get('fieldPriority') !== 0  && this.$el.css('display') === 'table-cell' ){
            ADF.utils.message('log',this.model.get('fieldName'),'should be displayed as table cell');
        }
        this._super();        
    },
    _setActionDisplayFilter: function() {
        // TODO: move this to the model or commonize it or something?
        _.each(this.model.get('actions'),function(action,index){
            if( action.dataAttributes ){
                action.actionDisplayFilter = _.findWhere(action.dataAttributes,{name:'action-display-filter'});
                action.actionDisplayFilter = action.actionDisplayFilter ? ADF.utils.string.querystringToObj( action.actionDisplayFilter.value ) : false;
                // console.log(action.actionDisplayFilter, ADF.utils.string.querystringToObj( action.actionDisplayFilter.value ), this.rowView.collection.findWhere({name:'excpn_status_desc'}).get('currentValue'));
            }
            action.type = action.type.toLowerCase();
        },this);
    },
    _applyActionDisplayFilter: function() {
        // TODO: make the actions array into a proper BB collection and do this stuff within models
        _.each(this.model.get('actions'),function(action,index){
            if( action.actionDisplayFilter ){
                _.each(action.actionDisplayFilter,function(filterVal, filterField){
                    if( this.rowView.collection.findWhere({name:filterField}).get('currentValue') !== filterVal ){
                        this.$el.find('[data-page-dtl-id='+action.pageDetailId+']').hide();
                    }
                },this);
            }
        },this);        
    },
    _stringSubstitueHrefs: function() {
        // TODO: make the actions array into a proper BB collection and do this stuff within models
        _.each(this.model.get('actions'),function(action){
            this.$el.find('[data-page-dtl-id='+action.pageDetailId+']').attr('href',ADF.utils.string.substitute( action.url, this.rowView.model.toJSON() ));
        },this); 
    }

});