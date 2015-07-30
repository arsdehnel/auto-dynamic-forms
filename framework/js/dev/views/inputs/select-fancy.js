/*global
ADF,
Backbone,
_,
$
*/
ADF.Inputs.SelectFancyView = ADF.Core.InputView.extend({
    childEvents: {
        'input'                                   : 'input',
        'keydown'                                 : 'keydown',
        'click .select-fancy-options'             : 'click',
        'click .select-fancy-clear'               : 'clear',
        'click .select-fancy-toggle'              : 'toggle',
    },
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ) {
        ADF.utils.message('log','Inputs.SelectFancyView Initialized', options);
        this._super();
    },
    onRender: function() {
        this.$options = this.$el.find('.select-fancy-options');
        this._super();
    },
    input: function(e) {
        this.empty();
        this.open( this.$el.find(':input:visible').val() );
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
        this.$options.empty();
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
            sFView.$options.append('<li>No results found</li>');
        }else{
            results.each(function(result){
                sFView.$options.append(ADF.templates.inputHelperSelectFancyRecord(result.toJSON()));
            });
        }

    },
    click: function(e) {
        e.preventDefault();
        var $selected = $(e.target).closest('li');
        var $input = this.$el.find('.select-fancy');
        var $hidden = this.$el.find(':input:hidden');
        $input.val($.trim($selected.text()));
        $hidden.val($selected.data('value'));
        this.model.set('currentValue',$selected.data('value'));
        $hidden.trigger('change');
        this.$el.find('.select-fancy-options').empty();
    },
    clear: function(e) {
        e.preventDefault();
        this.model.set('currentValue','');
        var $input = this.$el.find('.select-fancy');
        var $hidden = this.$el.find(':input:hidden');
        $input.val('');
        $hidden.val('');
        $hidden.trigger('change');
    }
});