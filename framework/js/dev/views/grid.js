/*global
ADF,
Backbone,
Marionette,
adf,
$
*/
ADF.GridView = Marionette.CompositeView.extend({
    // TODO: grid-row messaging
    // TODO: overlay template adjusted to handle array of data with format/delimiter from data-supl-info attribute
    // TODO: grid-level action for saving all records

    className: 'adf-grid',
    tagName: 'table',
    childView: ADF.RecordView,
    childViewClass: ADF.RecordView,
    childViewContainer: 'tbody',
    childViewOptions : function () {
        return { regionName: this.regionName };
    },
    events : {
        'dragover'                        : 'uploadDragHandle',
        'dragleave'                       : 'uploadDragHandle',
        'drop'                            : 'uploadStart'
    },
    template: ADF.templates.gridTable,
    initialize: function( options ) {
        ADF.utils.message('log','GridView Initialized', options );
        this.regionName = options.regionName;
        this.filters = new Backbone.Collection();
        var gridView = this;
        var region = adf.page.getRegion(gridView.regionName);
        gridView.$el.html(gridView.template({}));
        this.uploadUrl = region.$el.attr('data-grid-upload-url');

        gridView.headersView = new ADF.HeadersView({
            el: gridView.$el.find('thead')[0],
            collection: region.fieldsCollection,
            regionName: gridView.regionName
        });

        gridView.columnSelect = new ADF.ColumnSelectView({
            el: gridView.$el.find('.adf-grid-column-select')[0],
            collection: region.fieldsCollection,
            regionName: gridView.regionName
        });

        gridView.gridActions = new ADF.GridActionsView({
            el: gridView.$el.find('.adf-grid-actions')[0],
            collection: region.actionsCollection,
            regionName: gridView.regionName
        });

        this.listenTo(this.filters,'add',this.filtersQueue);
        this.listenTo(this.filters,'remove',this.filtersQueue);

        this._super();

    },
    render: function() {
        // console.log(this.filters);
        var gridView = this;
        gridView.headersView.render();
        gridView.columnSelect.render();
        gridView.gridActions.render();
        var childContainer = this.$el.find(this.childViewContainer);
        childContainer.empty();
        gridView.collection.each(function(recordModel) {

            // this works but we end up with the wrong rendering
            // something about the record render() not returning 'this' is causing a problem
            // TODO: make this work so we can take more advantage of Marionette
            // gridView.addChild(recordModel, this.childView );

            // and this works but then we are doing a bunch of stuff that it seems like Marionette should be doing for us
            var childView = new gridView.childView($.extend({},gridView.childViewOptions(),{model:recordModel}));
            childContainer.append(childView.renderAsChild());
            childView.setElement('#'+recordModel.get('regionName') + '--' + recordModel.get('id'));

        },this);

        ADF.utils.select2.refresh();

        // console.log(gridView.children);
    },
    filtersQueue: function(model) {

        // the first time we add to the queue we just start with whatever we have already applied
        if( !this.filtersQueued ){
            this.filtersQueued = this.filters;
        }

        // this.filtersQueued

    },
    uploadDragHandle: function( e ) {

        e.stopPropagation();
        e.preventDefault();
        console.log('dragover happening');

        if( e.type == 'dragover' ){
            clearTimeout(this.dndTimer);
            $('body').addClass('droppable');
            if( $(e.target).hasClass('upload-drop-zone') ){
                $(e.target).addClass('hover');
            }else{
                $('.upload-drop-zone').removeClass('hover');
            }
        }else{
            this.dndTimer = setTimeout(function() {
                $('body').removeClass('droppable');
                $('.upload-drop-zone').removeClass('hover');
            }, 200);
        }

    },
    uploadStart: function( e ){

        var gridView = this;
        var file;

        // TODO: do this a bit more elegantly but for some reason the XHR upload was getting the uploadStart to fire on it so this just stop that
        if( $(e.target).closest('.adf-grid').size() === 0 ){
            return false;
        }

        // Or else the browser will open the file
        e.preventDefault();
        e.stopPropagation();

        this.dndTimer = setTimeout(function() {
            $('body').removeClass('droppable');
            $('.upload-drop-zone').removeClass('hover');
        }, 200);

        // gridView.uploadDragHandle(e);

        // autoAdmin.ui.dialog({
        //     id : "upload-progress",
        //     header : "File Upload Progress",
        //     footer : "<a href='#' class='btn icon icon-cancel upload-cancel'>Cancel</a>",
        //     action : "showModal"
        // })

        var files = e.target.files || e.dataTransfer.files;

        for( var i = 0; file = files[i]; i++ ) {

            var xhr = new XMLHttpRequest();

            if (xhr.upload && file.size <= 30000000) {
                // start upload
                xhr.upload.filename = file.name;
                // generate a random number to be used for this file's progress
                xhr.progressId = 'progress-' + Math.floor((Math.random() * 100000));
                xhr.upload.progressId = xhr.progressId;
                xhr.upload.addEventListener('loadstart', gridView.uploadLoadStart, false);
                xhr.upload.addEventListener('progress', gridView.uploadProgress, false);
                xhr.upload.addEventListener('load', gridView.uploadComplete, false);
                xhr.upload.addEventListener('error', gridView.uploadError, false);
                xhr.upload.addEventListener('abort', gridView.uploadAbort, false);
                xhr.addEventListener('load',function(e){
                    gridView.uploadResponse( this.status, this.progressId, e.currentTarget.responseText );
                });
                xhr.open('POST', this.uploadUrl, true);
                xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                xhr.setRequestHeader('X-File-Name', file.name);
                xhr.send(file);
            }else{
                console.log('file not uploaded',file);
            }

        }
    },
    uploadLoadStart: function( event ){

        // append to the dialog body
        $('#upload-progress .dialog-body').append('<div class="upload-progress" id="'+this.progressId+'"><label for="'+this.progressId+'-meter">'+this.filename+'</label><progress id="'+this.progressId+'-meter" max="100" value="0" /></div>');

    },

    uploadProgress: function( event ){
        if (event.lengthComputable) {
            var progress = Math.ceil( ( event.loaded / event.total ) * 100 );
            $('#'+this.progressId+'-meter').attr('value',progress);
        }
    },

    uploadComplete: function( event ){
        $('#upload-progress .dialog-footer .upload-cancel').replaceWith('<a href="#" class="btn close icon icon-close">done</a>');
    },

    uploadResponse: function( status, progressId, responseText ){

        if( status == 200 ){

            var data = JSON.parse(responseText);
            var records = data.records;

            records.forEach(function( element, index, array ){
                ADF.utils.message('warn','create new record');
                // autoAdmin.render.renderGridRecord({
                //     "target" : $('.auto-admin-grid tbody'),
                //     "columns" : data.columns,
                //     "dataObj" : element,
                //     "createRow" : true
                // })
            });

            $('#'+progressId).after('<p>'+records.length+' records added successfully.</p>');


        }else{

            ADF.utils.message('error','Error processing upload of file',responseText);

        }

    },
    uploadError: function(e) {
        e.preventDefault();
        ADF.utils.message('error','Error processing upload of file');
    },
    uploadAbort: function(e) {
        e.preventDefault();
        ADF.utils.message('error','File upload aborted');
    }


});

