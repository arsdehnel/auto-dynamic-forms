/*global
ADF,
Backbone,
adf
*/
ADF.Messages.MessageView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.messages.message,
    events: {
        'click .message-remove'                        : 'messageRemove',
        'click .message-details'                       : 'showMessageInConsole'
    },
    initialize: function( options ) {
        // TODO: figure out a way for this view to use the message function without causing an infinite loop
        ADF.utils.message('log','MessageView Initialized', options);
        this.messageFormat();
    },
    onRender: function() {
        // TODO: make this actually work to allow the window to show as large (for warning and error) and the transition back to normal size
        this.$el.find('.message').removeClass('init-size');
    },
    messageRemove: function(e) {
        e.preventDefault();
        adf.page.getRegion('messagesWindow').messagesWindowView.collection.remove(this.model);
    },
    messageFormat: function() {
        if( this.model.get('originalArguments') && !this.model.get('content') ){
            // TODO: handle the originalArguments a bit differently to make URLs into links
            // TODO: handle the originalArguments maybe having line number for a file
            this.model.set('content',ADF.utils.arrayToHTML( this.model.get('originalArguments'), 'div', 'div' ) );
        }else{
            // console.log('do not parse the array',this.model.get('originalArguments'),this.model.get('content') );
        }
    },
    showMessageInConsole: function(e) {
        e.preventDefault();
        // console[this.model.get('level')](this.model.toJSON());
        console[this.model.get('level')](this.model.get('originalArguments'));

    }
});