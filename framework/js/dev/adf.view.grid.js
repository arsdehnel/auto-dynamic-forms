// 'use strict';
// window.autoAdmin = window.autoAdmin || {};

// autoAdmin.GridView = autoAdmin.PageView.extend({

//     className: "auto-admin-grid",

//     el: ".auto-admin-grid",

//     initialize: function(opts){
//         var that = this;

//         console.log('[autoAdmin] GridView initialized', opts);

//         this.ajax( opts );
//     },

//     render: function( opts ){

//         var gridView = this;
//         var $target = opts.target;
//         var fieldsArray = opts.ajaxView.fieldsColl.models;
//         var recordsArray = opts.ajaxView.recordsColl.models;
//         var gridObj = {};

//         gridObj.headers = new Array();
//         gridObj.colSelectCols = new Array();
//         gridObj.records = new Array();

//         // COLUMNS
//         for ( var i = 0; i < fieldsArray.length; i++ ) {

//             fieldsArray[i].set("colIndex",i);
//             fieldsArray[i].set("gridRow",true);

//             gridObj.headers[i] = { 'html' : autoAdmin.templates.gridHeaderCell( fieldsArray[i].toJSON() ) };

//             if( fieldsArray[i].get("columnSelectPriority") != 0 ){

//                 // TODO: set the checked attribute if this is going to be visible

//                 gridObj.colSelectCols.push({'html' : autoAdmin.templates.dropdownSelectItem( $.extend( fieldsArray[i].toJSON(), {parent:"column-selector"} ) ) });

//             }

//         }

//         // put those fields into records
//         for ( var j = 0; j < recordsArray.length; j++ ) {

//             gridObj.records.push({
//                 'html' : autoAdmin.templates.gridRow( recordsArray[j].createTplObject({fields : fieldsArray}))
//             });

//         }

//         gridObj.colSelect = gridView.renderColumnSelector( gridObj.colSelectCols );

//         // TODO grid actions

//         $target.html( autoAdmin.templates.gridWrapper( gridObj ) );

//         gridView.refreshFilters( $target, fieldsArray );

//         $target.find('.select2').each(function(){
//             autoAdmin.utils.renderSelect2({
//                 select2Obj : $(this)
//             })
//         })

//     },

//     renderColumnSelector: function( columns ) {

//         var dropdownObj = {primaryOptions: columns};

//         dropdownObj.footerOptions = [
//             {
//                 href : "#",
//                 itemClass : "auto-admin-grid-column-group",
//                 label : "All Columns",
//                 dataAttributes : [
//                     {
//                         "name" : "column-select-type",
//                         "value" : "all"
//                     }
//                 ]
//             },
//             {
//                 href : "#",
//                 itemClass : "auto-admin-grid-column-group",
//                 label : "Minimum Columns",
//                 dataAttributes : [
//                     {
//                         "name" : "column-select-type",
//                         "value" : "min"
//                     }
//                 ]
//             },
//             {
//                 href : "#",
//                 itemClass : "auto-admin-grid-column-group",
//                 label : "Default Columns",
//                 dataAttributes : [
//                     {
//                         "name" : "column-select-type",
//                         "value" : "dflt"
//                     }
//                 ]
//             }
//         ];

//         dropdownObj.wrapClass = "column-selector";
//         dropdownObj.buttonLabel = "Select Columns";

//         return autoAdmin.templates.dropdownMenu( dropdownObj );

//     },

//     refreshFilters: function( $target, fieldsArray ){

//         var gridView = this;
//         var rows = $target.find('tbody tr');
//         var val;
//         var fieldName;
//         var field;
//         var values = new Array();

//         // go through each column
//         for ( var i = 0; i < fieldsArray.length; i++ ) {

//             field = fieldsArray[i];

//             fieldName = field.get("name");

//             if( fieldName === 'actions' ){
//                 continue;
//             }

//             // reset for each column
//             values = {}

//             rows.each(function(){

//                 // cache it
//                 var inputElement = $(this).find('td').eq(i).find(':input[name='+fieldName+']');

//                 // BUG select2 values being accumulated into filters not working properly
//                 val = ( inputElement.val() ? inputElement.val() : inputElement.select2("val") );

//                 if( val && val.length > 0 ){
//                     values[val] = val;
//                 }

//             })

//             //add these to the main columns array
//             if( _.size(values) > 0 ){
//                 field.set("currentValues",values);
//             }

//             // refresh the filter
//             gridView.refreshFilterOptions( $target, field );

//         }

//     },

//     refreshFilterOptions: function( $target, field ){

//         var th = $target.find('thead tr th').eq(field.get("colIndex"));
//         var tmpltObj = {};
//         var dropdownObj = {
//             wrapClass : "grid-header-filter",
//             footerOptions : [
//                 {
//                     href : "#",
//                     itemClass : "grid-header-filter-clear",
//                     label : "Clear Filters"
//                 }
//             ]
//         }

//         //remove all filter data
//         th.find('.dropdown-wrapper').remove();
//         th.append( autoAdmin.templates.dropdownMenu( dropdownObj ) );

//         //only attempt to do something if there are values in there
//         if( _.size(field.get("currentValues")) > 0 ){

//             th.addClass('has-filter').find('.icon-filter').removeClass('hide')

//             for( var value in field.get("currentValues") ){

//                 tmpltObj.name = value;
//                 tmpltObj.parent = field.get("name");
//                 if( field.get('data') && field.get('data').length > 0 ){

//                     for( var rec in field.get('data').data ){

//                         if( field.get("data")[rec].value == value ){

//                             tmpltObj.label = ( field.get("data")[rec].hasOwnProperty('label') ? field.get("data")[rec].label : field.get("data")[rec].value );
//                             break;

//                         }

//                     }

//                 }else{

//                     tmpltObj.label = value;

//                 }

//                 th.find('.dropdown-menu .divider').before( autoAdmin.templates.dropdownSelectItem( tmpltObj ) );

//             }

//         }else{

//             th.find('.icon-filter').addClass('hide');

//         }

//     },

//     ajax: function( opts ) {
//         var that = this;
//         var ajaxObj = {};
//         $.extend(ajaxObj,opts,{caller:that});

//         new autoAdmin.AjaxView(ajaxObj);

//     }

// });