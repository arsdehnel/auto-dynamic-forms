/*global
ADF,
_
*/
ADF.Actions.SaveUnsavedView = ADF.Actions.GridDefaultView.extend({
    events: {
        'click  a'     : 'saveUnsaved'
    },
    initialize: function( options ){
        ADF.utils.message('log','Actions.SaveUnsavedView Initialized', options);
        this.gridView = options.gridView;
    },
    saveUnsaved: function( e ) {

        e.preventDefault();

        var url;

        this.gridView.bodyView.children.each(function(childView){
            if( childView.model.status !== 'current' && childView.model.status !== 'added' ){
                // TODO: seems like this would be cleaner if the save URL was set in the model or the actions were more easily retrievable or something
                url = _.findWhere(childView.collection.findWhere({type:'actions'}).get('actions'),{type:'save'}).url;
                childView.model.save(null,{fieldsCollection: childView.collection,url:url});
            }
        });

    }

});