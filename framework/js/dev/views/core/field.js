/*global
ADF,
Backbone,
$,
adf,
_
*/
ADF.Core.FieldView = Backbone.Marionette.ItemView.extend({
    events: {
        'change'                                  : 'fieldChange',
        'click .size-toggle'                      : 'sizeToggle',
        'keyup .select-fancy'                     : 'fancySelectKeyup',
        'click .select-fancy-options a'           : 'fancySelectClick',
        'click .select-fancy-clear'               : 'fancySelectClear',
        'click .adf-checkbox-select-all-toggle'   : 'selectAllToggle'
    },
    initialize: function( options ) {
        ADF.utils.message('log','Core.FieldView Initialized', options);
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

        var dataAttrs = this.model.get('dataAttributes');

        this.valueChange(e);
        this._submitOnChange(e, _.findWhere(dataAttrs,{name:'adf-submit-on-change'}));
        this._dependentFieldLkup(e, _.findWhere(dataAttrs,{name:'adf-dependent-field-lkup-on-change'}));

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
    showOverlayEditor: function(e) {
        e.preventDefault();
        adf.page.getRegion('overlayEditor').show( $(e.target) );
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
    fancySelectKeyup: function(e) {

        var keyCode = e.keyCode;
        var newHighlight;
        switch( keyCode ){
            case 38:                    // up arrow
            case 40:                    // down arrow

                // dont want to cancel it for every single key
                e.preventDefault();

                // remove existing highlight and traverse to the appropriate item
                if( this.model.get('highlightedOption') ) {
                    console.log('found highlighted option');
                    this.model.get('highlightedOption').removeClass('highlight');
                    newHighlight = ( keyCode === 40 ? this.model.get('highlightedOption').next() : this.model.get('highlightedOption').prev() );
                }

                // maybe the traversing failed (end of list or beginning of list) or we didn't have a highlighted one to start with
                if( !newHighlight || newHighlight.size() === 0 ) {
                    newHighlight = ( keyCode === 40 ? this.$el.find('.select-fancy-options').children().first() : this.$el.find('.select-fancy-options').children().last() );
                }

                // somehow we should have one determined for the new highlight now
                this.model.set('highlightedOption',newHighlight.addClass('highlight'));
                // console.log(highlightedOption);
                break;

            case 13:
                e.preventDefault();
                this.model.get('highlightedOption').click();
                // console.log('Return pressed',e,this.model.get('highlightedOption'));
                break;

            default:            // all the other keys
                console.log('keyup logger',e,e.keyCode);
                var $options = this.$el.find('.select-fancy-options');
                $options.empty();
                var val = this.$el.find('.select-fancy').val();
                var selectData = this.model.get('data');
                var results = _.filter(selectData,function(item){
                    if( item.label && item.label.length > 0 ){
                        return item.value.toLowerCase().indexOf(val.toLowerCase()) >= 0 || item.label.toLowerCase().indexOf(val.toLowerCase()) >= 0;    
                    }else{
                        return item.value.toLowerCase().indexOf(val.toLowerCase()) >= 0;
                    }
                });
                if( results.length === 0 ){
                    $options.append('<li>No results found</li>');
                }else{
                    _.each(results,function(result){
                        $options.append(ADF.templates.inputHelperSelectFancyRecord(result));
                    });                    
                }
        }
    },
    fancySelectClick: function(e) {
        e.preventDefault();
        var $selected = $(e.currentTarget);
        var $input = this.$el.find('.select-fancy');
        var $hidden = this.$el.find(':input:hidden');
        $input.val($selected.text());
        $hidden.val($selected.data('value'));
        this.model.set('currentValue',$selected.data('value'));
        $hidden.trigger('change');
        this.$el.find('.select-fancy-options').empty();        
    },
    fancySelectClear: function(e) {
        e.preventDefault();
        this.model.set('currentValue','');
        var $input = this.$el.find('.select-fancy');
        var $hidden = this.$el.find(':input:hidden');        
        $input.val('');
        $hidden.val('');
        $hidden.trigger('change');        
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