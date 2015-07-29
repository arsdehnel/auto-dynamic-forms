/*global
ADF,
Marionette,
adf,
$,
_
*/
ADF.Core.RecordView = Marionette.CompositeView.extend({
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
        this.assignCollectionValuesFromModel(true);
        this.listenTo(this.model,'all', this.recordEvent);
        this.status = 'current';
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
                    // console.log('no value provided in current model for '+model.get('name')+' so we are keeping the fieldsColleciton value of '+model.get('currentValue'));
                    this.model.set(model.get('name'),model.get('currentValue'));
                }
            }
        },this);
    },
    handleAction: function(e) {
        var recordView = this;
        var $targetObj = $(e.target).closest('a');
        var targetData = $targetObj.data();
        var actionType = $targetObj.attr('data-action-type');
        var regionObj = {};
        // TODO: experiment with making this dynamic
        switch( actionType ){
            case 'save':
                e.preventDefault();
                this.model.url = $targetObj.attr('href');
                this.model.save(null,{fieldsCollection: recordView.collection});
                break;
            case 'load-adf-region':
                e.preventDefault();
                $.extend(regionObj,targetData,{adfAjaxOnshow:true,adfAjaxUrl:$targetObj.attr('href')});
                if( !_.isUndefined( adf.page.getRegion(regionObj.regionName) ) ) {
                    adf.page.removeRegion(regionObj.regionName);
                }
                adf.page.addRegions( adf.page._buildRegion(regionObj,targetData.adfRegionId) );
                adf.page.getRegion(regionObj.regionName).show();
                break;
            case 'link':
                // TODO: replacing this at time of click seems really crappy and should be done in the model or view rendering but that just wasn't working when there were multiple records in a grid
                $targetObj.attr('href',this.stringSubstitute( $targetObj.attr('href'), this.model ));
                return true;
            case 'clone':
                var clonedModel = this.model.clone();
                delete clonedModel.id;
                console.log(clonedModel);
                recordView.region.gridView.bodyView.collection.add(clonedModel,{at:recordView.region.gridView.bodyView.collection.indexOf(this.model)});
                break;
            case 'revert':
                this._updateStatus('current');
                this.model.set(this.model.previousAttributes());
                this.render();
                break;
            default:
                ADF.utils.message('error','Unexpected record action ('+actionType+') triggered.',$targetObj);
        }
    },
    stringSubstitute: function( inputString, dataModel ){
        ADF.utils.message('error','stringSubstitute called within the record view');
        var tokenArray = inputString.split('##');
        var returnString = tokenArray[0];
        // var tokenModel = {};
        for( var i = 1; i < tokenArray.length; i++ ){
            if( i % 2 === 1 ){
                if( dataModel.get(tokenArray[i].toLowerCase()) ){
                    returnString += dataModel.get(tokenArray[i].toLowerCase());
                }
            }else{
                returnString += tokenArray[i];
            }
        }
        return returnString;
    },
    inputChange: function( e ){

        // console.log('input change',model,options);

        // stopping the propagation for overlay changes so they don't change the master
        e.preventDefault();
        e.stopPropagation();

        var changed = e.currentTarget;
        var value = $(e.currentTarget).val();

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

    },

    _updateStatus: function( newStatus ) {
        this.status = newStatus;
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
            ADF.utils.message(args);
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
                        this.assignCollectionValuesFromModel();
                        // this._renderChildren();
                        this.render();
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
