/*global
ADF,
Backbone,
_,
$
*/
ADF.FieldsCollection = Backbone.Collection.extend({

    model: ADF.FieldModel,

    initialize: function( models, options ){
        ADF.utils.message('log','FieldsCollection Initialized', models, options);

        this.options = $.extend({},options);

        // iterate through the options.recordModelDefaults and create a new record model defaults object
        // with the values from that incoming object
        if( options && options.recordModelDefaults ){
            this.options.recordModelDefaults = {};
            _.each(models,function( model ){
                this.options.recordModelDefaults[model.get('name')] = options.recordModelDefaults[model.get('name')];
            },this);
            ADF.utils.message('log','fields collection recordModelDefaults',this.options.recordModelDefaults);
        }

    },

    createRecordObject: function() {

        // this is used to take a field collection and using the model attributes 'name' and 'currentValue' create an object of "defaults"
        var dataObj = {};
        _.each(this.models, function( model ){
            if( this.options && this.options.recordModelDefaults ){
                dataObj[model.get('name')] = this.options.recordModelDefaults[model.get('name')];
            }else{
                dataObj[model.get('name')] = model.get('currentValue');
            }
        },this);

        return dataObj;

    }

});