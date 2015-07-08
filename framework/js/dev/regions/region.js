/*global
ADF,
Marionette,
adf,
$
*/
ADF.Region = Marionette.Region.extend({
    // TODO: overlay region optionally can get data from caller region

    initialize: function(options){
        ADF.utils.message('log','Region Initialized',options);
        this.adfAjaxOnshow = ( options.adfAjaxOnshow ? options.adfAjaxOnshow : false );
    },
    show: function() {
        // TODO: this really shouldn't be in the region object, probably part of the view that we've associated with it...
        this.$el.removeClass('hide');

        if( adf.page.$el.hasClass('tsga-debug-enabled') ){
            ADF.utils.prepareDebug( this.$el );
        }

        if( this.options.adfRegionLabel ) {
            if( this.$el.find('[data-adf-region-label]').size() > 0 ) {
                this.$el.find('[data-adf-region-label]').html( this.options.adfRegionLabel );
            }else{
                // TODO: (99) make this have options as to what this should render like
                this.$el.prepend('<legend>'+this.options.adfRegionLabel+'</legend>');
            }
        }

        if(  this.options.adfAjaxOnshowDependentRegion ){
            console.log('load '+this.$el.attr('data-adf-ajax-onshow-dependent-region-id')+' with data from '+this.$el.attr('data-adf-ajax-onshow-dependent-region-data-fields'));
        }

        // this onShowData is meant to be used just for java passing data into the ADF request
        // and should NOT be used for calls within the ADF application code
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

        // handle the data separately so we can extend it at an attribute level
        // console.log('fieldscollection length',region.fieldsCollection.models.length);

        // var dataArray = ADF.utils.dataSerialize( region.fieldsCollection );
        var dataArray = ADF.utils.dataSerializeNonADFData( this.$el.find(':input:hidden').serializeObject() );
        dataArray = dataArray.concat(ADF.utils.dataSerialize( region.fieldsCollection ));

        var data = $.extend({adfSerializedData:JSON.stringify(dataArray)},region.options.adfAjaxData, options.data);

        // remove this so we can get all the other bits from options but don't overwrite the data we just created
        delete options.data;

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

                    alert(textStatus+'! Probably going to need to get a TA involved.');
                    console.log('settings',settings);
                    console.log(jqXHR);
                    region.$el.html(jqXHR.responseText);

                }

            }
        });
    }
});
