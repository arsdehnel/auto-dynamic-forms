ADF.RecordView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.gridRow,
    tagName: 'tr',
    childView: ADF.CellView,
    // childViewContainer: 'tr',
    initialize: function( options ) {
        ADF.utils.message('log','RecordView Initialized', options );

        // this.setElement(this.template(this.model.toJSON()));

        this.collection = adf.findRegion({
            attribute : 'regionName',
            value : this.model.collection.regionName
        }).fieldsCollection;

    },
    render: function() {
        // TODO: figure out a way to properly use a template that actually as a <tr> in it
        // <tr id="{{regionName}}--{{id}}" class="adf-record {{rowClass}}"></tr>
        this.$el
            .attr('id',this.model.get('regionName') + '--' + this.model.get('id'))
            .addClass('adf-record '+this.model.get('rowClass'));
        // this._super();
        return this._super();
    }
});

// <tr id="{{tableId}}--{{id}}" class="adf-record {{rowClass}}">
//     {{#each cells}}
//         {{{html}}}
//     {{/each}}
// </tr>

// 'use strict';
// window.autoAdmin = window.autoAdmin || {};

// autoAdmin.RecordView = autoAdmin.PageView.extend({

//     className: "auto-admin-record",

//     el: ".auto-admin-record",

//     initialize: function(opts){
//         var that = this;

//         console.log('[autoAdmin] RecordView initialized', opts);

//     },

//     events: {
//         // ACTIONS
//         "click .btn-save"                     : "save"
//     },

//     createTplObject: function( args ){

//         var record = this;
//         var fieldsArray = args.fields;
//         var $target = args.target;
//         var createRow = ( args.hasOwnProperty("createRow") && args.createRow );
//         var cellObj = {};
//         var recordObj = {}
//         recordObj.cells = new Array();

//         for ( var i = 0; i < fieldsArray.length; i++ ) {

//             cellObj = fieldsArray[i];
//             cellObj.set("currentValue",record.get(fieldsArray[i].get("name")));
//             cellObj.set("inputField",cellObj.render());

//             recordObj.cells.push({'html': autoAdmin.templates.gridCell( cellObj.toJSON() )});

//         }

//         //make sure we have an ID value, even for new rows
//         if( record.get("id") ){
//             recordObj.id = record.get("id");
//             recordObj.rowClass = "current";
//         }else{
//             recordObj.id = 'a' + Math.round( Math.random() * 10000000 );
//             rowClass = "added";
//         }

//         return recordObj;

//     },

//     render: function( args ){

//         var tplObject = this.createTplObject( args );

//         alert('not done');

//         // TODO handle create row argument, etc.

//         // if( createRow ){

//     //         if( !args.hasOwnProperty('adjSibObj') || args.adjSibObj === false ){
//     //             $target.append( autoAdmin.render.hbsTemplate( "autoAdminGridRow", rowObj ) );
//     //         }else{
//     //             adjSibObj.after( autoAdmin.render.hbsTemplate( "autoAdminGridRow", rowObj ) );
//     //         }

//         // }else{

//         //      $target.find('tbody tr#'+recordObj.id).replaceWith(autoAdmin.templates.gridRow( rowObj ) );

//         // }

//     //     $('#'+dataObj.id).find('.select2').each(function(){
//     //         autoAdmin.render.renderSelect2({
//     //             select2Obj : $(this)
//     //         })
//     //     });

//     },

//     save: function( e ){

//         e.preventDefault();

//         console.log('some event');

//     }

// });