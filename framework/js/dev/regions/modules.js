/*global
ADF,
_,
$
*/
ADF.ModulesRegion = ADF.Region.extend({
    template: ADF.templates.modulesWrapper,
    initialize: function( options ) {

        ADF.utils.message('log','ModulesRegion Initialized', options);

        var modulesRegion = this;

        modulesRegion.options = $.extend({},options,modulesRegion.$el.data());

        modulesRegion.$el.html(modulesRegion.template({
            dndSource:modulesRegion.options.adfDndSource,
            dndTarget:modulesRegion.options.adfDndTarget
        }));

        modulesRegion.fieldsCollection = new ADF.FieldsCollection(null,{regionName:modulesRegion.options.regionName});
        modulesRegion.actionsCollection = new ADF.ActionsCollection(null,{regionName: modulesRegion.options.regionName});       
        modulesRegion.recordsCollection = new ADF.RecordsCollection(null,{regionName: modulesRegion.options.regionName});       

        this._super( options );

    },

    show: function() {

        var modulesRegion = this;

        modulesRegion.modulesView = new ADF.Modules.ModulesView({
            el:modulesRegion.$el.find('.modules-wrapper')[0], 
            regionName: modulesRegion.options.regionName,
            dndSource: modulesRegion.options.adfDndSource,
            dndTarget: modulesRegion.options.adfDndTarget
        });

        this._super();

    },

    // TODO: commonize more of the ajax success handler code
    ajaxSuccessHandler: function( xhrJson, settings ) {

        var modulesRegion = this;
        var ajaxData = {};
        var defaultObj = {};

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
                    modulesRegion.recordsCollection.add(xhrJson.data.records);
                }else{
                    modulesRegion.recordsCollection.reset(xhrJson.data.records);
                }

            }

            if( settings.data && settings.data.adfSerializedData ){
                ajaxData = JSON.parse(settings.data.adfSerializedData);            

                _.each(modulesRegion.fieldsCollection.models,function( fieldModel ){
                    defaultObj = _.find(ajaxData,function(adfRecord){
                        return adfRecord.field_code === fieldModel.get('name');
                    });
                    if( !_.isUndefined( defaultObj ) ){
                        fieldModel.set('currentValue',defaultObj.data_value);
                    }
                },this);
            }

            // manually call render for some reason
            // thought that Marionette handled this for us but it wasn't firing so this had to be added
            modulesRegion.modulesView.render();

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