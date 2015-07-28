/*global
ADF,
_
*/
ADF.Forms.FieldView = ADF.Core.FieldView.extend({
    template: ADF.templates.formRow,
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ) {
        ADF.utils.message('log','Forms.FieldView Initialized', options);
        this._super();
    },
    onRender: function() {
        this.setElement(this.$el.find('.form-row').unwrap());
        this._super();
    }
});