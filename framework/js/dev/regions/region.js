/*global
ADF,
Marionette,
_,
$
*/
ADF.Region = Marionette.Region.extend({
    // TODO: overlay region optionally can get data from caller region

    initialize: function(options){
        ADF.utils.message('debug','Region Initialized',options);
        this.adfAjaxOnshow = ( options.adfAjaxOnshow ? options.adfAjaxOnshow : false );
    },
    show: function() {
        // TODO: this really shouldn't be in the region object, probably part of the view that we've associated with it...

        var onShowData = this.$el.find(':input[data-adf-onshow-data=true]').serializeObject();

        if( this.adfAjaxOnshow ){
            this.ajax({data:onShowData});
        }
    },
    ajax: function( options ){

        /*
            options.data    this should be a js object literal as it will be stringified once in the below call
        */
        var region = this;
        var settings = _.extend({data:JSON.stringify(region.options.adfAjaxData)}, options);

        ADF.utils.message('log','Ajax Call',options,settings);

        $.ajax({
            url: ( settings.url ? settings.url : region.options.adfAjaxUrl ),
            type: ( settings.method ? settings.method : 'POST' ),
            data: JSON.stringify(settings.data),
            beforeSend: function(){
                ADF.utils.spin(region.$el);
            },
            complete: function( jqXHR, textStatus ){

                ADF.utils.spin(region.$el, { stop: true } );

                if( jqXHR.status === 200 ){

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

                    alert(textStatus+'! Probably going to need to get a TA involved.');
                    console.log('settings',settings);
                    console.log(jqXHR);
                    region.$el.html(jqXHR.responseText);

                }

            }
        });
    }
});
