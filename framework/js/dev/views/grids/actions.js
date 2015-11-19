/*global
ADF,
Marionette
*/
ADF.Grids.ActionsView = Marionette.CollectionView.extend({
    getChildView: function(model){
        var viewClass;
        switch( model.get('type') ){
            case 'custom':
                viewClass = ADF.Actions.CustomView;
                break;
            case 'linkToAdfSubmission':
                viewClass = ADF.Actions.LinkToAdfSubmissionView;
                break;
            case 'recordAdd':
                viewClass = ADF.Actions.RecordAddView;
                break;
            case 'saveUnsaved':
                viewClass = ADF.Actions.SaveUnsavedView;
                break;
            default:
                viewClass = ADF.Actions.GridDefaultView;
                break;
        }
        return viewClass;
    },
    childViewOptions : function () {
        return { 
            region: this.region,
            gridView: this.gridView
        };
    },
    initialize: function( options ) {
        ADF.utils.message('log','Grids.ActionsView Initialized', options );
        // this.regionName = options.regionName;
        this.region = options.region;
        this.gridView = options.gridView;
        this.model.set('buttonLabel','Actions');
        this.model.set('wrapClass','grid-actions');
    }

});