/*global
ADF,
_
*/
ADF.Actions.SaveUnsavedView = ADF.Core.ActionView.extend({
    events: {
        'click'     : 'saveUnsaved'
    },
    initialize: function( options ){
        ADF.utils.message('log','Actions.SaveUnsavedView Initialized', options);
        if( options.gridView ){
            this.gridView = options.gridView;
            this.recordTarget = this.gridView.bodyView;
            this.template = ADF.templates.action;
        }else if( options.modulesView ){
            this.modulesView = options.modulesView;
            this.recordTarget = this.modulesView.moduleListView;
        }
    },
    saveUnsaved: function( e ) {

        e.preventDefault();

        var url;
        var recordParent;

        if( this.gridView ){
            recordParent = this.gridView.bodyView;
        }else{
            recordParent = this.modulesView.moduleListView;
        }

        recordParent.children.each(function(childView){
            if( childView.model.status !== 'current' && childView.model.status !== 'added' ){
                // TODO: seems like this would be cleaner if the save URL was set in the model or the actions were more easily retrievable or something
                url = _.findWhere(childView.collection.findWhere({type:'actions'}).get('actions'),{type:'save'}).url;
                childView.model.save(null,{fieldsCollection: childView.collection,url:url});
            }
        });

    }

});