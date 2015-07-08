/*global
ADF,
Marionette,
$
*/
ADF.Forms.FieldsView = Marionette.CollectionView.extend({
    template: ADF.templates.formRegion,
    childView: ADF.Forms.FieldView,
    initialize: function( options ) {
        ADF.utils.message('log','Forms.FieldsView Initialized', options );
        $.extend(this.options,options);
        // this.stopListening(this.collection,'add');
        this.listenTo(this.collection,'reset',this.render);
    },

    events: {
        // select handlers
        'change select[data-adf-submit-on-change=true]'                                       : 'submitParentForm',
        'change select[data-adf-dependent-field-lkup-on-change=true]'                         : 'dependentFieldLkup',

        // same handlers as above but now in the event that the UI has the data- attributes on a parent "wrapper" element rather than right on the select
        'change [data-adf-submit-on-change=true] select'                                      : 'submitParentForm',
        'change [data-adf-submit-on-change=true] .adf-form-input'                             : 'submitParentForm',
        'change [data-adf-dependent-field-lkup-on-change=true] .adf-form-input'               : 'dependentFieldLkup'

    },

    submitParentForm: function() {
        this.options.parentView.submitForm();
    },

    dependentFieldLkup: function(e) {
        e.stopPropagation();
        this.options.parentView.dependentFieldLkup(e);
    }
    
});