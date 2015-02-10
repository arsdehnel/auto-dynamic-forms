/*global
ADF,
adf
*/
ADF.ModalRegion = ADF.Region.extend({
    initialize: function( options ) {
        ADF.utils.message('log','ModalRegion Initialized', options);

        // this just means that we don't trigger the show() method on page load
        this.inert = true;

        this._super( options );
    },

    show: function( modalHeader, modalBody, modalFooter ) {
        // TODO: populate modal with the incoming content
        // TODO: handle the modal already being open for error things and appending to it
        // TODO: have a way to know if it's a similar message (all errors, etc) and group them
        // TODO: tabs for more than one message?
        ADF.utils.message('log','ModalRegion Shown');
        adf.page.showBackdrop();
        this.$el.addClass('open');
    },

    hide: function() {
        ADF.utils.message('log','ModalRegion Hidden');
        // TODO: empty the region
        // TODO: remove the ajax url

        this.$el.empty().removeClass('open');
        adf.page.hideBackdrop();

    }

});