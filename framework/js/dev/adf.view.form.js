ADF.FormView = Marionette.CollectionView.extend({
    initialize: function( options ) {
        console.log('[ADF] FormView Initialized', options );
    }
});

// 'use strict';
// window.autoAdmin = window.autoAdmin || {};

// autoAdmin.FormView = autoAdmin.PageView.extend({

//     className: "auto-admin-form",

//     el: ".auto-admin-form",

//     initialize: function(opts){
//         var that = this;

//         console.log('[autoAdmin] FormView initialized', opts);

//         this.ajax( opts );

//     },

//     render: function( opts ){

//         var that = this;
//         var $form = opts.target;
//         var fieldsArray = opts.ajaxView.fieldsColl.models;
//         var fieldObj = {};

//         $form.removeClass('loading').html('');

//         for ( var i = 0; i < fieldsArray.length; i++ ) {

//             fieldObj = {};

//             fieldObj = fieldsArray[i];

//             fieldObj.set("inputField", fieldsArray[i].render() );

//             $form.append(autoAdmin.templates.formField( fieldObj.toJSON() ))

//         }

//         $form.find('.select2').each(function(){
//             autoAdmin.utils.renderSelect2({
//                 select2Obj : $(this)
//             })
//         })

//     },

//     ajax: function( opts ) {
//         var that = this;
//         var ajaxObj = {};
//         $.extend(ajaxObj,opts,{caller:that});

//         new autoAdmin.AjaxView(ajaxObj);

//     }

// });