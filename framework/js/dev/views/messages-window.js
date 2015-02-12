/*global
ADF,
Marionette
*/
// TODO: add clear all option to remove all messages
ADF.MessagesWindowView = Marionette.CollectionView.extend({

    childView: ADF.MessageView,

    initialize: function( options ) {
        ADF.utils.message('log','MessagesWindowView Initialized', options );
    }

});