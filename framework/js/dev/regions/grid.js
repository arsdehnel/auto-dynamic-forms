/*global
ADF,
_,
adf
*/
ADF.GridRegion = ADF.Region.extend({
    template: ADF.templates.gridWrapper,
    initialize: function( options ) {
        ADF.utils.message('log','GridRegion Initialized', options);

        var gridRegion = this;

        if( gridRegion.$el.hasClass('adf-grid-overlay-editor') ){
            gridRegion.inOverlay = true;
        }else{
            gridRegion.inOverlay = false;
        }

        gridRegion.$el.html(gridRegion.template({inOverlay:gridRegion.inOverlay}));
        gridRegion.fieldsCollection = new ADF.FieldsCollection(null,{regionName:gridRegion.options.regionName});

        this._super( options );

    },

    show: function() {

        ADF.utils.message('log','gridRegion Shown');

        var gridRegion = this;
        gridRegion.gridView = new ADF.GridView({
            el:gridRegion.$el.find('.adf-grid-wrapper')[0],
            collection: new ADF.RecordsCollection(null,{regionName:gridRegion.options.regionName}),
            regionName: gridRegion.options.regionName
        });

        this._super();

    },

    ajaxSuccessHandler: function( xhrJson ) {

        var gridRegion = this;

        if( xhrJson.success === true ){

            if( xhrJson.data.hasOwnProperty('fields') ){

                gridRegion.fieldsCollection.reset(xhrJson.data.fields);

            }

            if( xhrJson.data.hasOwnProperty('records') ){

                gridRegion.gridView.collection.reset(xhrJson.data.records);

                // TODO: add select2 renderer as part of the auto-rendering of the Marionette view

                // manually call render for some reason
                // thought that Marionette handled this for us but it wasn't firing so this had to be added
                gridRegion.gridView.render();

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