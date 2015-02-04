/*global
ADF,
_
*/
ADF.FormRegion = ADF.Region.extend({
    // TODO: handle being in a dialog
    // TODO: preexisting data handled

    initialize: function( options ) {
        ADF.utils.message('log','FormRegion Initialized', options);
        this._super( options );
    },

    show: function() {

        var formRegion = this;

        formRegion.formView = new ADF.FormView({
            el:formRegion.$el.find('form')[0],
            collection: new ADF.FieldsCollection(),
            regionName: formRegion.options.regionName
        });

        formRegion.actionsCollection = new ADF.ActionsCollection(null,{
            regionName: formRegion.options.regionName,
            model: ADF.ActionModel
        });
        console.log('after show initialization',formRegion.actionsCollection);

        this._super();

    },

    ajaxSuccessHandler: function( xhrJson ) {

        var formRegion = this;
        var formView = formRegion.formView;

        if( xhrJson.success === true ){

            if( xhrJson.data.hasOwnProperty('actions') ){

                formRegion.actionsCollection.reset(xhrJson.data.actions);
                console.log('after ajax reset',formRegion.actionsCollection);

            }

            if( xhrJson.data.hasOwnProperty('fields') ){

                formView.collection.reset(xhrJson.data.fields);

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