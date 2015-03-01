/*global
ADF,
Backbone,
_
*/
ADF.RecordModel = Backbone.Model.extend({

    initialize: function( attrs, opts ){
        ADF.utils.message('log','RecordModel Initialized', attrs, opts);
        var recordModel = this;

        // give the record an ID even if it is new (ie not from the database)
        if( recordModel.isNew() ){
            recordModel.set('id','a'+ADF.utils.randomId());
            recordModel.set('rowClass','added');
        }else{
            recordModel.set('rowClass','current');
        }

        // make sure all attributes are lowercase
        _.each(attrs,function(element, index, array){
            if( index.toLowerCase() !== index ){
                recordModel.set(index.toLowerCase(),element);
                recordModel.unset(index);
            }
            if( _.isArray(element) ){
                _.each(element, function( childElement, childIndex, childArray ){
                    ADF.utils.objPropToLower( childElement );
                });
                recordModel.set(index.toLowerCase(), element );
            }
        });

        this.listenTo(this,'sync',recordModel.recordSave);

    },

    save: function( attrs, options ) {

        var recordModel = this;
        var params = {};
        var dataArray = [];

        /* ----------------------------------------------
                 BEGIN FROM ORIGINAL BACKBONE.SYNC (v1.1.2)
           ---------------------------------------------- */
            // Default JSON-request options.
            // var params = {type: type, dataType: 'json'};

            // // Ensure that we have a URL.
            params.type = 'POST';
            if (!options.url) {
              params.url = _.result(recordModel, 'url') || ADF.utils.message('error','No URL specified');
            }

        /* ----------------------------------------------
                 END FROM ORIGINAL BACKBONE.SYNC (v1.1.2)
           ---------------------------------------------- */

            // now that we're in our own custom code we'll have to do our slightly odd JSON creation
            // where we create a three attribute object for each attribute
            // and put them into an array and then submit that
            console.log( options.fieldsCollection, this, ADF.utils.dataSerialize( options.fieldsCollection, this ) );
            dataArray = ADF.utils.dataSerialize( options.fieldsCollection, recordModel );
            params.data = {adfSerializedData:JSON.stringify(dataArray)};


            // and then back to the original backbone sync
        /* ----------------------------------------------
                 BEGIN FROM ORIGINAL BACKBONE.SYNC (v1.1.2)
           ---------------------------------------------- */
            // Make the request, allowing the user to override any Ajax options.
            var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
            recordModel.trigger('request', recordModel, xhr, options);
            return xhr;
        /* ----------------------------------------------
                 END FROM ORIGINAL BACKBONE.SYNC (v1.1.2)
           ---------------------------------------------- */


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