/*global
ADF
*/
ADF.Modules.ActionsView = ADF.Core.ActionsView.extend({
    childView: ADF.Modules.ActionView,
    initialize: function( options ) {
        ADF.utils.message('log','Modules.ActionsView Initialized', options );
        this._super();
    }

});