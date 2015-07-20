/*global
ADF,
Marionette,
$,
adf,
_
*/
ADF.Forms.FormView = Marionette.ItemView.extend({
    template: ADF.templates.form,
    initialize: function( options ) {
        ADF.utils.message('log','Form.FormView Initialized', options );
        $.extend(this.options,options);
        var formView = this;
        if( formView.$el.find('.adf-form-fields').size() === 0 ){
            // prepend here because there might be some data in the form as provided by the java application that we don't want to lose
            // but we want it to be at the end of the form just in case we have a situation where that input data takes up visual space
            formView.$el.prepend(formView.template());            
            formView.formFields = new ADF.Forms.FieldsView({
                el: formView.$el.find('.adf-form-fields')[0],
                collection: new ADF.FieldsCollection(null,{regionName:formView.options.regionName}),
                regionName: formView.options.regionName,
                parentView: formView
            });
            formView.formActions = new ADF.Forms.ActionsView({
                el: formView.$el.find('.adf-form-actions')[0],
                collection: adf.page.getRegion(formView.options.regionName).actionsCollection,
                regionName: formView.options.regionName,
                parentView: formView
            });
        }       
    },
    render: function() {

        var formView = this;
        formView.formFields.render();
        formView.formActions.render();
        // ADF.utils.inputHandlerRefresh();

    },

    submitForm: function( e, contextView ) {

        var formView = this;
        var contextModelDataAttrs = ( contextView && contextView.model && contextView.model._createDataAttrObj ? contextView.model._createDataAttrObj() : false );
        
        // check for any failing validations
        if( !this.$el.formValidate(ADF.config.get('validationSettings')) ){
            return false;
        }

        var action = this.$el.attr('action');
        var dataArray = ADF.utils.dataSerializeNonADFData( this.$el.find(':input').not('.form-input, .form-input *').serializeObject() );
        dataArray = dataArray.concat(ADF.utils.dataSerialize( formView.formFields.collection ));

        if( action.substring(0,1) === '#' ){

            if( $(action).size() > 0 ){

                ADF.utils.message('log','Found something to load into');
                adf.page.findRegion({attribute : 'el',value : action}).ajax({
                    data: {adfSerializedData:JSON.stringify(dataArray)},
                    method: 'POST'
                });

            }else{
                ADF.utils.message('error','Trying to load ajax but destination element could not be found on the page');
            }
        }else{

            if( contextModelDataAttrs && contextModelDataAttrs.adfSubmitType && contextModelDataAttrs.adfSubmitType.toLowerCase() === 'ajax' ){

                $.ajax({
                    url: this.el.action,
                    data: {adfSerializedData:JSON.stringify(dataArray)},
                    dataType: 'html',
                    complete: function( jqXhr, textStatus ){
                        ADF.utils.message('log','Submitted via ajax',contextView);
                    }
                });

            }else{

                // do our little fancy bit to get the form data into our custom field
                this.$el.append(ADF.templates.inputTypeAdfSerializedData({data:dataArray}));

                // and then actually submit the form
                this.$el.submit();

            }
        }

    },

    dependentFieldLkup: function( e, contextView ) {

        var formView = this;
        var contextModelDataAttrs = contextView.model._createDataAttrObj();
        var dataArray = [];
        var region = adf.page[formView.options.regionName];
        var newModelIdx;

        e.preventDefault();
        ADF.utils.message('log','dependentFieldLkup',e);

        if( contextModelDataAttrs.adfDependentFieldLkupChildFields ){

            _.each(contextModelDataAttrs.adfDependentFieldLkupChildFields.split(','),function( fieldName ){
                var modelToRemove = formView.formFields.collection.filter(function( model ){
                    return model.get('name') === fieldName.toLowerCase();
                });
                formView.formFields.collection.remove(modelToRemove);
                // $('#'+fieldName+'-field-wrap').remove();
            });

        }

        dataArray = ADF.utils.dataSerializeNonADFData( formView.$el.find(':input:hidden').not('.adf-form-fields :input').serializeObject() );
        dataArray = dataArray.concat(ADF.utils.dataSerialize( formView.formFields.collection ));

        if( contextModelDataAttrs.adfDependentFieldLkupTarget ){

            if( contextModelDataAttrs.adfDependentFieldLkupTarget.toLowerCase() === 'next' ){
                newModelIdx = this.formFields.collection.indexOf(contextView.model);
            }else{
                ADF.utils.message('error','The option to load dependent fields into a particular location is not currently supported',contextModelDataAttrs.adfDependentFieldLkupTarget.toLowerCase());
            }

        }else{
            newModelIdx = false;
        }

        region.ajax({
            data: {adfSerializedData:JSON.stringify(dataArray)},
            url: contextModelDataAttrs.adfDependentFieldLkupUrl,
            emptyCollections:false,
            newModelIdx: newModelIdx
        });

    }
});