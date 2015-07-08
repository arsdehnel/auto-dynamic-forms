/*global
ADF,
Backbone,
$
*/
ADF.Core.DropdownView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.dropdownMenu,
    tagName: 'li',
    childViewContainer: '.dropdown-menu .primary-options',
    childViewOptions: function() {
        return { regionName: this.regionName };
    },
    events: {
        'click    .dropdown-toggle'              : 'dropdownToggle',
        'mouseout .dropdown-menu'                : 'dropdownToggle'
    },
    // TODO: seems like this model shouldn't be created in the view since that's a bit backwards
    initialize: function( options ) {
        ADF.utils.message('log','DropdownMenuView Initialized', options );
    },
    dropdownToggle: function( event ) {

        // adf.page.trigger('dropdownToggle:before');

        var $target = {};

        if( event.target ){

            var to = event.relatedTarget || event.toElement;
            var $relatedTarget = $(to);

            event.preventDefault();
            $target = $(event.target);

            if( event.type === 'mouseout' && $relatedTarget.closest('.dropdown-wrapper').size() > 0 ){
                return false;
            }

        }else{      // we're just going to assume it's a jQuery object then

            $target = event;

        }

        var $ddMenu = $target.closest('.dropdown-wrapper').find('.dropdown-menu');

        if( $ddMenu.hasClass('hide') ){
            $ddMenu.removeClass('hide').addClass('show');
            this.$el.trigger('dropdownToggle:open');
        }else{
            $ddMenu.addClass('hide').removeClass('show');
            this.$el.trigger('dropdownToggle:close');
        }

        // $target.closest('.dropdown-wrapper').find('.dropdown-menu').toggleClass('hide');

        // this.$el.trigger('dropdownToggle:after');

        // adf.page.trigger('dropdownToggle:after');

    }

});