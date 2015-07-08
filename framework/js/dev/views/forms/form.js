/*global
ADF,
Marionette,
$,
adf,
_
*/
ADF.Forms.FormView = Marionette.ItemView.extend({
    template: ADF.templates.form,
    childView: ADF.FieldView,
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
                collection: new ADF.FieldsCollection(null,{regionName:formView.regionName}),
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
        ADF.utils.inputHandlerRefresh();

    },

    submitForm: function(e) {

        var formView = this;
        
        // check for any failing validations
        if( !this.$el.formValidate(ADF.config.get('validationSettings')) ){
            return false;
        }

        // check if it's a fancy select that the user just hit return which we should stop them from submitting
        if( e && this.$el.find(':focus').closest('.select-fancy-wrapper').size() > 0 ) {
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
            // do our little fancy bit to get the form data into our custom field
            this.$el.append(ADF.templates.inputTypeAdfSerializedData({data:dataArray}));

            // and then actually submit the form
            this.$el.submit();
        }

    },

    dependentFieldLkup: function(e) {

        var formView = this;
        var dataArray = [];
        var $triggerObj = $(e.target);
        var $inputWrapper = $triggerObj.closest('.adf-input-wrapper');
        var $parentRow = $triggerObj.closest('.form-row');
        var triggerData = $.extend({},$parentRow.data(),$inputWrapper.data(),$triggerObj.data());
        var target;
        var newModelIdx;
        var childFields = triggerData.adfDependentFieldLkupChildFields ? triggerData.adfDependentFieldLkupChildFields.split(',') : null;
        var region = adf.page[formView.options.regionName];

        e.preventDefault();
        ADF.utils.message('log','dependentFieldLkup',e);

        _.each(childFields,function( fieldName ){
            var modelToRemove = formView.formFields.collection.filter(function( model ){
                return model.get('name') === fieldName;
            });
            formView.formFields.collection.remove(modelToRemove);
            // $('#'+fieldName+'-field-wrap').remove();
        });
        dataArray = ADF.utils.dataSerializeNonADFData( formView.$el.find(':input:hidden').not('.adf-form-fields :input').serializeObject() );
        dataArray = dataArray.concat(ADF.utils.dataSerialize( formView.formFields.collection ));

        if( triggerData.fieldLkupTarget ){

            // figure out the location of the field we're after
            var fldMstrId = false;
            if( triggerData.fieldLkupTarget === 'next' ){
                fldMstrId = parseInt( $parentRow.attr('data-field-master-id'), 10 );
            }else{
                if( $('#'+triggerData.fieldLkupTarget+'-field-wrap').size() > 0 ){
                    fldMstrId = $('#'+triggerData.fieldLkupTarget+'-field-wrap').attr('data-field-master-id');
                }
            }

            if( fldMstrId ){
                var modelToFollow = formView.formFields.collection.find(function( model ){
                    return model.get('fldMstrId') === fldMstrId;
                });
                newModelIdx = formView.formFields.collection.indexOf(modelToFollow) + 1;
            }else{
                newModelIdx = false;
            }

            // check for the "next" keyword that just means to put it right after the field calling the lookup
            target = triggerData.fieldLkupTarget === 'next' ? 'next' : 'next';
            // TODO:somehow also remove any prefix/suffix for this field upon load of the new stuff
            // TODO:allow field to be dropped into the middle of a form rather than append to the form

            // $target = $parentRow;
        }

        region.ajax({
            data: {adfSerializedData:JSON.stringify(dataArray)},
            url: triggerData.adfDependentFieldLkupUrl,
            emptyCollections:false,
            newModelIdx: newModelIdx
        });

    }
});