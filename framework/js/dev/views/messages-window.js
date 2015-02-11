/*global
ADF,
Marionette
*/
ADF.MessagesWindowView = Marionette.CollectionView.extend({

    childView: ADF.MessageView,

    initialize: function( options ) {
        ADF.utils.message('log','MessagesWindowView Initialized', options );
    }

});