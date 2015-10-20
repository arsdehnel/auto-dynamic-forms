/*global
ADF
*/
ADF.Forms.ActionView = ADF.Core.ActionView.extend({
    initialize: function( options ){
        ADF.utils.message('log','Forms.ActionView initialized', options );
        this._super();
    }

});