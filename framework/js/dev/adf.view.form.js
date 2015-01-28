ADF.FormView = Marionette.CollectionView.extend({

    initialize: function( options ) {
        ADF.utils.message('log','[ADF] FormView Initialized', options );
    },

    events: {
        'change :input'                                   : 'submitParentForm',
        'submitAjax'                                      : 'submitFormAjax'
    },

    submitParentForm: function( event ) {

        $(event.target).closest('form').trigger('submitAjax');

    },

    submitFormAjax: function( event ) {

        var $form = $(event.target);
        var action = $form.attr('action');
        var region = adf.findRegion({
            attribute : 'el',
            value : action
        });

        if( $(action).size() > 0 ){

            ADF.utils.message('log','Found something to load into');

            region.ajax();

            // $.ajax({
            //     url: opts.url,
            //     type: opts.method,
            //     data: opts.data,
            //     dataType: ( opts.resultType === "html" ? "html" : "json" ),
            //     beforeSend: function(){
            //         autoAdmin.utils.spin(opts.target);
            //     },
            //     complete: function( jqXHR, textStatus ){

            //         if( jqXHR.status === 200 ){

            //             if( opts.resultType === 'html' ){

            //                 that.responseText = jqXHR.responseText;

            //             }else{

            //                 console.log('[autoAdmin] AJAX message: '+jqXHR.responseJSON.message);

            //                 if( jqXHR.responseJSON.success === true ){

            //                     if( jqXHR.responseJSON.data.hasOwnProperty('records') ){

            //                         that.recordsColl = new autoAdmin.RecordsCollection();
            //                         that.recordsColl.add(jqXHR.responseJSON.data.records);

            //                     }

            //                     if( jqXHR.responseJSON.data.hasOwnProperty('fields') ){

            //                         that.fieldsColl = new autoAdmin.FieldsCollection();
            //                         that.fieldsColl.add(jqXHR.responseJSON.data.fields);

            //                     }


            //                 }else{

            //                     if( jqXHR.responseJSON.hasOwnProperty('errors') ){
            //                         _.each(jqXHR.responseJSON.errors,function( element, index, array ){
            //                             alert(element);
            //                         })
            //                     }else{
            //                         alert("Looks like the ajax response wasn't quite what was expected from "+opts.url+".  Probably need to get a TA involved.");
            //                     }

            //                 }

            //             }

            //             that.trigger('ajaxLoaded');

            //         }else if( jqXHR.status === 404 ){

            //             alert("Page Not Found\n\nThe ajax calls is being made to a page ("+opts.url+") that could not be found. Probably going to need to get a TA involved to see what is going on here.");

            //         }else{

            //             alert(textStatus+'! Probably going to need to get a TA involved.');
            //             console.log('opts',opts);
            //             console.log(jqXHR);
            //             target.html(jqXHR.responseText);

            //         }

            //     }
            // })

        }else{
            ADF.utils.message('error','Trying to load ajax but destination element could not be found on the page');
        }

    }
});

//     render: function( opts ){

//         var that = this;
//         var $form = opts.target;
//         var fieldsArray = opts.ajaxView.fieldsColl.models;
//         var fieldObj = {};

//         $form.removeClass('loading').html('');

//         for ( var i = 0; i < fieldsArray.length; i++ ) {

//             fieldObj = {};

//             fieldObj = fieldsArray[i];

//             fieldObj.set("inputField", fieldsArray[i].render() );

//             $form.append(autoAdmin.templates.formField( fieldObj.toJSON() ))

//         }

//         $form.find('.select2').each(function(){
//             autoAdmin.utils.renderSelect2({
//                 select2Obj : $(this)
//             })
//         })

//     },

// });