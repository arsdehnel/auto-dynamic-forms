/*global
ADF,
*/
ADF.OverlayGridRegion = ADF.GridRegion.extend({
    initialize: function( options ) {
        ADF.utils.message('log','OverlayGridRegion Initialized', options);

        // this just means that we don't trigger the show() method on page load
        this.inert = true;

        this._super( options );
    },

    show: function( $triggerObj ) {
        ADF.utils.message('log','OverlayGridRegion Shown');
        var triggerBox = $triggerObj[0].getBoundingClientRect();
        var triggerOffset = $triggerObj.offset();

        // TODO: position relative to trigger field
        // TODO: check location of trigger field and possibly open up

        adf.page.showBackdrop();
        this.$el.addClass('open').css({top:( triggerOffset.top + triggerBox.height ) });
        this.options.adfAjaxUrl = $triggerObj.attr('data-adf-ajax-url');
        this._super();
    },

    hide: function() {
        ADF.utils.message('log','OverlayGridRegion Hidden');
        // TODO: empty the region
        // TODO: remove the ajax url

        if( this.$el.find('.changed') > 0 ){
            // TODO: make this a bit prettier
            alert('found records that have been changed and not saved');
        }

        this.$el.empty().removeClass('open');
        adf.page.hideBackdrop();

    }

});