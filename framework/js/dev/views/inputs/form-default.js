/*global
ADF,
_
*/
ADF.Inputs.FormDefaultView = ADF.Core.InputView.extend({
    template: ADF.templates.formRow,
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ) {
        ADF.utils.message('log','Input.FormDefaultView Initialized', options);
        this._super();
    },
    onRender: function() {
        this.setElement(this.$el.find('.form-row').unwrap());
        this._super();
    }
});