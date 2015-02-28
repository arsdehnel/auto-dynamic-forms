/*global
ADF,
_
*/
ADF.FormRegion = ADF.Region.extend({
    // TODO: handle being in a dialog
    // TODO: preexisting data handled
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

        formRegion.formView = new ADF.FormView({
            el:formRegion.$el.find('form')[0],
            collection: new ADF.FieldsCollection(),
            regionName: formRegion.options.regionName
        });

        formRegion.actionsCollection = new ADF.ActionsCollection(null,{regionName: formRegion.options.regionName});

        this._super();

    },

    ajaxSuccessHandler: function( xhrJson, settings ) {

        var formRegion = this;
        var formView = formRegion.formView;

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
                    formView.collection.add(xhrJson.data.fields);
                }else{
                    formView.collection.reset(xhrJson.data.fields);
                }


                // TODO: add select2 renderer as part of the auto-rendering of the Marionette view

                // manually call render for some reason
                // thought that Marionette handled this for us but it wasn't firing so this had to be added
                formView.render();

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