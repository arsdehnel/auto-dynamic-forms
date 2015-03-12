/*global
ADF,
Backbone,
adf,
$
*/
// TODO: have module and record views share a common prototype
ADF.ModuleView = ADF.RecordView.extend({
    template: ADF.templates.module,
    childView: ADF.FieldView,
    childContainer: '.module-details',
    events: {
        'adf-module-drop'                       : 'drop',
        'adf-module-remove'                     : 'remove',
        'click .module-details-toggle'          : 'toggleDetails',
    },
    initialize: function( options ) {
        ADF.utils.message('log','ModuleView Initialized', options);

        // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.RecordView.prototype.events,this.events);

        this._super( options );

    },
    render: function() {

        // TODO: this is getting an extra DIV wrapper when rendering
        // TODO: see about getting this to live within the recordview render
        var fieldsString = '';

        var moduleView = this;

        this.collection.each(function(model){

            // model.set('currentValue',moduleView.model.get(model.get('name')));
            var childView = new moduleView.childView({model:model});
            fieldsString += childView.renderAsChild();

        },this);

        this.$el.html(this.template($.extend({},this.model.toJSON(),{fields:fieldsString})));
        return this;
    },
    toggleDetails: function(e) {
        e.preventDefault();
        this.$el.find('.module-details').toggleClass('hide');
    },
    drop: function(e, i){
        // console.log('moduled dropped',e,i);
        this.$el.trigger('adf-module-received',[this.model, i]);
    },
    remove: function(e, i){
        if( e && e.type === 'adf-module-remove' ){
            console.log('module remove',e,i);
            this.$el.trigger('adf-module-sent',[this.model, i]);
        }
    }

});