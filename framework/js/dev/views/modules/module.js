/*global
ADF,
_
*/
ADF.Modules.ModuleView = ADF.Core.RecordView.extend({
    template: ADF.templates.modules.module,
    getChildView: function(model) {
        var viewClass;
        switch( model.get('type') ){
            case 'actions':
                viewClass = ADF.Inputs.ModuleActionsView;
                break;
            case 'selectFancy':
                viewClass = ADF.Inputs.SelectFancyView;
                break;
            case 'textarea':
                viewClass = ADF.Inputs.TextareaView;
                break;
            case 'widget':
                viewClass = ADF.Inputs.WidgetView;
                break;
            case 'gridOverlay':
                viewClass = ADF.Inputs.GridOverlayView;
                break;
            default:
                viewClass = ADF.Inputs.ModuleDefaultView;
                break;
        }
        return viewClass;
    },
    childViewOptions : function () {
        return {
            regionName: this.regionName,
            region: this.region,
            moduleView: this,
            template: ADF.templates.forms.row,
            tagName: 'td'
        };
    },
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
    onRender: function(){
        var moduleModel = this.model;
        var partAttrs = _.partition(moduleModel.changedAttributes(),function(attr){
            // console.log(_.indexOf(moduleModel.initAttrs,attr));
            return _.indexOf(moduleModel.initAttrs,attr) >= 0;
        });
        if( partAttrs[0].length > 0 ){
            this.$el.addClass('updated');
        }
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