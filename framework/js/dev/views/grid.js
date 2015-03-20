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
    childView: ADF.GridRowView,
    childViewClass: ADF.GridRowView,
    childViewContainer: 'tbody',
    childViewOptions : function () {
        return { regionName: this.regionName };
    },
    events : {
        'dragover'                        : 'dragHandle',
        'dragleave'                       : 'dragHandle',
        'drop'                            : 'transferStart',
        'click thead th .sort-trigger'    : 'sortGrid'
    },
    template: ADF.templates.gridTable,
    initialize: function( options ) {
        ADF.utils.message('debug','GridView Initialized', options );
        this.regionName = options.regionName;
        this.filters = new Backbone.Collection();
        var gridView = this;
        var region = adf.page.getRegion(gridView.regionName);
        gridView.$el.html(gridView.template({}));

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

        this.listenTo(this.collection,'sort',this.renderBody);

        this._super();

    },
    render: function() {
        // console.log(this.filters);
        var gridView = this;
        gridView.headersView.render();
        gridView.columnSelect.render();
        gridView.gridActions.render();
        gridView.renderBody();
    },
    renderBody: function() {
        var gridView = this;
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
    },
    filtersQueue: function(model) {

        // the first time we add to the queue we just start with whatever we have already applied
        if( !this.filtersQueued ){
            this.filtersQueued = this.filters;
        }

        // this.filtersQueued

    },
    dragHandle: function( e ) {
        this.upload.dragHandle( e );
    },
    transferStart: function( e ) {
        this.upload.transferStart( e, this );
    },
    upload: {

        // gridView: function() {
        //     return this;
        // },

        uploadUrl: function( gridView ) {

            var region = adf.page.getRegion(gridView.regionName);
            return region.$el.find('.adf-grid-actions [data-action-type=upload]').attr('href');

        },

        dragHandle: function( e ) {

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
        transferStart: function( e, gridView ){

            var file;

            this.gridView = gridView;

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

            var files = e.target.files || e.dataTransfer.files;

            // for( var i = 0; file = files[i]; i++ ) {
            for( var i = 0; i < files.length; i++ ){

                file = files[i];

                var xhr = new XMLHttpRequest();

                if (xhr.upload && file.size <= 30000000) {
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
                    xhr.open('POST', this.uploadUrl( gridView ), true);
                    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                    xhr.setRequestHeader('X-File-Name', file.name);
                    xhr.send(file);
                }else{
                    console.log('file not uploaded',file);
                }

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

            if( event.currentTarget.status == 200 ){

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
            gridSortAttribute = this.collection.sortAttribute;

        // Toggle sort if the current column is sorted
        if (columnName === gridSortAttribute) {
            this.collection.sortDirection *= -1;
        } else {
            this.collection.sortDirection = 1;
        }

        // Adjust the indicators.  Reset everything to hide the indicator
        $triggerObj.closest('thead').find('.sort-trigger').removeClass('sort-up sort-down');

        // Now show the correct icon on the correct column
        if (this.collection.sortDirection == 1) {
            $triggerObj.addClass('sort-up');
        } else {
            $triggerObj.addClass('sort-down');
        }

        // Now sort the collection
        this.collection.sortRecords(columnName);

    }


});
