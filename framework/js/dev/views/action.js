/*global
ADF,
Backbone,
$
*/
ADF.ActionView = Backbone.View.extend({

    el: '.adf-action',

    initialize: function(opts){
        var that = this;

        that.parentGridView = opts.parentGridView;

        ADF.utils.message('log','ActionView initialized', opts);

    },

    events: {

        'click a' : 'handleClick'

    },

    render: function( args ) {

        args.target.append( ADF.templates.action( this.model.toJSON() ) );
        this.setElement('#'+this.model.get('id'));

    },

    renderAsDropdownItem: function( target ) {

        target.before( ADF.templates.dropdownLink( this.model.toJSON() ) );

        this.setElement('#'+this.model.get('id'));

    },

    handleClick: function(e){

        e.preventDefault();

        var actionView = this;
        var $action = $(e.target);

        if( $action.data('action-type') ){

            var actionType = ADF.utils.camelize( $action.data('action-type') );
            actionView[actionType]( $action );

        }else{
            alert('Better have a TA check into this.  The action you clicked on has no type indicated so not sure what to do with it.');
        }

    },

    gridRecordAdd: function( actionObj ) {

        // var $target = actionObj.closest('.adf-grid-wrapper').find('tbody');
        var gridView = this.parentGridView;
        // var fieldsArray = gridView.fieldsColl.models;
        // var recordView;

        actionObj.closest('.grid-dropdown').find('.dropdown-menu').addClass('hide');

        for( var i = 1; i <= parseInt( actionObj.data('record-count'), 10 ); i++ ){
            gridView.recordsColl.add({},{ saveUrl : gridView.recordsColl.saveUrl });
        }

    }

});