// autoAdmin.GridView = autoAdmin.PageView.extend({

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

//             fieldsArray[i].set('colIndex',i);
//             fieldsArray[i].set('gridRow',true);

//             gridObj.headers[i] = { 'html' : autoAdmin.templates.gridHeaderCell( fieldsArray[i].toJSON() ) };

//             if( fieldsArray[i].get('columnSelectPriority') != 0 ){

//                 // TODO: set the checked attribute if this is going to be visible

//                 gridObj.colSelectCols.push({'html' : autoAdmin.templates.dropdownSelectItem( $.extend( fieldsArray[i].toJSON(), {parent:'column-selector'} ) ) });

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

//             fieldName = field.get('name');

//             if( fieldName === 'actions' ){
//                 continue;
//             }

//             // reset for each column
//             values = {}

//             rows.each(function(){

//                 // cache it
//                 var inputElement = $(this).find('td').eq(i).find(':input[name='+fieldName+']');

//                 // BUG select2 values being accumulated into filters not working properly
//                 val = ( inputElement.val() ? inputElement.val() : inputElement.select2('val') );

//                 if( val && val.length > 0 ){
//                     values[val] = val;
//                 }

//             })

//             //add these to the main columns array
//             if( _.size(values) > 0 ){
//                 field.set('currentValues',values);
//             }

//             // refresh the filter
//             gridView.refreshFilterOptions( $target, field );

//         }

//     },

//     refreshFilterOptions: function( $target, field ){

//         var th = $target.find('thead tr th').eq(field.get('colIndex'));
//         var tmpltObj = {};
//         var dropdownObj = {
//             wrapClass : 'grid-header-filter',
//             footerOptions : [
//                 {
//                     href : '#',
//                     itemClass : 'grid-header-filter-clear',
//                     label : 'Clear Filters'
//                 }
//             ]
//         }

//         //remove all filter data
//         th.find('.dropdown-wrapper').remove();
//         th.append( autoAdmin.templates.dropdownMenu( dropdownObj ) );

//         //only attempt to do something if there are values in there
//         if( _.size(field.get('currentValues')) > 0 ){

//             th.addClass('has-filter').find('.icon-filter').removeClass('hide')

//             for( var value in field.get('currentValues') ){

//                 tmpltObj.name = value;
//                 tmpltObj.parent = field.get('name');
//                 if( field.get('data') && field.get('data').length > 0 ){

//                     for( var rec in field.get('data').data ){

//                         if( field.get('data')[rec].value == value ){

//                             tmpltObj.label = ( field.get('data')[rec].hasOwnProperty('label') ? field.get('data')[rec].label : field.get('data')[rec].value );
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

// });