/*global
ADF,
Backbone
*/
ADF.Actions.RecordAddView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.recordAddWidget,
    tagName: 'li',
    // TODO: handle the input slider and update the UI as it slides rather than on-end
    events: {
        'click  a'     : 'addRecords',
        'input'        : 'changeRecCount'
    },
    initialize: function( options ){
        ADF.utils.message('log','Actions.RecordAddView Initialized', options);
        this.gridView = options.gridView;
        this.model.set('recCount',ADF.utils.userPrefs.get('recordAddCount'));
    },
    onRender: function() {
        this.$recCountDisp = this.$el.find('.record-add-control-display');
    },
    addRecords: function( e ) {

        var defaultsObj = {};

        e.preventDefault();

        this._setRecCount();

        // TODO: get defaults from the collection or something
        for( var i = 1; i <= this.model.get('recCount'); i++ ){
            this.gridView.bodyView.collection.add(defaultsObj,{ at: 0 });
        }

        this.gridView.gridActions.close();

    },
    _setRecCount: function() {
        ADF.utils.userPrefs.set('recordAddCount',this.model.get('recCount'));
    },
    changeRecCount: function( e ) {
        this.model.set('recCount',e.target.value);
        this.$recCountDisp.text(e.target.value);
    }

});