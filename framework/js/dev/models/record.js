/*global
ADF,
Backbone,
_
*/
ADF.RecordModel = Backbone.Model.extend({

    initialize: function( attrs, opts ){
        ADF.utils.message('log','RecordModel Initialized', attrs, opts);
        var recordModel = this;

        // make sure all attributes are lowercase
        _.each(attrs,function(element, index, array){
            if( index.toLowerCase() !== index ){
                recordModel.set(index.toLowerCase(),element);
                recordModel.unset(index);
            }
            if( typeof element == 'object' && Array.isArray(element) ){
                _.each(element, function( childElement, childIndex, childArray ){
                    ADF.utils.objPropToLower( childElement );
            //         childArray[index] = adf.utils.objPropToLower( childElement );
                });
                recordModel.set(index.toLowerCase(), element );
                // console.log(element);
            }
        });

        this.listenTo(this,'sync',recordModel.recordSave);

    }

});

//     createTplObject: function( args ){

//         var record = this;
//         var fieldsArray = args.fields;
//         var $target = args.target;
//         var createRow = ( args.hasOwnProperty('createRow') && args.createRow );
//         var cellObj = {};
//         var recordObj = {}
//         recordObj.cells = new Array();

//         for ( var i = 0; i < fieldsArray.length; i++ ) {

//             cellObj = fieldsArray[i];
//             cellObj.set('currentValue',record.get(fieldsArray[i].get('name')));
//             cellObj.set('inputField',cellObj.render());

//             recordObj.cells.push({'html': autoAdmin.templates.gridCell( cellObj.toJSON() )});

//         }

//         //make sure we have an ID value, even for new rows
//         if( record.get('id') ){
//             recordObj.id = record.get('id');
//             recordObj.rowClass = 'current';
//         }else{
//             recordObj.id = 'a' + Math.round( Math.random() * 10000000 );
//             rowClass = 'added';
//         }

//         return recordObj;

//     },

//     render: function( args ){

//         var tplObject = this.createTplObject( args );

//         alert('not done');

//         // TODO handle create row argument, etc.

//         // if( createRow ){

//     //         if( !args.hasOwnProperty('adjSibObj') || args.adjSibObj === false ){
//     //             $target.append( autoAdmin.render.hbsTemplate( 'autoAdminGridRow', rowObj ) );
//     //         }else{
//     //             adjSibObj.after( autoAdmin.render.hbsTemplate( 'autoAdminGridRow', rowObj ) );
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