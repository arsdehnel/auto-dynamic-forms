/*global
ADF,
Backbone,
adf,
$
*/
// TODO: have module and record views share a common prototype
ADF.ModuleView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.module,
    childView: ADF.FieldView,
    childContainer: '.module-details',
    events: {
        'adf-module-drop'                       : 'drop',
        'adf-module-remove'                     : 'remove',
        'click .module-details-toggle'          : 'toggleDetails',
        'change :input'                         : 'inputChange',
        'click .btn'                            : 'handleAction'
    },
    initialize: function( options ) {
        ADF.utils.message('log','ModuleView Initialized', options);
        this.region = adf.page.getRegion(options.regionName);
        this.collection = this.region.fieldsCollection;
        // this.listenTo(this.model,'sync', this.moduleAction);
        // this.listenTo(this.model,'error',this.moduleAction);
        this.listenTo(this.model,'all',this.moduleAction);
    },
    render: function() {

        // TODO: this is getting an extra DIV wrapper when rendering
        var fieldsString = '';

        var moduleView = this;

        this.collection.each(function(model){

            model.set('currentValue',moduleView.model.get(model.get('name')));
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
    handleAction: function(e) {
        e.preventDefault();
        e.stopPropagation();        //since the parent ModulesView will likely have this same event listener
        var $targetObj = $(e.target).closest('a');
        var actionType = $targetObj.attr('data-action-type');
        // TODO: experiment with making this dynamic
        switch( actionType ){
            case 'save':
                this.model.url = $targetObj.attr('href');
                this.model.save(null,{});
                break;
            default:
                ADF.utils.message('error','Unexpected record action ('+actionType+') triggered.',$targetObj);
        }
    },
    inputChange: function( e ){

        // stopping the propagation for overlay changes so they don't change the master
        e.preventDefault();
        e.stopPropagation();

        var changed = e.currentTarget;
        var value = $(e.currentTarget).val();
        var obj = {};
        obj[changed.name] = value;

        this.model.set(obj);

        this.$el.removeClass('current').addClass('updated');

    },
    moduleAction: function( event, model, response, options ) {

        if( model.get('id') === 11115 ){
            // console.log(event,model.get('id'));
            // console.log(event,response,options);
        }

        console.log(event,response,options);

        switch( event ){
            case 'sync':
                if( options.xhr.status === 200 ){

                    ADF.utils.message('debug','Module action completed successfully',model,options.xhr.responseJSON,options);

                    if( options.xhr.responseJSON.success ){
                        this.$el.removeClass('updated new error').addClass('current');
                    }else{
                        this.$el.removeClass('updated new current').addClass('error');
                        ADF.utils.message('warn','Something went wrong in saving the module',model,options.xhr.responseJSON,options);
                    }

                }else{

                    this.$el.removeClass('updated new current').addClass('error');
                    ADF.utils.message('error','Something unexpected went wrong in saving the module',model,options.xhr.responseJSON,options);

                }
                break;

            default:
                ADF.utils.message('debug','Unhandled module event type',event,model,response,options);

        }

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