/*global
ADF,
_
*/
ADF.Inputs.ModuleDefaultView = ADF.Core.InputView.extend({
    template: ADF.templates.forms.row,
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ) {
        ADF.utils.message('log','Input.ModuleDefaultView Initialized', options);
        this._super();
    }
});