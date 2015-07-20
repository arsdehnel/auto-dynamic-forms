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

    show: function( triggerCellView ) {
        ADF.utils.message('info','OverlayGridRegion Shown',triggerCellView);

        var overlayRegion = this;
        var sourceRegion = adf.page.getRegion(triggerCellView.options.regionName);
        var dataArray = [];
        var triggerBox = triggerCellView._parent.el.getBoundingClientRect();
        var triggerData = triggerCellView.model._createDataAttrObj();
        var triggerOffset = triggerCellView._parent.$el.offset();
        var dataFields = triggerData.adfAjaxDataFields.split(',');

        // TODO: check location of trigger field and possibly open up
        // TODO: highlight current record
        adf.page.showBackdrop();
        this.$el.addClass('open').css({top:( triggerOffset.top + triggerBox.height ) });
        this.options.adfAjaxUrl = triggerData.adfAjaxUrl;

        overlayRegion.options.dataFields = new ADF.FieldsCollection( sourceRegion.fieldsCollection.filter( function( field ){
            return _.indexOf( dataFields, field.get('name') ) >= 0;
        }),{recordModelDefaults: triggerCellView._parent.model.toJSON()});

        dataArray = ADF.utils.dataSerialize( overlayRegion.options.dataFields, triggerCellView._parent.model );

        overlayRegion.options.adfAjaxData = {adfSerializedData:JSON.stringify(dataArray)};

        this._super();
    },

    hide: function() {
        ADF.utils.message('log','OverlayGridRegion Hidden');
        var gridView = this.gridView;
        // TODO: empty the region
        // TODO: remove the ajax url

        if( this.$el.find('.changed') > 0 ){
            // TODO: make this a bit prettier
            ADF.utils.message('warn','found records that have been changed and not saved');
        }

        this.$el.removeClass('open');

        gridView.$el.html(gridView.template({}));
        adf.page.hideBackdrop();

    }

});