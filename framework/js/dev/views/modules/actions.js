/*global
ADF
*/
ADF.Modules.ActionsView = ADF.Core.ActionsView.extend({
    getChildView: function(model){
        var viewClass;
        switch( model.get('type') ){
            case 'saveUnsaved':
                viewClass = ADF.Actions.SaveUnsavedView;
                break;
            default:
                viewClass = ADF.Actions.ModuleDefaultView;
                break;
        }
        return viewClass;
    },
    childViewOptions : function () {
        return { 
            region: this.region,
            modulesView: this.modulesView            
        };
    },
    initialize: function( options ) {
        ADF.utils.message('log','Modules.ActionsView Initialized', options );
        this.region = options.region;
        this.modulesView = options.modulesView;
        this._super();
    }

});