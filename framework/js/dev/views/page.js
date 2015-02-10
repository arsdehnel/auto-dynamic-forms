// 'use strict';
// window.autoAdmin = window.autoAdmin || {};

// autoAdmin.PageView = Backbone.View.extend({

//     el: '.auto-admin-page',

//     initialize: function(opts){
//         var that = this;

//         this.onloadAjax();

//         this.listenTo( Backbone, 'onloadAjaxCheck', function () {
//             this.onloadAjax();
//         }, this );
//     },

//     events: {
//         // AJAX
//         'change .submit-on-change'                     : 'submitParentFormAjax',
//         'click .load-on-click'                         : 'loadOnClickAjax',
//         'click .submit-parent-form-ajax'               : 'submitParentFormAjax',

//         // TODO apply filters action
//     },

//     submitAjax: function( ajaxObj ) {

//         var that = this;
//         this.ajaxViews = new Array();

//         switch( ajaxObj.resultType ){
//             case 'form':
//                 that.ajaxViews.push(new autoAdmin.FormView(ajaxObj));
//                 break;
//             case 'grid':
//                 that.ajaxViews.push(new autoAdmin.GridView(ajaxObj));
//                 break;
//             case 'html':
//                 that.ajaxViews.push(new autoAdmin.HtmlView(ajaxObj));
//                 break;
//             default:
//                 alert('Unexpected result type: '+resultType+'.  Probably going to need to a get a TA involved.');
//                 break;

//         }

//     },

//     onloadAjax: function(){

//         var pageView = this;

//         //there might be more than one on the page when the page loads (or when a partial loads)
//         $('body').find('.auto-admin-onload-ajax').each(function(){

//             var triggerObj = $(this);
//             var target = triggerObj;
//             var ajaxObj = {};

//             if( triggerObj.attr('data-onload-ajax-target-id') != '' ){
//                 target = $('#'+triggerObj.attr('data-onload-ajax-target-id'));
//             }

//             ajaxObj.url = triggerObj.attr('data-onload-ajax-url');
//             ajaxObj.method = 'GET';
//             ajaxObj.data = '';
//             ajaxObj.target = target;
//             ajaxObj.resultType = triggerObj.attr('data-result-type');

//             triggerObj.removeClass('auto-admin-onload-ajax');

//             pageView.submitAjax( ajaxObj );

//         })

//     },

//     formSubmitAjax: function( $trigger ){

//         // e.preventDefault();     //just to make sure we don't submit anything

//         var pageView = this;
//         var $form = $trigger.is('form') ? $trigger : $trigger.closest('form');
//         var ajaxObj = {};

//         ajaxObj.url = $form.attr('action');
//         ajaxObj.method = $form.attr('method');
//         ajaxObj.data = $form.serializeObject();
//         ajaxObj.target = $('#'+$form.attr('data-target-id'));
//         ajaxObj.resultType = $form.attr('data-result-type');

//         pageView.submitAjax( ajaxObj );

//     },

//     submitParentFormAjax: function(e) {

//         e.preventDefault();
//         this.formSubmitAjax( $(e.target) );

//     },

//     loadOnClickAjax: function(e) {

//         // don't want to follow the link
//         e.preventDefault();

//         var pageView = this;
//         var linkObj = $(e.target);
//         var ajaxObj = {};

//         ajaxObj.url = linkObj.attr('href');
//         ajaxObj.method = 'get';
//         ajaxObj.data = '';
//         ajaxObj.target = $('#'+linkObj.attr('data-load-on-click-target-id'));
//         ajaxObj.resultType = linkObj.attr('data-result-type');

//         pageView.submitAjax( ajaxObj );

//     },

// });