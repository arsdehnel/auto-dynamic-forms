/*global
ADF,
Marionette
*/
// TODO: add clear all option to remove all messages
ADF.Messages.WindowView = Marionette.CollectionView.extend({

    childView: ADF.Messages.MessageView,

    initialize: function( options ) {
        ADF.utils.message('log','MessagesWindowView Initialized', options );
    }

});