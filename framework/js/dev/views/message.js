/*global
ADF,
Backbone
*/
ADF.MessageView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.message,
    events: {
        'click .message-remove'                        : 'messageRemove'
    },
    initialize: function( options ) {
        ADF.utils.message('log','MessageView Initialized', options);
        // TODO: handle the contentArray a bit differently to make URLs into links
        // TODO: handle the contentArray maybe having line number for a file
        this.model.set('content',ADF.utils.arrayToHTML( this.model.get('contentArray'), 'div', 'div' ) );
    },
    messageRemove: function(e) {
        e.preventDefault();
        // TODO: this should really be just this.$el but the silly Marionette default render wraps the tpl in extra div
        this.$el.find('.message').addClass('removed');
    }
});