/*global
ADF
*/
ADF.Forms.FieldView = ADF.Core.FieldView.extend({
    template: ADF.templates.formRow,
    initialize: function( options ) {
        ADF.utils.message('log','Forms.FieldView Initialized', options);
        this._super();
    }
});