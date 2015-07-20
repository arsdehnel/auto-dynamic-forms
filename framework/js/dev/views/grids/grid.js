/*global
ADF,
Marionette,
adf,
$,
_
*/
ADF.Grids.GridView = Marionette.View.extend({
    className: 'adf-grid',
    tagName: 'table',
    template: ADF.templates.gridTable,
    initialize: function( options ) {
        ADF.utils.message('log','GridView Initialized', options );
        this.regionName = options.regionName;
        var gridView = this;
        var region = adf.page.getRegion(gridView.regionName);
        this.uploadFormEl = gridView.$el.siblings('.adf-grid-upload-form');
        this.dragTextEl = this.uploadFormEl.find('.adf-grid-upload-text');

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
        gridView.uploadFormEl.filedrop({
            fallback_id: 'adf-grid-upload-input',   // an identifier of a standard file input element, becomes the target of "click" events on the dropzone
            url: '../service/excel-conversion/upload-file.action',              // upload handler, handles each file separately, can also be a function taking the file and returning a url
            paramname: 'adf_file',          // POST parameter name used on serverside to reference file, can also be a function taking the filename and returning the paramname
            withCredentials: false,          // make a cross-origin request with cookies
            // data: {
            //     param1: 'value1',           // send POST variables
            //     param2: function(){
            //         return calculated_data; // calculate data at time of upload
            //     },
            // },
            // headers: {          // Send additional request headers
            //     'header': 'value'
            // },
            error: function(err, file) {
                switch(err) {
                    case 'BrowserNotSupported':
                        alert('browser does not support HTML5 drag and drop');
                        break;
                    case 'TooManyFiles':
                        alert('TooManyFiles');
                        break;
                    case 'FileTooLarge':
                    alert('FileTooLarge');
                        break;
                    case 'FileTypeNotAllowed':
                        alert('FileTypeNotAllowed');
                        break;
                    case 'FileExtensionNotAllowed':
                        alert('FileExtensionNotAllowed');
                        break;
                    default:
                        break;
                }
            },
            allowedfiletypes: [], //['image/jpeg','image/png','image/gif'],   // filetypes allowed by Content-Type.  Empty array means no restrictions
            allowedfileextensions: ['.xls','.xlsx','.png'], // file extensions allowed. Empty array means no restrictions
            maxfiles: 25,
            maxfilesize: 20,    // max file size in MBs
            docOver: function() {
                region.$el.addClass('drag-target');
                gridView.dragTextEl.text(gridView.dragTextEl.data('drag-target-text'));
            },
            docLeave: function() {
                region.$el.removeClass('drag-target');
                gridView.dragTextEl.text('');
            },
            dragOver: function() {
                gridView.$el.addClass('drag-on');
                gridView.dragTextEl.text(gridView.dragTextEl.data('drag-on-text'));
            },
            dragLeave: function() {
                region.$el.removeClass('drag-on');
                gridView.dragTextEl.text('');
            },

            // drop: function() {
            //     // user drops file
            //     alert('got it');
            // },
            uploadStarted: function(i, file, len){
                // a file began uploading
                // i = index => 0, 1, 2, 3, 4 etc
                // file is the actual file of the index
                // len = total files user dropped
                region.$el.removeClass('drag-target drag-on');
                gridView.dragTextEl.text('');
            },
            uploadFinished: function(i, file, response, time) {
                // response is the data you got back from server in JSON format.
                console.log(response);
                if( response.success ){
                    gridView.bodyView.collection.add(response.data.records,{at:0});
                }else{
                    if( response.errors ){
                        _.each(response.errors,function( element, index, array ){
                            ADF.utils.message('error',element);
                        });
                    }else{
                        ADF.utils.message('error','Looks like the ajax response wasn\'t quite what was expected.  Probably need to get a TA involved to help figure it out.');
                    }
                }
            },
            // progressUpdated: function(i, file, progress) {
            //     // this function is used for large files and updates intermittently
            //     // progress is the integer value of file being uploaded percentage to completion
            // },
            // globalProgressUpdated: function(progress) {
            //     // progress for all the files uploaded on the current instance (percentage)
            //     // ex: $('#progress div').width(progress+"%");
            // },
            // speedUpdated: function(i, file, speed) {
            //     // speed in kb/s
            // },
            // rename: function(name) {
            //     // name in string format
            //     // must return alternate name as string
            // },
            // beforeEach: function(file) {
            //     // file is a file object
            //     // return false to cancel upload
            //     console.log(file);
            //     return false;
            // },
            // beforeSend: function(file, i, done) {
            //     // file is a file object
            //     // i is the file index
            //     // call done() to start the upload
            //     done();
            // },
            // afterAll: function() {
            //     // runs after all files have been uploaded or otherwise dealt with
            // }
        });        

        this._super();

    },
    render: function() {
        var gridView = this;
        gridView.headersView.render();
        gridView.columnSelect.render();
        gridView.gridActions.render();
        gridView.bodyView.render();
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
