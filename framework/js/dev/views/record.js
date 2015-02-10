/*global
ADF,
Marionette,
adf,
$
*/
ADF.RecordView = Marionette.CompositeView.extend({
    template: ADF.templates.gridRow,
    tagName: 'tr',
    className: 'adf-record',
    childView: ADF.CellView,
    events: {
        'click .btn'                    : 'handleAction',
        'click .adf-grid-overlay-value' : 'showOverlayEditor'
    },
    initialize: function( options ) {
        ADF.utils.message('log','RecordView Initialized', options );
        this.region = adf.page.getRegion(options.regionName);
        this.regionName = this.region.options.regionName;
        this.model.set('regionName',this.regionName);
        this.collection = this.region.fieldsCollection;
    },
    renderSelf: function() {
        // this would be called when the record has changed and needs to be rerendered
        // TODO: make this actually work for both rendering on initial load (as child) and as standalone record (on change)
        this.render();
    },
    renderAsChild: function() {

        var cellsString = '';

        var recordView = this;

        // put the children (the fields) into the drop down but above the divider
        this.collection.each(function(model){

            // TODO: move this to the model initializer
            model.set('regionName',recordView.regionName);
            model.set('currentValue',recordView.model.get(model.get('name')));
            var childView = new recordView.childView({model:model});
            // console.debug(childView.render());
            cellsString += childView.render();

        });

        return this.template($.extend({},this.model.toJSON(),{cells:cellsString}));
    },
    handleAction: function(e) {
        e.preventDefault();
        var $targetObj = $(e.target).closest('a');
        var actionType = $targetObj.attr('data-action-type');
        // TODO: experiment with making this dynamic
        switch( actionType ){
            case 'save':
                this.model.url = $targetObj.attr('href');
                this.model.save();
                break;
            default:
                ADF.utils.message('error','Unexpected record action ('+actionType+') triggered.',$targetObj);
        }
    },
    showOverlayEditor: function(e) {
        e.preventDefault();
        adf.page.getRegion('overlayEditor').show( $(e.target) );
    }

});

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