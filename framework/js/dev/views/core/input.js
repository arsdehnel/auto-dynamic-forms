/*global
ADF,
Backbone,
$,
adf,
_
*/
ADF.Core.InputView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.formRow,
    parentEvents: {
        'change'                                  : 'fieldChange',
        'click .size-toggle'                      : 'sizeToggle',
        'click .adf-checkbox-select-all-toggle'   : 'selectAllToggle'
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
        if( this.model.get('type').toLowerCase() === 'checkboxes' || this.model.get('type').toLowerCase() === 'select-fancy' ){
            this.setInitValue();
        }
    },
    onRender: function(){
        ADF.utils.inputHandlerRefresh( this.$el );

        if( adf.debugEnabled ){
            ADF.utils.prepareDebug( this.$el );
        }
    },
    fieldChange: function(e){

        // suppress 'change' events for the input box for select fancy inputs
        if( this.model.get('type') === 'select-fancy' && $(e.target).is('input:visible') ){
            return false;
        }

        var dataAttrs = this.model.get('dataAttributes');

        this.valueChange(e);
        this._submitOnChange(e, _.findWhere(dataAttrs,{name:'submit-on-change'}));
        this._dependentFieldLkup(e, _.findWhere(dataAttrs,{name:'dpndnt-field-lkup-on-change'}));

    },
    _submitOnChange: function( event, dataAttrObj ){
        if( dataAttrObj && dataAttrObj.value === 'true' ){
            adf.page.getRegion(this.options.regionName).formView.submitForm( event, this );
        }
    },
    _dependentFieldLkup: function( event, dataAttrObj ){
        if( dataAttrObj && dataAttrObj.value === 'true' ){
            adf.page.getRegion(this.options.regionName).formView.dependentFieldLkup( event, this );
        }
    },
    valueChange: function(e) {

        var fieldView = this;
        var $target  = $(e.target);

        if( $target.is(':checkbox') || $target.is(':radio') ){
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
        var selectedOptions = this.model.dataCollection.where({selectedInd:'Y'});
        selectedOptions = _.map(selectedOptions,function(optionModel){
            return optionModel.get('value');
        });
        this.model.set('currentValue',selectedOptions.join(delimiter));
    },
    sizeToggle: function(e) {
        e.preventDefault();
        var $target = $(e.target).closest('.form-row');
        if( $target.hasClass('large') ){
            $target.removeClass('large').addClass('small');
        }else{
            $target.removeClass('small').addClass('large');
        }
    },
    selectAllToggle: function(e) {
        e.preventDefault();

        var $formRow = $(e.currentTarget).closest('.form-row');
        var $chkBxs = $formRow.find(':checkbox');
        var chkBxCnt = $chkBxs.size();
        var chkBxSlctd = $chkBxs.filter(':checked').size();
        var crntValArray = [];
        var delimiterObj = _.findWhere(this.model.get('dataAttributes'),{name:'input-delimiter'});
        var delimiter = ( delimiterObj ? delimiterObj.value : '|' );

        if( chkBxSlctd > ( chkBxCnt / 2 ) ){
            $chkBxs.removeProp('checked');
            this.model.dataCollection.each(function(dataModel){
                dataModel.set('selectedInd','N');
            });
            this.model.set('currentValue','');
        }else{
            $chkBxs.prop('checked',true);
            this.model.dataCollection.each(function(dataModel){
                crntValArray.push(dataModel.get('value'));
                dataModel.set('selectedInd','Y');
            });
            this.model.set('currentValue',crntValArray.join(delimiter));
        }

    }
});