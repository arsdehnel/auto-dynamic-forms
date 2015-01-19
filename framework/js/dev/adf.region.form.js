ADF.FormRegion = ADF.Region.extend({
    initialize: function( options ) {

        var formRegion = this;

        console.log('[ADF] FormRegion Initialized', options);

        formRegion.formView = new ADF.FormView({
            el:formRegion.$el.find('form')[0],
            collection: new ADF.FieldsCollection(),
            childView: ADF.FieldView
        })

        ADF.Region.prototype.initialize.call(formRegion, options);

    },

    ajaxSuccessHandler: function( xhrJson ) {

        var formView = this.formView;

        if( xhrJson.success === true ){

            if( xhrJson.data.hasOwnProperty('fields') ){

                formView.collection.add(xhrJson.data.fields);
                // manually call render for some reason
                // thought that Marionette handled this for us but it wasn't firing so this had to be added
                formView.render();

            }

        }else{

            if( xhrJson.hasOwnProperty('errors') ){
                _.each(xhrJson.errors,function( element, index, array ){
                    alert(element);
                })
            }else{
                alert("Looks like the ajax response wasn't quite what was expected.  Probably need to get a TA involved to help figure it out.");
            }

        }

    }

});