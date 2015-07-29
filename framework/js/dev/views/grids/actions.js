/*global
ADF
*/
ADF.Grids.ActionsView = ADF.Core.DropdownView.extend({
    getChildView: function(model){
        var viewClass;
        switch( model.get('type').toLowerCase() ){
            case 'record-add':
                viewClass = ADF.Actions.RecordAddView;
                break;
            case 'save-unsaved':
                viewClass = ADF.Actions.SaveUnsavedView;
                break;
            default:
                viewClass = ADF.Actions.GridDefaultView;
                break;
        }
        return viewClass;
    },
    childViewOptions : function () {
        return { gridView: this.gridView };
    },
    initialize: function( options ) {
        ADF.utils.message('log','Grids.ActionsView Initialized', options );
        // this.regionName = options.regionName;
        this.gridView = options.gridView;
        this.model.set('buttonLabel','Actions');
        this.model.set('wrapClass','grid-actions');

    },
    onRender: function() {
        if( this.collection.length === 0 ){
            this.close();
        }
    }

});