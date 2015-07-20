/*global
ADF,
Backbone,
adf,
$,
_
*/
ADF.FieldModel = Backbone.Model.extend({

    initialize: function( attrs, opts  ){
        ADF.utils.message('log','FieldModel Initialized', attrs, opts);
        this.options = $.extend({},( opts.collection ? opts.collection.options : ''),opts);
        var fieldModel = this;
        this.set({actionsNew: []});
        this.dataCollection = new Backbone.Collection(fieldModel.get('data'));
        this.region = adf.page.getRegion(this.options.regionName);

        this._convertDataAttrs();
        this._readonlyOverride();

        // if( this.get('fieldPriority') === 0 ){
        //     this.set('checkedInd','Y');
        // }else{
        //     this.set('checkedInd','N');
        // }

        if( attrs.name.toLowerCase() !== attrs.name ){
            fieldModel.set('name',attrs.name.toLowerCase());
        }

        this._setInputTypeTemplate();

    },

    _setInputTypeTemplate: function() {
        // do this step-by-step for clarity and maintainability (not to mention debuggability)
        var inputType = this.get('type');
        if( inputType.toLowerCase() === 'select' && _.where(this.get('dataAttributes'),{name:'select-fancy',value:'true'},this).length > 0 ){
            this.set('type','select-fancy');
            inputType = 'select-fancy';
        }
        inputType = ADF.utils.string.camelize(inputType);
        inputType = ADF.utils.string.capitalize(inputType);
        inputType = 'inputType'+inputType;
        if( ADF.templates[inputType] ){
            this.set('inputTemplate',ADF.templates[inputType]);
        }else{
            ADF.utils.message('error','unexpected template requested: '+inputType,this);
        }
    },
    _convertDataAttrs: function() {
        _.each(this.get('dataAttributes'),function(element, index){
            element.name = element.name.toLowerCase().replace(/[_-]/g, '-');
        });
    },
    _readonlyOverride: function() {
        var fieldModel = this;
        if( fieldModel.region && fieldModel.region.$el.data('readonly-override') ){
            switch( fieldModel.get('type').toLowerCase() ){
                case 'text':
                case 'date':
                case 'number':
                    fieldModel.set('type','readonly');
                    break;
                case 'select':
                case 'radio':
                case 'checkboxes':
                    // console.log(fieldModel.get('type').toLowerCase(),_.map(_.where(fieldModel.get('data'),{selectedInd:'Y'}),function(model){return model.label}).join(', '),fieldModel.get('currentValue'));
                    fieldModel.set('currentValue',_.map(_.where(fieldModel.get('data'),{selectedInd:'Y'}),function(model){return model.label}).join(', '));
                    fieldModel.set('type','readonly');
                    break;
                case 'hidden':
                case 'readonly':
                    break;
                case 'actions':
                    fieldModel.set('wrapClass',fieldModel.get('wrapClass')+' hide');
                    break;
                default:
                    ADF.utils.message('error','Unxpected field type for readonly override: '+fieldModel.get('type').toLowerCase());
                    break;
            }
        }        
    },
    _createDataAttrObj: function(){
        var returnObj = {};
        _.each(this.get('dataAttributes'),function(dataAttr){
            returnObj[ADF.utils.string.camelize(dataAttr.name)] = dataAttr.value;
        }); 
        return returnObj;
    }

});