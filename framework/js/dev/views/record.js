/*global
ADF,
Marionette,
adf,
$,
_
*/
ADF.RecordView = Marionette.CompositeView.extend({
    className: 'adf-record',
    events: {
        'change :input'                 : 'inputChange',
        'click .btn'                    : 'handleAction'
    },
    initialize: function( options ) {
        ADF.utils.message('debug','RecordView Initialized', options );
        this.region = adf.page.getRegion(options.regionName);
        this.regionName = this.region.options.regionName;
        this.model.set('regionName',this.regionName);
        this.collection = new ADF.FieldsCollection(this.region.fieldsCollection.toJSON());
        this.assignCollectionValuesFromModel(true);
        this.listenTo(this.model,'all', this.recordEvent);
    },
    renderSelf: function() {
        // this would be called when the record has changed and needs to be rerendered
        // TODO: make this actually work for both rendering on initial load (as child) and as standalone record (on change)
        this.render();
    },
    assignCollectionValuesFromModel: function( initialAssignment ) {
        // console.log('this model',this.model);
        this.collection.each(function(model){
            // console.log(model.get('name'),this.model.get(model.get('name')));
            if( initialAssignment ){
                model.set('regionName',this.regionName);
            }
            // only set the currentValue to the model's value if the model has a value
            // because otherwise the currentValue will still have the default values from the fieldsCollection
            if( this.model.get(model.get('name')) ){
                model.set('currentValue',this.model.get(model.get('name')));                
            }else{
                // now we see if there is a "default" value in the fieldsCollection and use that (if there is)
                if( model.get('currentValue') ){
                    console.log('no value provided in current model for '+model.get('name')+' so we are keeping the fieldsColleciton value of '+model.get('currentValue'));
                    this.model.set(model.get('name'),model.get('currentValue'));
                }
            }
        },this);
    },
    render: function() {

        var cellsString = '';

        var recordView = this;

        // put the children (the fields) into the drop down but above the divider
        this.collection.each(function(model){

            // TODO: move this to the model initializer
            // model.set('regionName',recordView.regionName);
            // model.set('currentValue',recordView.model.get(model.get('name')));
            var childView = new recordView.childView({model:model});
            // this.addChild(childView);
            // console.debug(childView.render());
            cellsString += childView.render();
            // this.addChild(childView);    

        },this);

        // return this.template($.extend({},this.model.toJSON(),{cells:cellsString}));
        this.$el.replaceWith(this.template($.extend({},this.model.toJSON(),{cells:cellsString})));
        this.setElement('#'+this.model.get('regionName') + '--' + this.model.get('id'));
        ADF.utils.select2.refresh();
    },
    renderAsChild: function() {

        var cellsString = '';

        var recordView = this;

        // put the children (the fields) into the drop down but above the divider
        this.collection.each(function(model){

            // TODO: move this to the model initializer
            // model.set('regionName',recordView.regionName);
            // model.set('currentValue',recordView.model.get(model.get('name')));
            var childView = new recordView.childView({model:model});
            // this.addChild(childView);
            // console.debug(childView.render());
            cellsString += childView.render();
            // this.addChild(childView);

        },this);

        return this.template($.extend({},this.model.toJSON(),{cells:cellsString}));
    },
    handleAction: function(e) {
        e.preventDefault();
        var recordView = this;
        var $targetObj = $(e.target).closest('a');
        var targetData = $targetObj.data();
        var actionType = $targetObj.attr('data-action-type');
        var regionObj = {};
        // TODO: experiment with making this dynamic
        switch( actionType ){
            case 'save':
                this.model.url = $targetObj.attr('href');
                this.model.save(null,{fieldsCollection: recordView.collection});
                break;
            case 'load-adf-region':
                $.extend(regionObj,targetData,{adfAjaxOnshow:true,adfAjaxUrl:$targetObj.attr('href')});
                if( !_.isUndefined( adf.page.getRegion(regionObj.regionName) ) ) {
                    adf.page.removeRegion(regionObj.regionName);
                }
                adf.page.addRegions( adf.page._buildRegion(regionObj,targetData.adfRegionId) );
                adf.page.getRegion(regionObj.regionName).show();
                break;
            default:
                ADF.utils.message('error','Unexpected record action ('+actionType+') triggered.',$targetObj);
        }
    },
    showOverlayEditor: function(e) {
        // TODO: find the actual cell that had this event and then trigger with that as the trigger object
        e.preventDefault();
        adf.page.getRegion('overlayEditor').show( this, $(e.target) );
    },
    inputChange: function( e ){

        // console.log('input change',model,options);

        // stopping the propagation for overlay changes so they don't change the master
        e.preventDefault();
        e.stopPropagation();

        var changed = e.currentTarget;
        var value = $(e.currentTarget).val();
        var obj = {};
        obj[changed.name] = value;

        this.model.set(obj);

        ADF.utils.message('debug','Record input change',obj,this.model);

        this.$el.removeClass('current').addClass('updated');

    },

    recordEvent: function( event, model, response, options ) {

        switch( event.indexOf(':') >= 0 ? event.substr(0,event.indexOf(':')) : event ){
            case 'change':
                break;
            case 'request':
                break;
            case 'sync':
                if( options.xhr.status === 200 ){

                    ADF.utils.message('debug','Record sync completed successfully',model,response,options);

                    if( response.success ){
                        this.assignCollectionValuesFromModel();
                        this.render();
                        // this.$el.removeClass('updated added error').addClass('current');
                    }else{
                        this.$el.removeClass('updated added current').addClass('error');
                        ADF.utils.message('error','Something went wrong in saving the record',model,response,options);
                    }

                }else{

                    this.$el.removeClass('updated added current').addClass('error');
                    ADF.utils.message('error','Something unexpected went wrong in saving the record',model,response,options);

                }
                break;

            default:
                ADF.utils.message('debug','Unexpected event from the record view',event, model, response, options);
                break;
        }


    }

});
