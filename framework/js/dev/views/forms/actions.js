/*global
ADF
*/
ADF.Forms.ActionsView = ADF.Core.ActionsView.extend({
    childView: ADF.Forms.ActionView,       
    initialize: function( options ) {
        ADF.utils.message('log','Forms.ActionsView Initialized', options );
        this._super();
    }


});