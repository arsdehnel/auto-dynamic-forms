/*global
ADF,
adf
*/
ADF.MessagesWindowRegion = ADF.Region.extend({
    initialize: function( options ) {
        ADF.utils.message('log','MessageWindow Initialized', options);

        var messagesWindow = this;

        // this just means that we don't trigger the show() method on page load
        messagesWindow.inert = true;

        messagesWindow.messagesWindowView = new ADF.MessagesWindowView({
            el: messagesWindow.$el.find('.messages-wrapper')[0],
            collection: new ADF.MessagesCollection(),
            regionName: options.regionName
        });
        messagesWindow._super( options );

    },

    show: function( messageHeader, messageBody, messageFooter ) {
        ADF.utils.message('log','MessageWindow Shown');
        this.$el.addClass('show');
        this.messagesWindowView.render();
    },

    hide: function() {
        ADF.utils.message('log','MessageWindow Hidden');
        this.$el.empty().removeClass('open');
        adf.page.hideBackdrop();
    }

});