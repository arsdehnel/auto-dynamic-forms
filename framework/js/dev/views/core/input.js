/*global
ADF,
Backbone,
$,
adf,
_
*/
ADF.Core.InputView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.forms.row,
    parentEvents: {
        'change'                                  : 'fieldChange'
    },
    events: function() {
        return this.parentEvents;
    },
    initialize: function( options ) {
        ADF.utils.message('log','Core.InputView Initialized', options);
        this.listenTo(this.model,'set',this.valueChange);
        if( !_.isUndefined( this.model.get('inputTemplate') ) ){
            this.model.set('inputField',this.model.get('inputTemplate')(this.model.toJSON()));
        }else{
            ADF.utils.message('error','Attempting to assign inputField attribute to undefined template',this.model);
        }
        this.region = options ? options.region : false;
    },
    onRender: function(){
        this.setElement(this.$el.children().unwrap());
        ADF.utils.inputHandlerRefresh( this.$el );

        if( adf.debugEnabled ){
            ADF.utils.prepareDebug( this.$el );
        }
    },
    fieldChange: function(e){

        // suppress 'change' events for the input box for select fancy inputs
        if( this.model.get('type') === 'selectFancy' && $(e.target).is('input:visible') ){
            return false;
        }

        var dataAttrs = this.model.get('dataAttributes');

        this.valueChange(e);
        this._submitOnChange(e, this.model.dataAttributes.submitOnChange );
        this._dependentFieldLkup( e, this.model.dataAttributes.dpndntFieldLkupOnChange );
        this._customEvents(e,this.model.dataAttributes.onChangeEventTrigger )

    },
    _submitOnChange: function( event, dataAttrVal ){
        if( dataAttrVal ){
            adf.page.getRegion(this.options.regionName).formView.submitForm( event, this );
        }
    },
    _dependentFieldLkup: function( event, dataAttrVal ){
        if( dataAttrVal ){
            adf.page.getRegion(this.options.regionName).formView.dependentFieldLkup( event, this );
        }
    },
    _customEvents: function( event, dataAttrVal ) {
        if( dataAttrVal ){
            this.$el.trigger(ADF.utils.string.camelize(dataAttrVal),event);
        }
    },
    valueChange: function(e) {

        var fieldView = this;
        var $target  = $(e.target);

        if( fieldView.model.dataCollection && ( $target.is(':checkbox') || $target.is(':radio') ) ){
            var currentValue = [];
            var $formRow = $target.closest('.form-row');
            var $delimiterEl = $formRow.find('*[data-input-delimiter]');
            var delimiter = $delimiterEl.size() > 0 ? $delimiterEl.attr('data-input-delimiter') : '|';
            var crntVal;
            var $crntInput;
            $formRow.find(':input:checkbox, :input:radio').each(function(){
                $crntInput = $(this);
                crntVal = $crntInput.val();
                if( $crntInput.is(':checked') ){
                    currentValue.push(crntVal);
                    fieldView.model.dataCollection.findWhere({value:crntVal}).set('selectedInd','Y');
                }else{
                    if( currentValue.indexOf(crntVal) >=0 ){
                        currentValue.splice(currentValue.indexOf(crntVal),1);
                    }
                    fieldView.model.dataCollection.findWhere({value:crntVal}).set('selectedInd','N');
                }
            });
            this.model.set('currentValue',currentValue.join(delimiter));
        }else{
            this.model.set('currentValue',$(e.target).val());
        }

    },
    getDelimiter: function() {
        var delimiterObj = _.findWhere(this.model.get('dataAttributes'),{name:'input-delimiter'});
        return delimiterObj ? delimiterObj.value : '|';
    },
    setInitValue: function() {
        // var delimiterObj = _.find(this.model.get('dataAttributes'),{name:'input-delimiter'})this.$el.find('*[data-input-delimiter]');
        var delimiter = this.getDelimiter();

        // var selectedOptions = _.where(this.model.get('data'),{selectedInd:'Y'});
        if( this.model.dataCollection ){
            var selectedOptions = this.model.dataCollection.where({selectedInd:'Y'});
            selectedOptions = _.map(selectedOptions,function(optionModel){
                return optionModel.get('value');
            });
            this.model.set('currentValue',selectedOptions.join(delimiter));            
        }
    }
    
});