/*global
ADF,
_,
$
*/
ADF.ModulesRegion = ADF.Region.extend({
    template: ADF.templates.moduleListWrapper,
    initialize: function( options ) {
        ADF.utils.message('log','ModulesRegion Initialized', options);
        var modulesRegion = this;
        modulesRegion.options = $.extend({},options,modulesRegion.$el.data());
        this._super( options );
    },

    show: function() {

        var modulesRegion = this;

        modulesRegion.$el.html(modulesRegion.template({
            dndSource:modulesRegion.options.adfDndSource,
            dndTarget:modulesRegion.options.adfDndTarget
        }));

        modulesRegion.fieldsCollection = new ADF.FieldsCollection(null,{regionName:modulesRegion.options.regionName});
        modulesRegion.actionsCollection = new ADF.ActionsCollection(null,{regionName: modulesRegion.options.regionName});

        modulesRegion.modulesView = new ADF.ModulesView({
            el:modulesRegion.$el.find('.module-list-wrapper')[0],
            collection: new ADF.RecordsCollection(),
            regionName: modulesRegion.options.regionName,
            dndSource: modulesRegion.options.adfDndSource,
            dndTarget: modulesRegion.options.adfDndTarget
        });

        this._super();

    },

    // TODO: commonize more of the ajax success handler code
    ajaxSuccessHandler: function( xhrJson, settings ) {

        var modulesRegion = this;
        var modulesView = modulesRegion.modulesView;

        if( xhrJson.success === true ){

            if( xhrJson.data.hasOwnProperty('actions') ){

                if( settings.emptyCollections === false ){
                    modulesRegion.actionsCollection.add(xhrJson.data.actions);
                }else{
                    modulesRegion.actionsCollection.reset(xhrJson.data.actions);
                }

            }

            if( xhrJson.data.hasOwnProperty('fields') ){

                if( settings.emptyCollections === false ){
                    modulesRegion.fieldsCollection.add(xhrJson.data.fields);
                }else{
                    modulesRegion.fieldsCollection.reset(xhrJson.data.fields);
                }

            }

            if( xhrJson.data.hasOwnProperty('records') ){

                if( settings.emptyCollections === false ){
                    modulesView.collection.add(xhrJson.data.records);
                }else{
                    modulesView.collection.reset(xhrJson.data.records);
                }

            }

            // manually call render for some reason
            // thought that Marionette handled this for us but it wasn't firing so this had to be added
            modulesView.render();

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