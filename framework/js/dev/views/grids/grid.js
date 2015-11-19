/*global
ADF,
Marionette,
adf,
_
*/
ADF.Grids.GridView = Marionette.View.extend({
    className: 'adf-grid',
    tagName: 'table',
    template: ADF.templates.grids.table,
    initialize: function( options ) {
        ADF.utils.message('log','GridView Initialized', options );
        this.regionName = options.regionName;
        var gridView = this;
        this.region = adf.page.getRegion(gridView.regionName);
        this.uploadFormEl = gridView.$el.siblings('.adf-grid-upload-form');
        this.dragTextEl = this.uploadFormEl.find('.adf-grid-upload-text');

        this.setElement(this.$el.html(this.template()));

        gridView.headersView = new ADF.Grids.HeadersView({
            el: gridView.$el.find('thead')[0],
            collection: this.region.fieldsCollection,
            regionName: gridView.regionName,
            gridView: gridView
        });

        gridView.bodyView = new ADF.Grids.BodyView({
            el: gridView.$el.find('tbody')[0],
            collection: new ADF.RecordsCollection(null,{
                regionName: gridView.regionName,
                region: gridView.region,
                sortAttribute: gridView.region.$el.attr('data-record-sort-attribute')
            }),            
            regionName: gridView.regionName,
            gridView: gridView
        });

        gridView.columnSelect = new ADF.Core.ColumnSelectView({
            el: gridView.$el.find('.adf-grid-column-select')[0],
            model: new ADF.DropdownMenuModel({footerOptions: []}),
            collection: this.region.fieldsCollection,
            region: gridView.region
        });

        gridView.gridActions = new ADF.Grids.ActionsView({
            el: gridView.$el.find('.adf-grid-actions')[0],
            model: new ADF.DropdownMenuModel({footerOptions: []}),
            collection: this.region.actionsCollection,
            gridView: gridView,
            region: gridView.region
        });

        // this.listenTo(region.fieldsCollection,'change:checkedInd',this._updateRowsFieldsCollections);
        gridView.uploadFormEl.filedrop({
            fallback_id: 'adf-grid-upload-input',   // an identifier of a standard file input element, becomes the target of "click" events on the dropzone
            url: '../service/excel-conversion/upload-file.action',              // upload handler, handles each file separately, can also be a function taking the file and returning a url
            paramname: 'adf_file',          // POST parameter name used on serverside to reference file, can also be a function taking the filename and returning the paramname
            withCredentials: false,          // make a cross-origin request with cookies
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
            allowedfiletypes: [], // Empty array means no restrictions
            allowedfileextensions: ['.xls','.xlsx','.csv'],
            maxfiles: 25,
            maxfilesize: 20,    // max file size in MBs
            docOver: function() {
                gridView.region.$el.addClass('drag-target');
                gridView.dragTextEl.text(gridView.dragTextEl.data('drag-target-text'));
            },
            docLeave: function() {
                gridView.region.$el.removeClass('drag-target');
                gridView.dragTextEl.text('');
            },
            dragOver: function() {
                gridView.$el.addClass('drag-on');
                gridView.dragTextEl.text(gridView.dragTextEl.data('drag-on-text'));
            },
            dragLeave: function() {
                gridView.region.$el.removeClass('drag-on');
                gridView.dragTextEl.text('');
            },
            uploadStarted: function(i, file, len){
                gridView.region.$el.removeClass('drag-target drag-on');
                gridView.dragTextEl.text('');
            },
            uploadFinished: function(i, file, response, time) {

                var responseFieldGroups = [];

                // response is the data you got back from server in JSON format.
                if( response.success ){
                    responseFieldGroups = _.partition(response.data.headers,function(header){
                        return gridView.headersView.collection.findWhere({name:header.toLowerCase()});
                    });
                    // index 1 of that array gives the ones that do NOT match and should be communicated to the user that something didn't match
                    _.each(responseFieldGroups[1],function(mismatchedField){
                        ADF.utils.message('warn','Upload contained '+mismatchedField+' as a header which does not match a field in this grid');
                    });
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
            // TODO: use progressUpdated to provide feedback to the user that something is happening
            // progressUpdated: function(i, file, progress) {
            //     // this function is used for large files and updates intermittently
            //     // progress is the integer value of file being uploaded percentage to completion
            // },
        });

        this._super();

    },
    ui : {
        recordCounter   : '.record-counter'
    },    
    render: function() {
        var gridView = this;
        gridView.bindUIElements();
        this.updateRecordCounter(true);
        gridView.headersView.render();
        gridView.columnSelect.render();
        gridView.gridActions.render();
        gridView.bodyView.render();
        gridView.$el.trigger('adfGridLoaded');
    },
    updateRecordCounter: function( reset ){
        if( reset ){
            this.recordsRendered = 0;
        }else{
            this.recordsRendered++;
        }
        this.ui.recordCounter.text('Rendered '+this.recordsRendered+' of '+this.bodyView.collection.length);
    }

});
