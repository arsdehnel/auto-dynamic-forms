/*global
ADF,
adf,
_
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
        var triggerData = $triggerObj.data();
        var triggerOffset = $triggerObj.offset();

        // TODO: position relative to trigger field
        // TODO: check location of trigger field and possibly open up

        adf.page.showBackdrop();
        this.$el.addClass('open').css({top:( triggerOffset.top + triggerBox.height ) });
        this.options.adfAjaxUrl = triggerData.adfAjaxUrl;
        this.options.adfAjaxData = {};
        _.each(triggerData.adfAjaxDataFields.split(','), function( fieldName ){
            // TODO: get this from the backbone model rather than the DOM
            this.options.adfAjaxData[fieldName] = $triggerObj.closest('tr').find(':input[name='+fieldName+']').val();
        },this);
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