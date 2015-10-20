/*global
ADF,
adf,
_
*/
ADF.WidgetEditorRegion = ADF.GridRegion.extend({
    initialize: function( options ) {
        ADF.utils.message('log','WidgetGridRegion Initialized', options);

        // this just means that we don't trigger the show() method on page load
        this.inert = true;

        this._super( options );
    },

    show: function( triggerCellView ) {
        ADF.utils.message('info','WidgetGridRegion Shown',triggerCellView);

        var widgetEditorRegion = this;
        this.sourceRegion = triggerCellView.region;
        var dataArray = [];

        var triggerBox = triggerCellView.el.getBoundingClientRect();
        var triggerData = triggerCellView.model._createDataAttrObj();
        if( triggerData.dataFields ){
            var dataFields = triggerData.dataFields.toLowerCase().split(',');
        }else{
            ADF.utils.message.call(this,'error','This widget editor has no data fields setup and at least one is required for the widget lookup to know what data to retrieve.');
            return;
        }        

        // // TODO: check location of trigger field and possibly open up or left or something
        // // TODO: highlight current cell/record
        adf.page.showBackdrop('widget');
        this.$el.addClass('open').css({
            top: ( triggerBox.top + ( triggerBox.height / 2 ) ),
            left: ( triggerBox.right + 90 )
        });
        this.options.adfAjaxUrl = triggerData.ajaxUrl;

        widgetEditorRegion.options.dataFields = new ADF.FieldsCollection( this.sourceRegion.fieldsCollection.filter( function( field ){
            return _.indexOf( dataFields, field.get('name') ) >= 0;
        }),{recordModelDefaults: triggerCellView._parent.model.toJSON()});

        dataArray = ADF.utils.buildADFserializedArray( widgetEditorRegion.options.dataFields, null, triggerCellView._parent.model );

        widgetEditorRegion.options.adfAjaxData = {adfSerializedData:JSON.stringify(dataArray)};

        this._super();
    },

    hide: function() {
        ADF.utils.message('log','WidgetGridRegion Hidden');
        var gridView = this.gridView;

        if( this.$el.find('.changed') > 0 ){
            // TODO: make this a bit prettier
            ADF.utils.message('warn','found records that have been changed and not saved');
        }
        adf.page.hideBackdrop('widget');

        this.$el.removeClass('open');

        gridView.$el.html(gridView.template({}));

    }

});