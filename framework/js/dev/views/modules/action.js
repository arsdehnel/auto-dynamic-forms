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
        this._super();
    },
    handleAction: function(e) {
        var recordView = this;
        var $targetObj = $(e.target).closest('a');
        var actionType = $targetObj.attr('data-action-type');
        switch( actionType ){
            case 'save':
                e.preventDefault();
                this.model.url = $targetObj.attr('href');
                this.model.save(null,{fieldsCollection: recordView.collection});
                break;
            default:
                ADF.utils.message('error','Unexpected record action ('+actionType+') triggered.',$targetObj);
        }
    }

});