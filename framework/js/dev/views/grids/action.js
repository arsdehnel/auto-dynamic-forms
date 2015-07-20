    /*global
ADF,
Backbone,
$,
adf
*/
ADF.Grids.ActionView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.dropdownLink,
    tagName: 'li',
    events: {
        'click' : 'handleClick'
    },
    initialize: function( options ){
        ADF.utils.message('log','GridActionView Initialized', options);
        this.region = adf.page.getRegion(options.regionName);
    },
    handleClick: function(e){

        var actionView = this;
        var $action = $(e.target);

        if( $action.data('action-type') ){

            e.preventDefault();

            var actionType = ADF.utils.string.camelize( $action.data('action-type') );

            if( !actionView[actionType] ){
                ADF.utils.message('error','action type not defined',actionType);
                return;
            }
            actionView[actionType]( $action );

        }else{
            return true;        //just let things go
            // ADF.utils.message('error','Better have a TA check into this.  The action you clicked on has no type indicated so not sure what to do with it.');
        }

    },

    gridRecordAdd: function( actionObj ) {

        var gridView = this.region.gridView;
        var actionData = actionObj.data();
        var defaultsObj = {};

        if( this.region.options && this.region.options.dataFields ){
            defaultsObj = this.region.options.dataFields.createRecordObject();
        }
        // console.log('grid data fields',this.region.options.dataFields, defaultsObj );

        ADF.utils.spin(this.region.$el);
        actionObj.closest('.dropdown-menu').addClass('hide');

        for( var i = 1; i <= actionData.recordCount; i++ ){
            gridView.bodyView.collection.add(defaultsObj,{ at: 0 });
        }

        gridView.render();
        ADF.utils.spin(this.region.$el, { stop: true } );

    }

});