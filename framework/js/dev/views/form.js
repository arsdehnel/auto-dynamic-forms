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

        // rendering the 'actions' for a given form
        // start by getting the region since that is where the actions are kept
        var region = adf.page[formView.options.regionName];

        // see if we have any actions because if we don't we can stop right away
        if( region.actionsCollection.length > 0 ){
            formView.$el.append(ADF.templates.formRow({
                name: 'ACTIONS',
                fldMstrId: 0
            }));

            var childContainer = formView.$el.find('#ACTIONS-field-wrap .form-input');

            region.actionsCollection.each( function( action ) {
                var childView = new ADF.FormActionView({model:action});
                childContainer.append(childView.render());
            });

        }

        ADF.utils.select2.refresh();

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
        var dataObj = {};

        if( action.substring(0,1) === '#' ){

            if( $(action).size() > 0 ){

                ADF.utils.message('log','Found something to load into');
                e.preventDefault();

                console.log();

                region.ajax({
                    data: JSON.stringify($form.serializeObject()),
                    method: 'POST'
                });

            }else{
                ADF.utils.message('error','Trying to load ajax but destination element could not be found on the page');
            }
        }else{
            // TODO: just let the form submit
            // $form.append(ADF.templates.adfDataJson(ADF.utils.dataSerialize($form)));
            formView.collection.each(function( model ) {
                dataObj[model.get('fldMstrId')] = {
                    fldMstrId : model.get('fldMstrId'),
                    name : model.get('name'),
                    value : model.get('currentValue')
                };
            });
            $form.append(ADF.templates.inputTypeAdfSerializedData({data:dataObj}));
            return true;
        }

    },

    dependentFieldLkup: function(e) {

        var formView = this;
        var dataObj = {};
        var $triggerObj = $(e.target);
        var $inputWrapper = $triggerObj.closest('.adf-input-wrapper');
        var $parentRow = $triggerObj.closest('.form-row');
        // var $form = $parentRow.closest('form');
        var triggerData = $.extend({},$parentRow.data(),$inputWrapper.data(),$triggerObj.data());
        var $target = $('#'+triggerData.fieldLkupTarget+'-field-wrap');
        var childFields = triggerData.adfDependentFieldLkupChildFields ? triggerData.adfDependentFieldLkupChildFields.split(',') : null;
        var region = adf.page[formView.options.regionName];

        e.preventDefault();
        ADF.utils.message('log','dependentFieldLkup',e);

        _.each(childFields,function( fieldName ){
            var modelToRemove = formView.collection.filter(function( model ){
                return model.get('name') === fieldName;
            });
            formView.collection.remove(modelToRemove);
            $('#'+fieldName+'-field-wrap').remove();
        });

        formView.collection.each(function( model ) {
            dataObj[model.get('fldMstrId')] = model.get('currentValue');
        });

        if( $target.size() === 0 ){
            // TODO:somehow also remove any prefix/suffix for this field upon load of the new stuff
            // TODO:allow field to be dropped into the middle of a form rather than append to the form

            $target = $parentRow;
        }else{
            $target.remove();
            $target = $parentRow;
        }

        region.ajax({
            data: dataObj,
            url: triggerData.adfDependentFieldLkupUrl,
            emptyCollections:false
        });

    }
});