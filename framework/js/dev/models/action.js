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
        this._convertDataAttrs();

    },
    _convertDataAttrs: function() {
        _.each(this.get('dataAttributes'),function(element, index){
            element.name = element.name.toLowerCase().replace(/[_-]/g, '-');
        });
    }    

});