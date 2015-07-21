/*global
ADF,
_
*/
// TODO: have module and record views share a common prototype
ADF.Modules.ModuleView = ADF.Core.RecordView.extend({
    template: ADF.templates.module,
    childView: ADF.Core.FieldView,
    childViewContainer: '.module-details',
    events: {
        'adf-module-drop'                       : 'drop',
        'adf-module-remove'                     : 'remove',
        'click .module-details-toggle'          : 'toggleDetails',
    },
    initialize: function( options ) {
        ADF.utils.message('log','ModuleView Initialized', options);

        // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.Core.RecordView.prototype.events,this.events);

        this.listenTo(this.model,'change:read_order',function(){
            console.log('probably should change some status or some shit');
        });

        this._super( options );

    },
    toggleDetails: function(e) {
        e.preventDefault();
        this.$el.find('.icon-expand, .icon-contract, .module-details').toggleClass('hide');
    },
    drop: function(e, i){
        ADF.utils.message('log','moduled dropped',e,i);
        this.$el.trigger('adf-module-received',[this.model, i]);
    },
    remove: function(e, i){
        if( e && e.type === 'adf-module-remove' ){
            ADF.utils.message('log','module remove',e,i);
            this.$el.trigger('adf-module-sent',[this.model, i]);
        }
    }

});