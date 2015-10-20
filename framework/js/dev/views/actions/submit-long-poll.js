/*global
ADF,
adf,
$
*/
ADF.Actions.SubmitLongPoll = ADF.Core.ActionView.extend({
    events: {
        'click'                                 : 'submitLongPoll',
        'formSubmitted'                         : 'checkLongPoll'
    },   
    initialize: function( options ){
        ADF.utils.message('log','Actions.SubmitLongPoll initialized', options );
        this._super();
        this.model.set('dataAttributes',this.model.get('dataAttributes').concat([{'name':'submit-type','value':'ajax'}]));
    },
    submitLongPoll: function(e) {
        // console.log('submitting long poll',e);
        e.preventDefault();
        adf.page.getRegion(this.options.regionName).formView.submitForm(e, this);
    },
    checkLongPoll: function( e, jqXhr ) {
        var responseJson = JSON.parse( jqXhr.responseText );
        var checkUrl = this.model._createDataAttrObj().longPollCheckUrl;
        var dataArray = ADF.utils.buildADFserializedArray( null, responseJson.data, false );
        if( jqXhr.status === 200 ){
            if( responseJson.success ){
                ADF.utils.spin(adf.page.$el);
                (function poll(){
                   setTimeout(function(){
                      $.ajax({ 
                        url: checkUrl, 
                        type: 'POST',
                        data: {adfSerializedData:JSON.stringify(dataArray)},
                        complete: function( jqXhr, textStatus ){
                            console.log(arguments);
                            if( jqXhr.responseJSON.data ){
                                ADF.utils.spin(adf.page.$el,{stop:true});
                            }else{
                                poll();
                            }
                        }
                      });
                  }, 800);
                })();
            }else{
                ADF.utils.message('error','Problem submitting the form for long polling',responseJson.errors.join(','));
            }
        }else{
            ADF.utils.message('error','Problem posting the form for long polling to begin',responseJson.errors.join(','));
        }
    }

});