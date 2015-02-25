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

    show: function( triggerRecordView, $triggerObj ) {
        ADF.utils.message('log','OverlayGridRegion Shown');

        var overlayRegion = this;
        var sourceRegion = adf.page.getRegion(triggerRecordView.regionName);
        var dataArray = [];
        var triggerBox = $triggerObj[0].getBoundingClientRect();
        var triggerData = $triggerObj.data();
        var triggerOffset = $triggerObj.offset();
        var dataFields = triggerData.adfAjaxDataFields.split(',');

        // TODO: check location of trigger field and possibly open up

        adf.page.showBackdrop();
        this.$el.addClass('open').css({top:( triggerOffset.top + triggerBox.height ) });
        this.options.adfAjaxUrl = triggerData.adfAjaxUrl;

        overlayRegion.options.dataFields = new ADF.FieldsCollection( sourceRegion.fieldsCollection.filter( function( field ){
            // console.log(field,_.indexOf( dataFields, field.get('name') ));
            return _.indexOf( dataFields, field.get('name') ) >= 0;
        }),{recordModelDefaults: triggerRecordView.model.toJSON()});

        // console.log(dataFieldsCollection);

        // dataArray = ADF.utils.dataSerialize( new Backbone.Collection( overlayRegion.options.dataFields ), triggerRecordView.model );
        dataArray = ADF.utils.dataSerialize( overlayRegion.options.dataFields, triggerRecordView.model );

        console.log(dataArray);

        overlayRegion.options.adfAjaxData = {adfSerializedData:JSON.stringify(dataArray)};

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