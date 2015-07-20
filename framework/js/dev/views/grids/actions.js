/*global
ADF,
adf,
_
*/
ADF.Grids.ActionsView = ADF.Core.DropdownView.extend({
    childView: ADF.Grids.ActionView,
    initialize: function( options ) {
        ADF.utils.message('log','Grids.ActionsView Initialized', options );
        this.regionName = options.regionName;

           // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.Core.DropdownView.prototype.events,this.events);

        this.model.set('buttonLabel','Actions');
        this.model.set('wrapClass','grid-actions');

    },
    rende2r: function() {

        if( this.collection.length === 0 ){

        }else{

        }

        // render the main bits
        this.$el.html(this.template(this.model.toJSON()));

        var gridActions = this;

        // normally would do variables up top but this requires the html() to be created already
        var childContainer = this.$el.find(this.childViewContainer);

        // put the children (the fields) into the drop down but above the divider
        this.collection.each(function(model){

            // TODO: move this to the model initializer
            model.set('regionName',gridActions.regionName);

            var childView = new gridActions.childView({regionName:gridActions.regionName,model:model});
            childContainer.append(childView.template(model.toJSON()));
            // console.log('#'+gridActions.regionName+'Action--'+model.id,model);
            childView.setElement('#'+gridActions.regionName+'Action--'+model.id);

        });

        var region = adf.page.getRegion(this.regionName);
        var gridView = region.gridView;
        gridView.uploadUrl = region.$el.find('.adf-grid-actions [data-action-type=upload]').attr('href');

        return this;
    }

});