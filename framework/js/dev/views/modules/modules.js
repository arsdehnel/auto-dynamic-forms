/*global
ADF,
Marionette,
adf
*/
ADF.Modules.ModulesView = Marionette.View.extend({
    initialize: function( options ) {
        var modulesView = this;
        ADF.utils.message('log','ModulesView Initialized', options );
        modulesView.regionName = options.regionName;
        modulesView.region = adf.page.getRegion(modulesView.regionName);
        // this.setElement(this.$el.html(this.template()));

        modulesView.moduleListView = new ADF.Modules.ModuleListView({
            el: modulesView.$el.find('.module-list-wrapper')[0],
            collection: new ADF.RecordsCollection(null,{regionName:modulesView.regionName}),
            regionName: modulesView.regionName,
            modulesView: modulesView,
            dndSource: options.dndSource,
            dndTarget: options.dndTarget
        });
        modulesView.moduleActionsView = new ADF.Modules.ActionsView({
            el: modulesView.$el.find('.module-actions-wrapper')[0],
            collection: modulesView.region.actionsCollection,
            modulesView: modulesView,
            region: modulesView.region
        });
        modulesView.columnSelect = new ADF.Core.ColumnSelectView({
            el: modulesView.$el.find('.adf-column-select')[0],
            model: new ADF.DropdownMenuModel({footerOptions: []}),
            collection: this.region.fieldsCollection,
            region: modulesView.region
        });        
    },
    render: function() {
        var modulesView = this;
        modulesView.moduleListView.render();
        modulesView.moduleActionsView.render();
        modulesView.columnSelect.render();
    }

});