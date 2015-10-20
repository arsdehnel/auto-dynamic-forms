/*global
ADF,
Backbone,
_
*/
ADF.ActionModel = Backbone.Model.extend({

    idAttribute: 'pageDetailId',

    initialize: function( attrs, opts ){

        ADF.utils.message('log','ActionModel initialized', opts);
        this.set('id',this.id); // put this into the attributes so we can use it for rendering in the template to help with uniqueness
        this.set('type',ADF.utils.string.camelize(this.get('type')));
        this._convertDataAttrs();

    },
    _convertDataAttrs: function() {
        _.each(this.get('dataAttributes'),function(element, index){
            element.name = element.name.toLowerCase().replace(/[_-]/g, '-');
        });
    },
    _createDataAttrObj: function(){
        var returnObj = {};
        _.each(this.get('dataAttributes'),function(dataAttr){
            returnObj[ADF.utils.string.camelize(dataAttr.name)] = dataAttr.value;
        });
        return returnObj;
    }

});