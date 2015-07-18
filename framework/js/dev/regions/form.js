/*global
ADF,
_
*/
ADF.FormRegion = ADF.Region.extend({
    template: ADF.templates.formRegion,
    initialize: function( options ) {
        ADF.utils.message('log','FormRegion Initialized', options);
        if( this.$el.find('form').size() === 0 ){
            this.$el.html(this.template());
        }
        this._super( options );
    },

    show: function() {

        var formRegion = this;

        formRegion.actionsCollection = new ADF.ActionsCollection(null,{regionName: formRegion.options.regionName});
        formRegion.fieldsCollection = new ADF.FieldsCollection(null,{regionName: formRegion.options.regionName});

        formRegion.formView = new ADF.Forms.FormView({
            el:formRegion.$el.find('form')[0],
            regionName: formRegion.options.regionName
        });

        this._super();

    },

    ajaxSuccessHandler: function( xhrJson, settings ) {

        var formRegion = this;

        if( xhrJson.success === true ){

            if( xhrJson.data.hasOwnProperty('actions') ){

                if( settings.emptyCollections === false ){
                    formRegion.actionsCollection.add(xhrJson.data.actions);
                }else{
                    formRegion.actionsCollection.reset(xhrJson.data.actions);
                }

            }

            if( xhrJson.data.hasOwnProperty('fields') ){

                if( settings.emptyCollections === false ){
                    var options = settings.newModelIdx ? {at: settings.newModelIdx} : {};
                    formRegion.formView.formFields.collection.add(xhrJson.data.fields, options);
                }else{
                    formRegion.formView.formFields.collection.reset(xhrJson.data.fields);
                }

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