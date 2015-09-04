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
        this.dataCollection = new Backbone.Collection(fieldModel.get('data'));
        this.region = adf.page.getRegion(this.options.regionName);

        this.set('type',ADF.utils.string.camelize(this.get('type')));

        this._convertDataAttrs();
        this._readonlyOverride();

        if( attrs.name.toLowerCase() !== attrs.name ){
            fieldModel.set('name',attrs.name.toLowerCase());
        }

        this._setInputTypeTemplate();

    },

    _updateCrntValFromDataCollection: function() {
        // TODO: should dataAttributes be "converted" on initialization to live on the model itself (not as attribute) and be a BB collection?
        var delimiterObj = _.findWhere(this.get('dataAttributes'),{name:'input-delimiter'});
        var delimiter = ( delimiterObj ? delimiterObj.value : '|' );

        var crntVal = this.dataCollection.where({selectedInd:'Y'}).map(function(dataItem){
            return dataItem.get('value'); 
        });
        this.set('currentValue',crntVal.join(delimiter));
    },

    getDataAttrVal: function( dataAttr ) {
        var dataAttrObj = _.findWhere(this.get('dataAttributes'),{name:dataAttr});
        if( dataAttrObj ){
            return dataAttrObj.value;
        }else{
            return false;
        }
    },

    _setInputTypeTemplate: function() {
        // do this step-by-step for clarity and maintainability (not to mention debuggability)
        if( this.get('type') === 'select' && _.where(this.get('dataAttributes'),{name:'select-fancy',value:true},this).length > 0 ){
            this.set('type','selectFancy');
        }
        // inputType = ADF.utils.string.camelize(inputType);
        // inputType = ADF.utils.string.capitalize(inputType);
        if( ADF.templates.inputTypes[this.get('type')] ){
            this.set('inputTemplate',ADF.templates.inputTypes[this.get('type')]);
        }else{
            ADF.utils.message('error','unexpected template requested: '+this.get('type'),this);
        }
    },
    _convertDataAttrs: function() {
        _.each(this.get('dataAttributes'),function(element, index){
            element.name = element.name.toLowerCase().replace(/[_-]/g, '-');
            if( element.value === 'TRUE' || element.value === 'true' ){
                element.value = true;
            }
            if( element.value === 'FALSE' || element.value === 'false' ){
                element.value = false;
            }
        });
    },
    _readonlyOverride: function() {
        var fieldModel = this;
        if( fieldModel.region && fieldModel.region.$el.data('readonly-override') ){
            switch( fieldModel.get('type') ){
                case 'text':
                case 'textarea':
                case 'date':
                case 'number':
                    fieldModel.set('type','readonly');
                    break;
                case 'select':
                case 'radio':
                case 'checkboxes':
                    // TODO: change this to use the dataCollection
                    // console.log(fieldModel.get('type').toLowerCase(),_.map(_.where(fieldModel.get('data'),{selectedInd:'Y'}),function(model){return model.label}).join(', '),fieldModel.get('currentValue'));
                    fieldModel.set('currentValue',_.map(_.where(fieldModel.get('data'),{selectedInd:'Y'}),function(model){return model.label;}).join(', '));
                    fieldModel.set('type','readonly');
                    break;
                case 'hidden':
                case 'readonly':
                    break;
                case 'actions':
                    fieldModel.set('wrapClass',fieldModel.get('wrapClass')+' hide');
                    break;
                default:
                    ADF.utils.message('error','Unxpected field type for readonly override: '+fieldModel.get('type'));
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