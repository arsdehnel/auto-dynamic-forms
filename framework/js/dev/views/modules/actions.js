/*global
ADF
*/
ADF.Modules.ActionsView = ADF.Core.ActionsView.extend({
    childView: ADF.Modules.ActionView,
    childViewOptions : function () {
        return { region: this.region };
    },
    initialize: function( options ) {
        ADF.utils.message('log','Modules.ActionsView Initialized', options );
        this.region = options.region;
        this._super();
    }

});