/*global
ADF,
Backbone
*/
ADF.Actions.RecordAddView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.grids.recordAddWidget,
    tagName: 'span',
    events: {
        'click .btn'      : 'addRecords',
        'click svg'       : 'toggleInput',
        'input'           : 'changeRecCount'
    },
    initialize: function( options ){
        ADF.utils.message('log','Actions.RecordAddView Initialized', options);
        this.gridView = options.gridView;
        this.region = options.region; 
        this.model.set('recCount',ADF.utils.userPrefs.get('recordAddCount'));
    },
    ui : {
        recCntDisp   : '.record-add-control-display',    
    },
    toggleInput: function( e ) {
        e.preventDefault();
        e.stopPropagation();
        this.$el.toggleClass('open');
    },
    addRecords: function( e ) {

        this.$el.removeClass('open');

        var defaultsObj = {};

        if( this.region.options && this.region.options.dataFields ){       
            defaultsObj = this.region.options.dataFields.createRecordObject();     
        }

        e.preventDefault();

        this._setRecCount();

        // TODO: get defaults from the collection or something
        for( var i = 1; i <= this.model.get('recCount'); i++ ){
            this.gridView.bodyView.collection.add(defaultsObj,{ at: 0 });
        }

        // ADF.utils.spin( this.region.$el, {stop: true} );

        // this.gridView.gridActions.close();

    },
    _setRecCount: function() {
        ADF.utils.userPrefs.set('recordAddCount',this.model.get('recCount'));
    },
    changeRecCount: function( e ) {
        this.model.set('recCount',e.target.value);
        this.ui.recCntDisp.text(e.target.value);
    }

});