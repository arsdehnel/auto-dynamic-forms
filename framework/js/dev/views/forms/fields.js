/*global
ADF,
Marionette,
$
*/
ADF.Forms.FieldsView = Marionette.CollectionView.extend({
    template: ADF.templates.formRegion,
    getChildView: function(model) {
        var viewClass;
        switch( model.get('type').toLowerCase() ){
            case 'select-fancy':
                viewClass = ADF.Inputs.SelectFancyView;
                break;
            default:
                viewClass = ADF.Forms.FieldView;
                break;
        }
        return viewClass;
    },
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