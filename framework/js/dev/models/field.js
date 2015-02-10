/*global
ADF,
Backbone
*/
ADF.FieldModel = Backbone.Model.extend({

    initialize: function( attrs, opts  ){
        ADF.utils.message('log','FieldModel Initialized', attrs, opts);
        var fieldModel = this;

        if( attrs.name.toLowerCase() !== attrs.name ){
            fieldModel.set('name',attrs.name.toLowerCase());
        }

        // do this step-by-step for clarity and maintainability (not to mention debuggability)
        var inputType = fieldModel.get('type');
        inputType = ADF.utils.camelize(inputType);
        inputType = ADF.utils.capitalize(inputType);
        inputType = 'inputType'+inputType;

        // this.set('inputField',ADF.templates[inputType](this.toJSON()));
        fieldModel.set('inputTemplate',ADF.templates[inputType]);

    }

});