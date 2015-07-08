/*global
ADF,
Marionette,
adf,
$
*/
ADF.Grids.GridView = Marionette.View.extend({
    className: 'adf-grid',
    tagName: 'table',
    events : {
        'dragover'                        : 'dragHandle',
        'dragleave'                       : 'dragHandle',
        'drop'                            : 'transferStart'
    },
    template: ADF.templates.gridTable,
    initialize: function( options ) {
        ADF.utils.message('log','GridView Initialized', options );
        this.regionName = options.regionName;
        var gridView = this;
        var region = adf.page.getRegion(gridView.regionName);

        this.setElement(this.$el.html(this.template()));

        gridView.headersView = new ADF.Grids.HeadersView({
            el: gridView.$el.find('thead')[0],
            collection: region.fieldsCollection,
            regionName: gridView.regionName
        });

        gridView.bodyView = new ADF.Grids.BodyView({
            el: gridView.$el.find('tbody')[0],
            collection: new ADF.RecordsCollection(null,{regionName:gridView.regionName}),
            regionName: gridView.regionName
        });        

        gridView.columnSelect = new ADF.Grids.ColumnSelectView({
            el: gridView.$el.find('.adf-grid-column-select')[0],
            model: new ADF.DropdownMenuModel({footerOptions: []}),
            collection: region.fieldsCollection,
            regionName: gridView.regionName
        });

        gridView.gridActions = new ADF.Grids.ActionsView({
            el: gridView.$el.find('.adf-grid-actions')[0],
            model: new ADF.DropdownMenuModel({footerOptions: []}),
            collection: region.actionsCollection,
            regionName: gridView.regionName
        });

        // this.listenTo(region.fieldsCollection,'change:checkedInd',this._updateRowsFieldsCollections);

        this._super();

    },
    render: function() {
        var gridView = this;
        gridView.headersView.render();
        gridView.columnSelect.render();
        gridView.gridActions.render();
        gridView.bodyView.render();
    },
    dragHandle: function( e ) {
        this.upload.dragHandle( e );
    },
    transferStart: function( e ) {
        this.upload.transferStart( e, this );
    },
    upload: {

        dragHandle: function( e ) {

            e.stopPropagation();
            e.preventDefault();

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
        transferStart: function( e, gridView ){

            console.log('transferStart begin',e,gridView);

            this.gridView = gridView;
            var file;
            var $form = this.gridView.$el.find('form');

            // TODO: do this a bit more elegantly but for some reason the XHR upload was getting the uploadStart to fire on it so this just stop that
            if( $(e.target).closest('.adf-grid').size() === 0 ){
                return false;
            }

            // Or else the browser will open the file
            e.preventDefault();
            e.stopPropagation();

            // this is a little hacky but it's so that the browser doesn't flicker between thinking you're dragging and the normal state
            this.dndTimer = setTimeout(function() {
                $('body').removeClass('droppable');
                $('.upload-drop-zone').removeClass('hover');
            }, 200);

            var files = e.target.files || e.dataTransfer.files;
            var fileTypes = ADF.config.get('upload').fileTypes;

            // for( var i = 0; file = files[i]; i++ ) {
            for( var i = 0; i < files.length; i++ ){

                file = files[i];

                console.log(file);

                

                //var xhr = new XMLHttpRequest();

                //if (xhr.upload){

                    if( fileTypes.indexOf(file.type) < 0 ){
                        ADF.utils.message('error','Invalid file type: '+file.type+', if you think this should be allowed please contact your TA');
                        continue;
                    }
                    if( file.size > ADF.config.get('upload').maxFileSize ){
                        ADF.utils.message('error','Invalid file type: '+file.type+', if you think this should be allowed please contact your TA');
                        continue;
                    }

                    $form.append('<input type="file" name="file-'+i+'">');

                    /*

                    // start upload
                    xhr.upload.filename = file.name;
                    // generate a random number to be used for this file's progress
                    xhr.progressId = 'progress-' + Math.floor((Math.random() * 100000));
                    xhr.upload.progressId = xhr.progressId;
                    xhr.upload.addEventListener('loadstart', this.progressStart, false);
                    xhr.upload.addEventListener('progress', this.progressUpdate, false);
                    xhr.upload.addEventListener('load', this.progressComplete, false);
                    xhr.upload.addEventListener('error', this.errorHandle, false);
                    xhr.upload.addEventListener('abort', this.abortHandle, false);
                    xhr.addEventListener('load',this.processResponse, false);
                    xhr.open('POST', ADF.config.get('upload').url, true);
                    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                    xhr.setRequestHeader('X-File-Name', file.name);
                    xhr.send(file);

                    */

                //}else{
                //    ADF.utils.message('error','Error in initiating the file upload process',file);
                //}

            }
        },
        progressStart: function( event ){

            // append to the dialog body
            $('#upload-progress .dialog-body').append('<div class="upload-progress" id="'+this.progressId+'"><label for="'+this.progressId+'-meter">'+this.filename+'</label><progress id="'+this.progressId+'-meter" max="100" value="0" /></div>');

        },

        progressUpdate: function( event ){
            if (event.lengthComputable) {
                var progress = Math.ceil( ( event.loaded / event.total ) * 100 );
                $('#'+this.progressId+'-meter').attr('value',progress);
            }
        },

        progressComplete: function( event ){
            $('#upload-progress .dialog-footer .upload-cancel').replaceWith('<a href="#" class="btn close icon icon-close">done</a>');
        },

        // uploadResponse: function( status, progressId, responseText ){
        processResponse: function( event ){

            // var gridView = this;

            console.log('upload event',event);

            if( event.currentTarget.status === 200 ){

                var responseJSON = JSON.parse(event.currentTarget.responseText);

                if( responseJSON.success ){

                    this.gridView.collection.add(responseJSON.data.records);

                }else{

                    ADF.utils.message('error','Something went wrong with parsing the upload',event);

                }

                $('#'+event.currentTarget.progressId).after('<p>'+responseJSON.data.records.length+' records added successfully.</p>');

            }else{

                ADF.utils.message('error','Something went wrong with the upload as a whole',event);

            }

        },
        errorHandle: function(e) {
            e.preventDefault();
            ADF.utils.message('error','Error processing upload of file');
        },
        abortHandle: function(e) {
            e.preventDefault();
            ADF.utils.message('error','File upload aborted');
        }

    },

    sortGrid: function( e ) {

        e.preventDefault();

        var $triggerObj = $(e.currentTarget),
            columnName = $triggerObj.closest('th').attr('data-column-name'),
            bodyCollection = this.bodyView.collection,
            gridSortAttribute = bodyCollection.sortAttribute;

        // Toggle sort if the current column is sorted
        if (columnName === gridSortAttribute) {
            bodyCollection.sortDirection *= -1;
        } else {
            bodyCollection.sortDirection = 1;
        }

        // Adjust the indicators.  Reset everything to hide the indicator
        $triggerObj.closest('thead').find('.sort-trigger').removeClass('sort-up sort-down');

        // Now show the correct icon on the correct column
        if (bodyCollection.sortDirection == 1) {
            $triggerObj.addClass('sort-up');
        } else {
            $triggerObj.addClass('sort-down');
        }

        // Now sort the collection
        bodyCollection.sortRecords(columnName);

    }


});
