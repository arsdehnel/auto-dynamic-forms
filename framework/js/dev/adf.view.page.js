// 'use strict';
// window.autoAdmin = window.autoAdmin || {};

// autoAdmin.PageView = Backbone.View.extend({

//     el: ".auto-admin-page",

//     initialize: function(opts){
//         var that = this;

//         this.onloadAjax();

//         this.listenTo( Backbone, 'onloadAjaxCheck', function () {
//             this.onloadAjax();
//         }, this );
//     },

//     events: {
//         // AJAX
//         "change .submit-on-change"                     : "submitParentFormAjax",
//         "click .load-on-click"                         : "loadOnClickAjax",
//         "click .submit-parent-form-ajax"               : "submitParentFormAjax",

//         // GENERAL UI
//         "click .dropdown-wrapper .dropdown-toggle"     : "dropdownToggle",

//         // GRID
//         "click .auto-admin-grid-column-group"          : "columnSelect",
//         "change .column-selector .dropdown-menu input" : "columnSelect"

//         // TODO apply filters action
//     },

//     submitAjax: function( ajaxObj ) {

//         var that = this;
//         this.ajaxViews = new Array();

//         switch( ajaxObj.resultType ){
//             case "form":
//                 that.ajaxViews.push(new autoAdmin.FormView(ajaxObj));
//                 break;
//             case "grid":
//                 that.ajaxViews.push(new autoAdmin.GridView(ajaxObj));
//                 break;
//             case "html":
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

//             if( triggerObj.attr('data-onload-ajax-target-id') != "" ){
//                 target = $('#'+triggerObj.attr('data-onload-ajax-target-id'));
//             }

//             ajaxObj.url = triggerObj.attr('data-onload-ajax-url');
//             ajaxObj.method = "GET";
//             ajaxObj.data = "";
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
//         ajaxObj.method = "get";
//         ajaxObj.data = "";
//         ajaxObj.target = $('#'+linkObj.attr('data-load-on-click-target-id'));
//         ajaxObj.resultType = linkObj.attr('data-result-type');

//         pageView.submitAjax( ajaxObj );

//     },

//     dropdownToggle: function(e) {

//         if( e.target ){

//             e.preventDefault();
//             var $target = $(e.target);

//         }else{      // we're just going to assume it's a jQuery object then

//             var $target = e;

//         }

//         $target.closest('.dropdown-wrapper').find('.dropdown-menu').toggleClass('hide');

//     },

//     columnSelect: function(e) {

//         e.preventDefault();

//         var pageView = this;

//         var $target = $(e.target);

//         var groupType = $target.attr('data-column-select-type')

//           // autoAdmin.grid.columnSelect( $(e.target), $(this).attr('data-column-select-type') );

//         if( !groupType ){

//             var id = $target.val();
//             var cells = $('#'+id+", .auto-admin-grid td[data-header-id="+id+"]");

//             if( $target.is(':checked') ){
//                 cells.show();
//             }else{
//                 cells.hide();
//             }

//         }else{

//             switch( groupType ){

//                 case "all":
//                     $target.closest('.dropdown-wrapper').find('.dropdown-menu :input').not(':checked').trigger('click');
//                     break;

//                 case "min":
//                     $target.closest('.dropdown-wrapper').find('.dropdown-menu :input').each(function(){
//                         var inputObj = $(this);
//                         var priority = parseInt( $('#'+inputObj.val()).attr('data-column-select-priority'), 10 );
//                         if( ( inputObj.is(':checked') && priority > 1 ) || ( inputObj.is(':not(:checked)') && priority <= 1 ) ){
//                             inputObj.trigger('click');
//                         }
//                     })
//                     break;

//                 case "dflt":
//                     var dropdownMenu = $target.closest('.dropdown-wrapper').find('.dropdown-menu');
//                     $('.auto-admin-grid th, .auto-admin-grid td').css("display", "");
//                     $('.auto-admin-grid th').each(function(){

//                         var inputObj = dropdownMenu.find(':input[value='+$(this).attr('id')+']');

//                         //check the visibility of this header which is now based on the media queries
//                         if( $(this).css('display') === 'table-cell' && inputObj.is(':not(:checked)') ){

//                             inputObj.trigger('click');

//                         }else if( $(this).css('display') === 'none' && inputObj.is(':checked') ){

//                             inputObj.trigger('click');

//                         }

//                     })
//                     break;

//             }

//             pageView.dropdownToggle( $target.closest('.dropdown-wrapper').find('.dropdown-toggle') );

//         }

//     }


// });