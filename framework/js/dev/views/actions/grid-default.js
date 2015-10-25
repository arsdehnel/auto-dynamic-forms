    /*global
ADF,
Backbone,
$,
adf
*/
ADF.Actions.GridDefaultView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.action,
    tagName: 'li',
    events: {
        'click' : 'handleClick'
    },
    initialize: function( options ){
        ADF.utils.message('log','GridActionView Initialized', options);
        this.region = adf.page.getRegion(options.regionName);
    },
    onRender: function() {
        this.setElement(this.$el.children().unwrap());
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

    }

});