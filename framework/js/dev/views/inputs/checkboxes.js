/*global
ADF,
_,
$
*/
ADF.Inputs.CheckboxesView = ADF.Core.InputView.extend({
    childEvents: {
        'click .adf-checkbox-select-all-toggle'   : 'selectAllToggle'
    },
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ) {
        ADF.utils.message('log','Input.CheckboxesView Initialized', options);
        this.setInitValue();
        this._super();
    },
    selectAllToggle: function(e) {
        e.preventDefault();

        var dataAttrs = this.model.get('dataAttributes');        
        var $target = $(e.currentTarget);
        var $checkboxesWrapper;

        if( $target.closest('.adf-checkbox-group-wrapper').size() > 0 ){
            $checkboxesWrapper = $target.closest('.adf-checkbox-group-wrapper');
        }else{
            $checkboxesWrapper = $target.closest('.form-row');
        }
        
        // finding all the checkboxes
        var $chkBxs = $checkboxesWrapper.find(':checkbox');
        // getting the values into an array so we can use this array later
        var chkBxIds = $chkBxs.map(function(){return this.value;});

        // need to get this and the "Selected" count so we can figure out if we should check everything or uncheck everything
        var chkBxCnt = $chkBxs.size();
        var chkBxSlctd = $chkBxs.filter(':checked').size();
        var actionType = ( chkBxSlctd > ( chkBxCnt / 2 ) ) ? 'uncheck' : 'check';

        // var crntValArray = [];
        // var delimiterObj = _.findWhere(this.model.get('dataAttributes'),{name:'input-delimiter'});
        // var delimiter = ( delimiterObj ? delimiterObj.value : '|' );

        // TODO: restructure this to just update the dataCollection and have THAT trigger the UI to change
        if( actionType === 'uncheck' ){
            // update the DOM
            $chkBxs.prop('checked',false);
            this.model.dataCollection.each(function(dataModel){
                // only update if the checkbox exists within this "parent" select all wrapper
                if( _.indexOf(chkBxIds,dataModel.get('value')) >= 0 ){
                    dataModel.set('selectedInd','N');
                }
            });
            // this.model.set('currentValue','');
        }else{
            // update the DOM
            $chkBxs.prop('checked',true);
            this.model.dataCollection.each(function(dataModel){
                if( _.indexOf(chkBxIds,dataModel.get('value')) >= 0 ){
                    dataModel.set('selectedInd','Y');
                }                
                // crntValArray.push(dataModel.get('value'));
                // dataModel.set('selectedInd','Y');
            });
            // this.model.set('currentValue',crntValArray.join(delimiter));
        }

        this.model._updateCrntValFromDataCollection();
        this._submitOnChange(e, _.findWhere(dataAttrs,{name:'submit-on-change'}));
        this._dependentFieldLkup(e, _.findWhere(dataAttrs,{name:'dpndnt-field-lkup-on-change'}));


    }
});
