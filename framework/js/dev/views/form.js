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

        // button handlers
        'click .btn-submit'                                                 : 'submitParentForm',
        'click .btn-query'                                                  : 'submitParentForm',

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

    submitForm: function( e ) {

        var $form = $(e.target);
        var action = $form.attr('action');
        var region = adf.page.findRegion({
            attribute : 'el',
            value : action
        });

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
            return true;
        }

    },

    dependentFieldLkup: function(e) {

        var formView = this;
        var dataObj = {};
        var $parentRow = $(e.target).closest('.form-row');
        // var $form = $parentRow.closest('form');
        var parentData = $parentRow.data();
        var $target = $('#'+parentData.fieldLkupTarget+'-field-wrap');
        var childFields = parentData.adfDependentFieldLkupChildFields ? parentData.adfDependentFieldLkupChildFields.split(',') : null;
        var region = adf.page[formView.options.regionName];

        e.preventDefault();
        ADF.utils.message('log','dependentFieldLkup',e);

        formView.collection.each(function( model ) {
            dataObj[model.get('fldMstrId')] = model.get('currentValue');
        });

        _.each(childFields,function( fieldName ){
            var modelToRemove = formView.collection.filter(function( model ){
                return model.get('name') === fieldName;
            });
            formView.collection.remove(modelToRemove);
            $('#'+fieldName+'-field-wrap').remove();
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
            data: JSON.stringify(dataObj),
            url: parentData.adfDependentFieldLkupUrl,
            emptyCollections:false
        });

    }
});