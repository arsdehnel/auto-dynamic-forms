/*global
ADF,
_
*/
ADF.GridRegion = ADF.Region.extend({
    template: ADF.templates.grids.region,
    initialize: function( options ) {

        ADF.utils.message('log','GridRegion Initialized', options);

        var gridRegion = this;

        if( gridRegion.$el.is('.adf-grid-overlay-editor, .adf-widget-editor') ){
            gridRegion.inOverlay = true;
        }else{
            gridRegion.inOverlay = false;
        }

        this.autoSave = gridRegion.$el.data('adf-auto-save') || false;

        // TODO: make this less clunky and crappy
        var $initLoadForm = gridRegion.$el.find('form').clone();

        var templateData = {inOverlay:gridRegion.inOverlay};
        templateData.regionLabel = ( gridRegion.$el.data('region-label') ? gridRegion.$el.data('region-label') : false );

        gridRegion.$el.html(gridRegion.template(templateData)).append($initLoadForm);
        gridRegion.fieldsCollection = new ADF.FieldsCollection(null,{regionName:gridRegion.options.regionName});
        gridRegion.actionsCollection = new ADF.ActionsCollection(null,{regionName: gridRegion.options.regionName});

        this._super( options );

    },

    show: function() {

        ADF.utils.message('log','gridRegion Shown');

        var gridRegion = this;
        gridRegion.gridView = new ADF.Grids.GridView({
            el:gridRegion.$el.find('.adf-grid-wrapper')[0],
            regionName: gridRegion.options.regionName
        });

        this._super();

    },

    ajaxSuccessHandler: function( xhrJson, settings ) {

        var gridRegion = this;

        if( xhrJson.success === true ){

            if( xhrJson.data.hasOwnProperty('fields') ){

                gridRegion.fieldsCollection.reset(xhrJson.data.fields);

            }

            if( xhrJson.data.hasOwnProperty('actions') ){

                if( settings.emptyCollections === false ){
                    gridRegion.actionsCollection.add(xhrJson.data.actions);
                }else{
                    gridRegion.actionsCollection.reset(xhrJson.data.actions);
                }

            }

            if( xhrJson.data.hasOwnProperty('records') ){

                gridRegion.gridView.bodyView.collection.reset(xhrJson.data.records);

            }
            
        }else{

            if( xhrJson.hasOwnProperty('errors') ){
                _.each(xhrJson.errors,function( element, index, array ){
                    ADF.utils.message('error',element);
                });
            }else{
                ADF.utils.message('error','Looks like the ajax response wasn\'t quite what was expected.  Probably need to get a TA involved to help figure it out.');
            }

        }

    }

});