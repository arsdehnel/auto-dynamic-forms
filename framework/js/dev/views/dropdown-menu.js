/*global
ADF,
Backbone,
$
*/
ADF.DropdownMenuView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.dropdownMenu,
    tagName: 'li',
    childViewContainer: '.dropdown-menu',
    childViewOptions: function() {
        return { regionName: this.regionName };
    },
    events: {
        'click .dropdown-toggle'     : 'dropdownToggle',
    },
    // TODO: seems like this model shouldn't be created in the view since that's a bit backwards
    // TODO: hide this when the user clicks off of it
    model: new ADF.DropdownMenuModel({
        buttonLabel: 'Menu Name',
        wrapClass: 'column-selector',
        footerOptions: []
    }),
    initialize: function( options ) {
        ADF.utils.message('debug','DropdownMenuView Initialized', options );
    },
    dropdownToggle: function( event ) {

        var $target = {};

        if( event.target ){

            event.preventDefault();
            $target = $(event.target);

        }else{      // we're just going to assume it's a jQuery object then

            $target = event;

        }

        $target.closest('.dropdown-wrapper').find('.dropdown-menu').toggleClass('hide');

    }

});