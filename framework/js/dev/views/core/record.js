/*global
ADF,
Marionette,
adf,
$,
_
*/
ADF.Core.RecordView = Marionette.CompositeView.extend({
    // TODO: actions for a given record seem like they should be handled in their own views rather than as part of the recordview
    className: 'adf-record',
    events: {
        'change :input'                 : 'inputChange',
        'click .btn'                    : 'handleAction'
    },
    initialize: function( options ) {
        ADF.utils.message('log','RecordView Initialized', options );
        this.region = adf.page.getRegion(options.regionName);
        this.regionName = options.regionName;
        this.model.set('regionName',this.regionName);
        this.collection = new ADF.FieldsCollection(this.region.fieldsCollection.toJSON());
        this.assignCollectionValuesFromModel(true, false);
        this.listenTo(this.model,'all', this.recordEvent);
        this.modelHistory = [];
    },
    assignCollectionValuesFromModel: function( initialAssignment, force ) {
        this.collection.each(function(model){
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
                    this.model.set(model.get('name'),model.get('currentValue'));
                }
            }
        },this);
    },
    handleAction: function(e) {
        var recordView = this;
        var $targetObj = $(e.target).closest('a');
        var actionType = $targetObj.attr('data-action-type');
        // TODO: experiment with making this dynamic
        switch( actionType ){
            case 'link':
                return true;
            case 'clone':
                e.preventDefault();
                var clonedModel = this.model.clone();
                recordView.region.gridView.bodyView.collection.add(clonedModel,{at:recordView.region.gridView.bodyView.collection.indexOf(this.model)});
                break;
            case 'revert':
                e.preventDefault();
                this._updateStatus('current');
                this.model.set(this.model.previousAttributes());
                this.render();                
                // if( this.modelHistory && this.modelHistory.length > 0 ){
                //     // console.log(this.modelHistory,JSON.stringify(this.modelHistory.pop()));
                //     this._updateStatus('updated');
                //     this.model.clear({silent:true}).set(this.modelHistory.pop());
                //     // this.assignCollectionValuesFromModel( false, true );     
                //     // this.children.each(function(childView){childView.render()});
                // }else{
                //     this._showMessage('error','No more history exists for this record');
                // }
                break;
            default:
                if( this.actions[ADF.utils.string.camelize( actionType )] ){
                    this.actions[ADF.utils.string.camelize( actionType )](this,e);
                }else{
                    ADF.utils.message('error','Unexpected record action ('+actionType+') triggered.',$targetObj);
                }
        }
    },

    // these are the individual functions to handle each action type
    actions: {

        save: function(recordView,e) {
            if( e ) {
                e.preventDefault();
                recordView.model.url = $(e.target).closest('a').attr('href');
            }else{
                recordView.model.url = recordView.$el.find('[data-action-type=save]').first().attr('href');
            }
            recordView.model.save(null,{fieldsCollection: recordView.collection});           
        },

        submitRecordForm: function(recordView,e) {
            e.preventDefault();
            var action = $(e.target).closest('a').attr('href');

            // TODO: commonize this to share code with ADF.Forms.FormView.submitForm()
            var dataArray = ADF.utils.buildADFserializedArray( recordView.collection, null, null );
            var childRegions = $(e.currentTarget).data('child-regions') ? $(e.currentTarget).data('child-regions').split(/[\s,]+/) : false;

            if( action.substring(0,1) === '#' ){

                if( $(action).size() > 0 ){

                    ADF.utils.message('log','Found something to load into');
                    $(action).each(function(){

                        adf.page.getRegion(ADF.utils.string.camelize($(this).attr('id'))).ajax({
                            data: {adfSerializedData:JSON.stringify(dataArray)},
                            method: 'POST'
                        });

                    });

                    if( childRegions && childRegions.length > 0 ){

                        _.each(childRegions,function(childRegion){

                            adf.page.getRegion(ADF.utils.string.camelize(childRegion)).hide();

                        });

                    }

                }else{
                    ADF.utils.message('error','Trying to load ajax but destination element could not be found on the page');
                }
            }else{

                ADF.utils.message('error','Other submission methods not supported currently');

            }
        }
    },
    inputChange: function( e ){

        // console.log('input change',model,options);

        // stopping the propagation for overlay changes so they don't change the master
        e.preventDefault();
        e.stopPropagation();

        var changed = e.currentTarget;
        var value = $(e.currentTarget).val();

        this.modelHistory.push(this.model.toJSON());

        // since checkboxes always return their value attribute for the .val() function we have to handle them a little different to possibly explicitly set their value to null
        if( $(e.currentTarget).is(':checkbox') && !$(e.currentTarget).is(':checked') ){

            // since the majority of implementation (** within this framework and view **) are single Y/N checkboxes we'll do some slightly unusual value checks
            if( value === 'Y' ){    // meaning the "value" attribute is 'Y' but this one isn't checked
                value = 'N';        // set it explicitly to 'N'
            }else{                  // the "on" value isn't 'Y' so we just set it to null
                value = null;
            }

        }
        var obj = {};
        obj[changed.name] = value;

        this.model.set(obj);

        ADF.utils.message('log','Record input change',obj,this.model);

        this._updateStatus('updated');

        if( this.region.autoSave ){
            this.actions.save(this,false);
        }

    },

    _updateStatus: function( newStatus ) {
        this.model.status = newStatus;
        this.$el.removeClass('updated added current error').addClass(newStatus);
    },

    _updateFieldCollectionValues: function( changes ){
        var fieldModel;
        if( this.collection.models.length > 0 ){
            _.each(changes,function(fieldValue,fieldName){
                fieldModel = this.collection.findWhere({name:fieldName});
                if( fieldModel ){
                    fieldModel.set('currentValue',fieldValue);
                }
            },this);
        }
    },

    _renderChildren: function(){
        // marionette has this but since it's "private" we'll call it from our own function
        // just in case they drop it or change it in the future we can rewrite this and not have to change a bunch of places
        this._super();
    },

    _showMessage: function() {

        // TODO: improve this to not be so callback-hell-ish
        var $msgDiv = this.$el.find('.adf-record-messages');
        var args = Array.prototype.slice.call(arguments);

        // remove first argument
        var msgType = args.shift().toLowerCase();

        this._updateStatus(msgType);

        if( $msgDiv.size() > 0 ){
            var width = $msgDiv.html(args.join('<br>')).outerWidth();
            $msgDiv.css('width','0').show().animate({
                width: width
            },800,function(){
                setTimeout(function(){
                    $msgDiv.animate({
                        width: 0
                    },800,function(){
                        $msgDiv.hide().empty();
                    });
                },5000);
            });
        }else{
            ADF.utils.message.apply(arguments);
        }

    },

    recordEvent: function( event, model, response, options ) {

        switch( event.indexOf(':') >= 0 ? event.substr(0,event.indexOf(':')) : event ){
            case 'change':
                this._updateStatus('updated');
                this._updateFieldCollectionValues(model.changed);
                // this._renderChildren();
                break;
            case 'request':
                break;
            case 'sync':
                if( options.xhr.status === 200 ){

                    ADF.utils.message('log','Record sync completed successfully',model,response,options);

                    if( response.success ){
                        this.assignCollectionValuesFromModel( false, false );
                        // this._renderChildren();
                        // this.render();
                        this._updateStatus('current');
                    }else{
                        this._updateStatus('error');
                        if( response.errors.length > 0 ){
                            this._showMessage('error','Something went wrong in saving the record',response.errors.join(','),model,response,options);
                        }else{
                            this._showMessage('error','Something went wrong in saving the record',response.message,model,response,options);
                        }
                    }

                }else{

                    this._updateStatus('error');
                    ADF.utils.message('error','Something unexpected went wrong in saving the record',model,response,options);

                }
                break;
            case 'add':
                ADF.utils.message('info','Add event triggered for a record view');
                break;
            default:
                ADF.utils.message('error','Unexpected event from the record view',event, model, response, options);
                break;
        }


    }

});
