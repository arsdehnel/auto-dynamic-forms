/*global
ADF,
Marionette,
adf,
$
*/
ADF.Region = Marionette.Region.extend({
    initialize: function(options){
        ADF.utils.message('log','Region Initialized',options);
        this.adfAjaxOnshow = ( options.adfAjaxOnshow ? options.adfAjaxOnshow : false );
        this.name = options.regionName;
    },
    show: function() {
        // this.$el.removeClass('hide');

        if( adf.debugEnabled ){
            ADF.utils.prepareDebug( this.$el );
        }

        // // this onShowData is meant to be used just for java passing data into the ADF request
        // // and should NOT be used for calls within the ADF application code
        // var onShowData = this.$el.find(':input[data-adf-onshow-data=true]').serializeObject();

        if( this.adfAjaxOnshow ){
            this.ajax();
        }
    },
    hide: function() {
        this.$el.addClass('hide');
    },
    ajax: function( options ){

        /*
            options.data    this should be a js object literal as it will be stringified once in the below call
        */
        var region = this;

        var dataArray = ADF.utils.buildADFserializedArray( region.fieldsCollection, this.$el.find(':input:hidden').serializeObject(), false );        

        var data = $.extend({adfSerializedData:JSON.stringify(dataArray)},region.options.adfAjaxData);

        // use the combination of the above stuff
        var settings = $.extend({data:data}, options);

        ADF.utils.message('log','Ajax Call',options,settings);

        $.ajax({
            url: ( settings.url ? settings.url : region.options.adfAjaxUrl ),
            type: ( settings.method ? settings.method : 'POST' ),
            // data: JSON.stringify(settings.data),
            data: settings.data,
            beforeSend: function(){
                ADF.utils.spin(region.$el);
            },
            complete: function( jqXHR, textStatus ){

                ADF.utils.spin(region.$el, { stop: true } );

                // if we're showing a region we should remove any HIDE classes
                region.$el.closest('.hide').removeClass('hide');

                if( jqXHR.status === 200 ){

                    // some of the client sites are using an older version of jQuery that doesn't automatically supply the responseJSON attribute so we have to create it
                    if( !jqXHR.responseJSON ){
                        jqXHR.responseJSON = $.parseJSON(jqXHR.responseText);
                    }

                    if( jqXHR.responseJSON ){

                        ADF.utils.message('log','AJAX message: '+jqXHR.responseJSON.message);

                        // this is custom depending on the calling region's type so we send it back
                        region.ajaxSuccessHandler(jqXHR.responseJSON, settings);

                    }else{

                        ADF.utils.message('error','Malformed response received that does not have the expected JSON object',jqXHR,settings);

                    }

                }else if( jqXHR.status === 404 ){

                    ADF.utils.message('error','<h1>Page Not Found.</h1><p>The ajax calls is being made to a page ('+settings.url+') that could not be found. Probably going to need to get a TA involved to see what is going on here.');

                }else{

                    ADF.utils.message('error',textStatus+'! Probably going to need to get a TA involved.');
                    console.log('settings',settings);
                    console.log(jqXHR);
                    region.$el.html(jqXHR.responseText);

                }

            }
        });
    }
});
