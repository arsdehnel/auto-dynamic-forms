/*global
ADF,
$
*/
ADF.Actions.LinkToAdfSubmissionView = ADF.Actions.GridDefaultView.extend({
    events: {
        'click  a'     : 'submitAdf'
    },
    initialize: function( options ){
        ADF.utils.message('log','Actions.LinkToAdfSubmission Initialized', options);
        this.gridView = options.gridView;
    },
    submitAdf: function( e ) {

        var modelUrl = this.model.get('url');
        var ajaxUrl = modelUrl.substr(0,modelUrl.indexOf('?'));
        var dataArray = ADF.utils.buildADFserializedArray( null, ADF.utils.string.querystringToObj( modelUrl.substr(modelUrl.indexOf('?')+1) ), false );

        e.preventDefault();

        $.ajax({ 
            url: ajaxUrl, 
            type: 'POST',
            data: {adfSerializedData:JSON.stringify(dataArray)},
            complete: function( jqXhr, textStatus ){
                if( jqXhr.status === 200 ){
                    if( jqXhr.responseJSON.success ){
                        ADF.utils.message('info','Submission worked, now what do we do?');
                    }else{
                        ADF.utils.message('error','Problem submitting the job',jqXhr.responseJSON.errors.join(','));
                    }
                }else{
                    ADF.utils.message('error','Problem posting to the submission process',jqXhr.responseJSON.errors.join(','));
                }
            }
        });

    }

});