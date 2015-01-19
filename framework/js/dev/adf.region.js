ADF.Region = Marionette.Region.extend({
    initialize: function(options){
        console.log('[ADF] Region Initialized',options);
        this.adfData = options.adfData;
        if( this.adfData.adfAjaxOnload ){
            this.ajax({
                url: this.adfData.adfAjaxUrl
            });
        }
    },
    ajax: function( options ){
        var region = this;
        console.log('[ADF] Ajax Call',options);
        $.ajax({
            url: options.url,
            type: ( options.method ? options.method : "GET" ),
            data: options.data,
            dataType: "json",
            beforeSend: function(){
                // ADF.utils.spin(region.$el);
            },
            complete: function( jqXHR, textStatus ){

                if( jqXHR.status === 200 ){

                    console.log('[ADF] AJAX message: '+jqXHR.responseJSON.message);

                    // this is custom depending on the calling region's type so we send it back
                    region.ajaxSuccessHandler(jqXHR.responseJSON);

                }else if( jqXHR.status === 404 ){

                    alert("Page Not Found\n\nThe ajax calls is being made to a page ("+options.url+") that could not be found. Probably going to need to get a TA involved to see what is going on here.");

                }else{

                    alert(textStatus+'! Probably going to need to get a TA involved.');
                    console.log('options',options);
                    console.log(jqXHR);
                    target.html(jqXHR.responseText);

                }

            }
        })
    }
});
