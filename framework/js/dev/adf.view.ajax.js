// 'use strict';
// window.autoAdmin = window.autoAdmin || {};

// autoAdmin.AjaxView = Backbone.View.extend({

//     initialize: function(opts){

//         var that = this;
//         var target = opts.target;

//         // attach the listener
//         this.listenTo(this,'ajaxLoaded', function(){

//             opts.caller.render({
//                 ajaxView : that,
//                 target : target
//             });

//         })

//         this.loadAjax(opts);

//     },

//     loadAjax: function( opts ){

//         var that = this;

//         $.ajax({
//             url: opts.url,
//             type: opts.method,
//             data: opts.data,
//             dataType: ( opts.resultType === "html" ? "html" : "json" ),
//             beforeSend: function(){
//                 autoAdmin.utils.spin(opts.target);
//             },
//             complete: function( jqXHR, textStatus ){

//                 if( jqXHR.status === 200 ){

//                     if( opts.resultType === 'html' ){

//                         that.responseText = jqXHR.responseText;

//                     }else{

//                         console.log('[autoAdmin] AJAX message: '+jqXHR.responseJSON.message);

//                         if( jqXHR.responseJSON.success === true ){

//                             if( jqXHR.responseJSON.data.hasOwnProperty('records') ){

//                                 that.recordsColl = new autoAdmin.RecordsCollection();
//                                 that.recordsColl.add(jqXHR.responseJSON.data.records);

//                             }

//                             if( jqXHR.responseJSON.data.hasOwnProperty('fields') ){

//                                 that.fieldsColl = new autoAdmin.FieldsCollection();
//                                 that.fieldsColl.add(jqXHR.responseJSON.data.fields);

//                             }


//                         }else{

//                             if( jqXHR.responseJSON.hasOwnProperty('errors') ){
//                                 _.each(jqXHR.responseJSON.errors,function( element, index, array ){
//                                     alert(element);
//                                 })
//                             }else{
//                                 alert("Looks like the ajax response wasn't quite what was expected from "+opts.url+".  Probably need to get a TA involved.");
//                             }

//                         }

//                     }

//                     that.trigger('ajaxLoaded');

//                 }else if( jqXHR.status === 404 ){

//                     alert("Page Not Found\n\nThe ajax calls is being made to a page ("+opts.url+") that could not be found. Probably going to need to get a TA involved to see what is going on here.");

//                 }else{

//                     alert(textStatus+'! Probably going to need to get a TA involved.');
//                     console.log('opts',opts);
//                     console.log(jqXHR);
//                     target.html(jqXHR.responseText);

//                 }

//             }
//         })

//     }

// });