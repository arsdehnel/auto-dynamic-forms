/*global
ADF
*/
ADF.Forms.ActionsView = ADF.Core.ActionsView.extend({
    getChildView: function(model) {
        var viewClass;
        switch( model.get('type') ){
            case 'submitLongPoll':
                viewClass = ADF.Actions.SubmitLongPoll;
                break;
            default:
                viewClass = ADF.Forms.ActionView;
                break;
        }
        return viewClass;
    },    
    initialize: function( options ) {
        ADF.utils.message('log','Forms.ActionsView Initialized', options );
        this._super();
    }


});