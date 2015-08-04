/*global
ADF,
Backbone,
_,
$
*/
ADF.Inputs.SelectFancyView = ADF.Core.InputView.extend({
    childEvents: {
        'input .select-fancy'                            : 'input',
        'keydown .select-fancy'                          : 'keydown',
        'click .select-fancy-option'                     : 'click',
        'click .select-fancy-clear'                      : 'clear',
        'click .select-fancy-toggle'                     : 'toggle',
        'click .select-fancy-add-option a'               : 'addOptionOpen',
        'click .btn-cancel'                              : 'addOptionClose',
        'click .btn-submit'                              : 'addOptionSubmit'
    },
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    ui : {
        options   : '.select-fancy-options',    // the options list
        dispInput : '.select-fancy',            // the text input that stores the value to show the user
        valInput  : '.adf-form-input'           // the hidden input that stores the actual value to be used
    },
    initialize: function( options ) {
        ADF.utils.message('log','Inputs.SelectFancyView Initialized', options);
        this.addOptionUrl = this.model.getDataAttrVal( 'add-option-url' );
        this._super();
    },
    input: function(e) {
        this.empty();
        this.open( this.ui.dispInput.val() );
    },
    toggle: function(e) {
        e.preventDefault();
        if( this.opened ){
            this.close();
        }else{
            this.open();
        }
    },
    empty: function() {
        this.ui.options.empty();
    },
    close: function() {
        this.empty();
        this.opened = false;
    },
    keydown: function(e) {

        var keyCode = e.keyCode;
        switch( keyCode ){

            // UP/DOWN arrows
            case 38:                    // up arrow
            case 40:                    // down arrow

                // dont want to cancel it for every single key
                e.preventDefault();

                if( this.opened ){
                    this.move(keyCode === 38 ? 'previous' : 'next');
                }else{
                    this.open();
                    this.move('next');
                }
                break;

            // ESC
            case 27:
                this.close();
                break;

            // enter/return
            case 13:
                if( this.opened ){
                    e.preventDefault();
                    this.model.get('highlightedOption').click();
                }
                break;
        }
    },
    goto: function( dir ) {

        var newHighlight;

        // remove existing highlight and traverse to the appropriate item
        if( this.model.get('highlightedOption') ) {
            this.model.get('highlightedOption').removeClass('highlight');
            newHighlight = ( dir === 'next' ? this.model.get('highlightedOption').next() : this.model.get('highlightedOption').prev() );
        }

        // maybe the traversing failed (end of list or beginning of list) or we didn't have a highlighted one to start with
        if( !newHighlight || newHighlight.size() === 0 ) {
            newHighlight = ( dir === 'next' ? this.$el.find('.select-fancy-options').children().first() : this.$el.find('.select-fancy-options').children().last() );
        }

        // somehow we should have one determined for the new highlight now
        this.model.set('highlightedOption',newHighlight.addClass('highlight'));

    },
    open: function( filterText ) {
        var sFView = this;
        this.opened = true;
        var results = {};
        if( filterText ){
            results = new Backbone.Collection(this.model.dataCollection.filter(function(item){
                if( item.get('label') ){
                    return item.get('value').toLowerCase().indexOf(filterText.toLowerCase()) >= 0 || item.get('label').toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
                }else{
                    return item.get('value').toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
                }
            }));
        }else{
            results = this.model.dataCollection;
        }
        if( results.length === 0 ){
            sFView.ui.options.append('<li>No results found</li>');
        }else{
            results.each(function(result){
                sFView.ui.options.append(ADF.templates.inputHelperSelectFancyRecord(result.toJSON()));
            });
        }
        if( this.addOptionUrl ){
            sFView.ui.options.append(ADF.templates.inputHelperSelectFancyAddOption({addOptionUrl:this.addOptionUrl}));
        }
    },
    click: function(e) {
        e.preventDefault();
        var $selected = $(e.target).closest('li');
        this.ui.dispInput.val($.trim($selected.text()));
        this.ui.valInput.val($selected.data('value'));
        this.model.set('currentValue',$selected.data('value'));
        this.ui.valInput.trigger('change');
        this.empty();
    },
    clear: function(e) {
        e.preventDefault();
        this.model.set('currentValue','');
        this.ui.dispInput.val('');
        this.ui.valInput.val('');
        this.ui.valInput.trigger('change');
        this.empty();
    },
    addOptionOpen: function(e) {
        e.preventDefault();
        var $addOption = $(e.target).closest('li');
        $addOption.addClass('open');
    },
    addOptionClose: function(e) {
        e.preventDefault();
        var $addOption = $(e.target).closest('li');
        $addOption.removeClass('open');
    },
    addOptionSubmit: function(e) {
        e.preventDefault();
        var $addOption = $(e.target).closest('li');
        var sFView = this;
        var dataObj = $addOption.find(':input').serializeObject();
        var dataArray = ADF.utils.dataSerializeNonADFData( dataObj );

        $.ajax({
            url: sFView.addOptionUrl,
            method: 'post',
            data: {adfSerializedData:JSON.stringify(dataArray)},
            beforeSend: function() {
                ADF.utils.spin( $addOption );
            },
            complete: function( jqXhr, textStatus ){
                ADF.utils.message('log','Submitted add new option via ajax');
                ADF.utils.spin( $addOption, { stop: true } );
                sFView.ui.options.find('.select-fancy-add-option').before(ADF.templates.inputHelperSelectFancyRecord(dataObj));
                $addOption.removeClass('open').find(':input').val('');
            }
        });

    }

});