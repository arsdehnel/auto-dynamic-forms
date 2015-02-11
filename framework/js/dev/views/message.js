/*global
ADF,
Backbone
*/
ADF.MessageView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.message,
    events: {
        'click .message-remove'                        : 'messageRemove',
        'click .message-details'                       : 'showMessageInConsole'
    },
    initialize: function( options ) {
        // TODO: figure out a way for this view to use the message function without causing an infinite loop
        ADF.utils.message('log','MessageView Initialized', options);
        this.messageFormat();
    },
    messageRemove: function(e) {
        e.preventDefault();
        // TODO: this should really be just this.$el but the silly Marionette default render wraps the tpl in extra div
        this.$el.find('.message').addClass('removed');
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
    showMessageInConsole: function() {
        console[this.model.get('level')](this.model.toJSON());
    }
});