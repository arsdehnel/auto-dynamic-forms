/*global
ADF,
$
*/
ADF.Modules.ActionView = ADF.Core.ActionView.extend({
    events: {
        'click .btn'                    : 'handleAction'
    },
    initialize: function( options ){
        ADF.utils.message('log','Modules.ActionView initialized', options );
        this.region = options.region;
        this._super();
    },
    handleAction: function(e) {
        var actionView = this;
        var $targetObj = $(e.target).closest('a');
        var actionType = $targetObj.attr('data-action-type');
        // TODO: experiment with making this dynamic
        switch( actionType ){
            case 'save':
                e.preventDefault();
                actionView.region.modulesView.moduleListView.collection.each(function( moduleModel ){
                    moduleModel.url = $targetObj.attr('href');
                    moduleModel.save(null,{fieldsCollection: actionView.region.modulesView.region.fieldsCollection});
                });
                break;
            default:
                ADF.utils.message('error','Unexpected module action ('+actionType+') triggered.',$targetObj);
        }
    }

});