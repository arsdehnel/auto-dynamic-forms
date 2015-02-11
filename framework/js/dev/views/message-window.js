/*global
ADF,
Marionette
*/
ADF.MessageWindowView = Marionette.CollectionView.extend({

    childView: ADF.MessageView,

    initialize: function( options ) {
        ADF.utils.message('log','MessageWindowView Initialized', options );
    }

});