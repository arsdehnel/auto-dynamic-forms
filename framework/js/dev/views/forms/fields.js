/*global
ADF,
Marionette,
$
*/
ADF.Forms.FieldsView = Marionette.CollectionView.extend({
    template: ADF.templates.formRegion,
    childView: ADF.Forms.FieldView,
    childViewOptions : function () {
        return { regionName: this.options.regionName };
    },     
    initialize: function( options ) {
        ADF.utils.message('log','Forms.FieldsView Initialized', options );
        $.extend(this.options,options);
        // this.stopListening(this.collection,'add');
        this.listenTo(this.collection,'reset',this.render);
    }
    
});