/*global
ADF,
Backbone,
$
*/
ADF.DropdownMenuView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.dropdownMenu,
    tagName: 'li',
    childViewContainer: '.dropdown-menu .primary-options',
    childViewOptions: function() {
        return { regionName: this.regionName };
    },
    events: {
        'click .dropdown-toggle'              : 'dropdownToggle'
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

        // adf.page.trigger('dropdownToggle:before');

        var $target = {};

        if( event.target ){

            event.preventDefault();
            $target = $(event.target);

        }else{      // we're just going to assume it's a jQuery object then

            $target = event;

        }

        var $ddMenu = $target.closest('.dropdown-wrapper').find('.dropdown-menu');

        if( $ddMenu.hasClass('hide') ){
            $ddMenu.removeClass('hide');
            this.$el.trigger('dropdownToggle:open');
        }else{
            $ddMenu.addClass('hide');
            this.$el.trigger('dropdownToggle:close');
        }

        // $target.closest('.dropdown-wrapper').find('.dropdown-menu').toggleClass('hide');

        // this.$el.trigger('dropdownToggle:after');

        // adf.page.trigger('dropdownToggle:after');

    }

});