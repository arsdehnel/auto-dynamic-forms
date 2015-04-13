/*global
ADF,
Marionette,
$,
adf,
_
*/
ADF.FormView = Marionette.CollectionView.extend({

    childView: ADF.FieldView,

    initialize: function( options ) {
        ADF.utils.message('log','FormView Initialized', options );
        $.extend(this.options,options);
        // this.options
    },

    events: {
        // select handlers
        'change select[data-adf-submit-on-change=true]'                     : 'submitParentForm',
        'change select[data-adf-dependent-field-lkup-on-change=true]'       : 'dependentFieldLkup',

        // same handlers as above but now in the event that the UI has the data- attributes on a parent "wrapper" element rather than right on the select
        'change [data-adf-submit-on-change=true] select'                    : 'submitParentForm',
        'change [data-adf-dependent-field-lkup-on-change=true] select'      : 'dependentFieldLkup',
        'change [data-adf-dependent-field-lkup-on-change=true] :checkbox'   : 'dependentFieldLkup',
        'change [data-adf-dependent-field-lkup-on-change=true] :radio'      : 'dependentFieldLkup',

        // button handlers
        'click .btn-submit'                                                 : 'submitParentForm',
        'click .btn-query'                                                  : 'submitParentForm',
        'click .btn-submit-custom-url'                                      : 'submitCustomUrl',

        // form submission
        'submit'                                                            : 'submitForm'
    },

    render: function() {

        // the normal render
        var formView = this;
        formView._super();
        var $childContainer = formView.$el.find('#ACTIONS-field-wrap .form-input');

        // rendering the 'actions' for a given form
        // start by getting the region since that is where the actions are kept
        var region = adf.page[formView.options.regionName];

        // see if we have any actions because if we don't we can stop right away
        if( region.actionsCollection.length > 0 ){
            $childContainer.remove();
            formView.$el.append(ADF.templates.formRow({
                name: 'ACTIONS',
                fldMstrId: 0
            }));
            $childContainer = formView.$el.find('#ACTIONS-field-wrap .form-input');

            region.actionsCollection.each( function( action ) {
                var childView = new ADF.FormActionView({model:action});
                $childContainer.append(childView.render());
            });

        }

        ADF.utils.inputHandlerRefresh();

    },

    submitParentForm: function( e ) {

        e.preventDefault();
        $(e.target).closest('form').submit();

    },

    submitCustomUrl: function( e ) {

        e.preventDefault();
        var $triggerObj = $(e.target).closest('.btn');
        $triggerObj.closest('form').attr('action',$triggerObj.attr('href')).submit();

    },

    submitForm: function( e ) {

        var formView = this;
        var $form = $(e.target);
        var action = $form.attr('action');
        var region = adf.page.findRegion({
            attribute : 'el',
            value : action
        });
        var dataArray = ADF.utils.dataSerialize( formView.collection );

        if( action.substring(0,1) === '#' ){

            if( $(action).size() > 0 ){

                ADF.utils.message('log','Found something to load into');
                e.preventDefault();

                region.ajax({
                    data: {adfSerializedData:JSON.stringify(dataArray)},
                    method: 'POST'
                });

            }else{
                ADF.utils.message('error','Trying to load ajax but destination element could not be found on the page');
            }
        }else{
            // do our little fancy bit to get the form data into our custom field
            $form.append(ADF.templates.inputTypeAdfSerializedData({data:dataArray}));

            // and then let the form submit
            return true;
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
            var modelToRemove = formView.collection.filter(function( model ){
                return model.get('name') === fieldName;
            });
            formView.collection.remove(modelToRemove);
            // $('#'+fieldName+'-field-wrap').remove();
        });

        dataArray = ADF.utils.dataSerialize( formView.collection );

        if( triggerData.fieldLkupTarget ){

            // figure out the location of the field we're after
            var fldMstrId = false;
            if( triggerData.fieldLkupTarget === 'next' ){
                fldMstrId = $parentRow.attr('data-field-master-id');
            }else{
                if( $('#'+triggerData.fieldLkupTarget+'-field-wrap').size() > 0 ){
                    fldMstrId = $('#'+triggerData.fieldLkupTarget+'-field-wrap').attr('data-field-master-id');
                }
            }

            if( fldMstrId ){
                var modelToFollow = formView.collection.find(function( model ){
                    return model.get('fldMstrId') === fldMstrId;
                });
                newModelIdx = formView.collection.indexOf(modelToFollow) + 1;
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