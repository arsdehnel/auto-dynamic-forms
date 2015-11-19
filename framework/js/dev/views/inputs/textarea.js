/*global
ADF,
CodeMirror,
_
*/
ADF.Inputs.TextareaView = ADF.Core.InputView.extend({
    childEvents: {
        'click .size-toggle'                      : 'sizeToggle'
    },
    events: function() {
        return _.extend({},this.parentEvents,this.childEvents);
    },
    initialize: function( options ) {
        ADF.utils.message('log','Inputs.TextareaView Initialized', options);
        this.template = options.template;
        this.tagName = options.tagName;
        this.model.set('inputField',this.model.get('inputTemplate')(this.model.toJSON()));
        this._super();
    },
    onRender: function() {
        if( this.model.get('fieldPriority') !== 0  && this.$el.css('display') === 'table-cell' ){
            ADF.utils.message('log',this.model.get('fieldName'),'should be displayed as table cell');
        }
        this.$wrap = this.$el.find('.textarea-wrap');
        this._super();
    },
    sizeToggle: function( e ) {
        e.preventDefault();
        // TODO: get some of these (at least theme) from user prefs
        // TODO: add lib/util/formatting to the admin build and then a button to trigger it on the UI
        var options = {
            mode: 'text/html',
            theme: '3024-day',
            htmlMode: true,
            matchBrackets: true
        };
        this.$wrap.toggleClass('expanded');
        if( this.$wrap.hasClass('expanded') ){
            this.codemirror = CodeMirror.fromTextArea(this.$el.find('textarea')[0],options);
        }else{
            this.$el.find('textarea').val(this.codemirror.getValue()).trigger('change');
            // console.log();
            this.codemirror.toTextArea();
            // this.$el.find('textarea').trigger('input');
        }
    }
});