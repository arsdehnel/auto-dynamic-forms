/*global
ADF,
Backbone,
$
*/
ADF.Core.DropdownView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.dropdowns.menu,
    tagName: 'li',
    childViewContainer: '.dropdown-menu .primary-options',
    childViewOptions: function() {
        return { regionName: this.regionName };
    },
    events: {
        'click    .dropdown-toggle'              : 'dropdownToggle',
        'mouseout .dropdown-menu'                : 'dropdownToggle'
    },
    initialize: function( options ) {
        ADF.utils.message('log','DropdownMenuView Initialized', options );
    },
    dropdownToggle: function( event ) {

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

        if( this.$el.find('.dropdown-menu').hasClass('hide') ){
            this.open();
        }else{
            this.close();
        }

    },
    open: function(){
        this.$el.find('.dropdown-menu').removeClass('hide').addClass('show');
        this.$el.trigger('dropdownToggle:open');
    },
    close: function() {
        this.$el.find('.dropdown-menu').addClass('hide').removeClass('show');
        this.$el.trigger('dropdownToggle:close');
    }

});