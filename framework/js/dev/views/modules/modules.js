/*global
ADF,
Marionette,
adf,
$
*/
ADF.Modules.ModulesView = Marionette.View.extend({
    events: {
        'click .btn'                    : 'handleAction'
    },
    initialize: function( options ) {
        var modulesView = this;
        ADF.utils.message('log','ModulesView Initialized', options );
        modulesView.regionName = options.regionName;
        modulesView.region = adf.page.getRegion(modulesView.regionName);
        // this.setElement(this.$el.html(this.template()));

        modulesView.moduleListView = new ADF.Modules.ModuleListView({
            el: modulesView.$el.find('.module-list-wrapper')[0],
            collection: modulesView.region.recordsCollection,
            regionName: modulesView.regionName,
            dndSource: options.dndSource,
            dndTarget: options.dndTarget
        });  
        modulesView.moduleActionsView = new ADF.Modules.ActionsView({
            el: modulesView.$el.find('.module-actions-wrapper')[0],
            collection: modulesView.region.actionsCollection,
            regionName: modulesView.regionName
        });                
    },
    render: function() {
        var modulesView = this;
        modulesView.moduleListView.render();
        modulesView.moduleActionsView.render();
    },
    handleAction: function(e) {
        e.preventDefault();
        var modulesView = this;
        var $targetObj = $(e.target).closest('a');
        var actionType = $targetObj.attr('data-action-type');
        // TODO: experiment with making this dynamic
        switch( actionType ){
            case 'save':
                modulesView.moduleListView.collection.each(function( moduleModel ){
                    moduleModel.url = $targetObj.attr('href');
                    moduleModel.save(null,{fieldsCollection: modulesView.region.fieldsCollection});
                });
                break;
            default:
                ADF.utils.message('error','Unexpected record action ('+actionType+') triggered.',$targetObj);
        }
    }    

});