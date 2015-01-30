/*global
ADF,
Marionette,
_,
$
*/
ADF.Region = Marionette.Region.extend({
    // TODO: create new region for an overlay
    // TODO: overlay region optionally can get data from caller region

    initialize: function(options){
        ADF.utils.message('log','Region Initialized',options);
        this.adfAjaxOnload = ( options.adfAjaxOnload ? options.adfAjaxOnload : false );
    },
    show: function() {
        // TODO: this really shouldn't be in the region object, probably part of the view that we've associated with it...
        if( this.adfAjaxOnload ){
            this.ajax();
        }
    },
    ajax: function( options ){
        var region = this;
        var settings = _.extend({}, options);

        ADF.utils.message('log','Ajax Call',options,settings);

        $.ajax({
            url: ( settings.url ? settings.url : region.options.adfAjaxUrl ),
            type: ( settings.method ? settings.method : 'GET' ),
            data: settings.data,
            dataType: 'json',
            beforeSend: function(){
                // TODO: resolve issue with this emptying out the target element
                ADF.utils.spin(region.$el);
            },
            complete: function( jqXHR, textStatus ){

                if( jqXHR.status === 200 ){

                    ADF.utils.message('log','AJAX message: '+jqXHR.responseJSON.message);

                    // this is custom depending on the calling region's type so we send it back
                    ADF.utils.spin(region.$el, { stop: true } );
                    region.ajaxSuccessHandler(jqXHR.responseJSON);


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
