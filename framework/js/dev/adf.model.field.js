ADF.FieldModel = Backbone.Model.extend({

    initialize: function( data ){
        ADF.utils.message('log','FieldModel Initialized', data);

        // do this step-by-step for clarity and maintainability (not to mention debuggability)
        var inputType = this.get('type');
        inputType = ADF.utils.camelize(inputType);
        inputType = ADF.utils.capitalize(inputType);
        inputType = 'inputType'+inputType;

        // this.set("inputField",ADF.templates[inputType](this.toJSON()));
        this.set("inputTemplate",ADF.templates[inputType]);

    }

});