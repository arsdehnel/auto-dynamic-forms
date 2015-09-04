/*global
ADF,
Marionette,
$
*/
ADF.Forms.FieldsView = Marionette.CollectionView.extend({
    template: ADF.templates.forms.region,
    getChildView: function(model) {
        var viewClass;
        switch( model.get('type') ){
            case 'selectFancy':
                viewClass = ADF.Inputs.SelectFancyView;
                break;
            case 'checkboxes':
                viewClass = ADF.Inputs.CheckboxesView;
                break;
            default:
                viewClass = ADF.Inputs.FormDefaultView;
                break;
        }
        return viewClass;
    },
    childViewOptions : function () {
        return {
            regionName: this.options.regionName,
            region: this.region,
            template: ADF.templates.forms.row
        };
    },
    initialize: function( options ) {
        ADF.utils.message('log','Forms.FieldsView Initialized', options );
        $.extend(this.options,options);
        // this.stopListening(this.collection,'add');
        this.listenTo(this.collection,'reset',this.render);
    }

});