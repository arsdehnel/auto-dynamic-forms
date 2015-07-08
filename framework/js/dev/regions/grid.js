/*global
ADF,
_
*/
ADF.GridRegion = ADF.Region.extend({
    template: ADF.templates.gridRegion,
    initialize: function( options ) {

        ADF.utils.message('log','GridRegion Initialized', options);

        var gridRegion = this;

        if( gridRegion.$el.hasClass('adf-grid-overlay-editor') ){
            gridRegion.inOverlay = true;
        }else{
            gridRegion.inOverlay = false;
        }

        // TODO: make this less clunky and crappy
        var $initLoadForm = gridRegion.$el.find('form').clone();

        gridRegion.$el.html(gridRegion.template({inOverlay:gridRegion.inOverlay})).append($initLoadForm);
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

                // manually call render for some reason
                // thought that Marionette handled this for us but it wasn't firing so this had to be added
                // gridRegion.gridView.render();

            }


        }else{

            if( xhrJson.hasOwnProperty('errors') ){
                _.each(xhrJson.errors,function( element, index, array ){
                    alert(element);
                });
            }else{
                alert('Looks like the ajax response wasn\'t quite what was expected.  Probably need to get a TA involved to help figure it out.');
            }

        }

    }

});