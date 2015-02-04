/*global
ADF,
Marionette,
$,
adf,
_
*/
ADF.FormView = Marionette.CollectionView.extend({

    childView: ADF.FieldView,

    initialize: function( options ) {
        ADF.utils.message('debug','FormView Initialized', options );
        $.extend(this.options,options);
        // this.options
    },

    events: {
        // select handlers
        'change select[data-adf-submit-on-change=true]'                     : 'submitParentForm',
        'change select[data-adf-dependent-field-lkup-on-change=true]'       : 'dependentFieldLkup',

        // button handlers
        'click .btn-submit'                                                 : 'submitParentForm',
        'click .btn-query'                                                  : 'submitParentForm',

        // form submission
        'submit'                                                            : 'submitForm'
    },

    render: function() {

        var formView = this;
        var region = adf.page[formView.options.regionName];
        // var actionHTML = '';
        console.log('beginning of formView render',region.actionsCollection);

        formView._super();
        formView.$el.append(ADF.templates.formRow({
            name: 'ACTIONS',
            fldMstrId: 0
        }));

        var childContainer = formView.$el.find('#ACTIONS-field-wrap .form-input');

        region.actionsCollection.each( function( action ) {
        // _.each(region.actionsCollection.models, function( action ) {

            console.log(action);

            var childView = new ADF.FormActionView({model:action});
            childContainer.append(childView.render());

        });



    },

    submitParentForm: function( e ) {

        e.preventDefault();
        $(e.target).closest('form').submit();

    },

    submitForm: function( e ) {

        var $form = $(e.target);
        var action = $form.attr('action');
        var region = adf.page.findRegion({
            attribute : 'el',
            value : action
        });

        if( action.substring(0,1) === '#' ){

            if( $(action).size() > 0 ){

                ADF.utils.message('log','Found something to load into');
                e.preventDefault();

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
        }else{
            // TODO: just let the form submit
            return true;
        }

    },

    dependentFieldLkup: function(e) {

        var formView = this;
        var dataArr = [];
        var $parentRow = $(e.target).closest('.form-row');
        var $form = $parentRow.closest('form');
        var parentData = $parentRow.data();
        var $target = $('#'+parentData.fieldLkupTarget+'-field-wrap');
        var childFields = parentData.adfDependentFieldLkupChildFields.split(',');

        e.preventDefault();
        ADF.utils.message('log','dependentFieldLkup',e);

        formView.collection.each(function( model ) {
            dataArr.push({
                'name' : model.get('fldMstrId'),
                'value' : model.get('currentValue')
            });
        });

        _.each(childFields,function(fieldId){
            var modelToRemove = formView.collection.filter(function( model ){
                return model.get('name') === fieldId;
            });
            formView.collection.remove(modelToRemove);
            $('#'+fieldId+'-field-wrap').remove();
        });

        if( $target.size() === 0 ){
            // TODO:somehow also remove any prefix/suffix for this field upon load of the new stuff
            // TODO:allow field to be dropped into the middle of a form rather than append to the form

            $target = $parentRow;
        }else{
            $target.remove();
            $target = $parentRow;
        }

        $.ajax({
            data: dataArr,
            url: parentData.adfDependentFieldLkupUrl,
            method: 'POST',
            beforeSend: function() {
                // TODO: spin target
                ADF.utils.spin($form);
            },
            complete: function( jqXHR, textStatus ) {
                ADF.utils.spin($form, { stop: true } );
                if( jqXHR.status === 200 ){
                    ADF.utils.message('debug','Dependent field lookup success',jqXHR);

                        if( jqXHR.responseJSON.data.hasOwnProperty('fields') ){

                        formView.collection.add(jqXHR.responseJSON.data.fields);

                        // TODO: add select2 renderer as part of the auto-rendering of the Marionette view
                        //         $form.find('.select2').each(function(){
                        //             autoAdmin.utils.renderSelect2({
                        //                 select2Obj : $(this)
                        //             })
                        //         })

                        // manually call render for some reason
                        // thought that Marionette handled this for us but it wasn't firing so this had to be added
                        formView.render();

                        }else{
                            ADF.utils.message('error','Dependent field lookup did not return any fields',jqXHR);
                        }

                }else{
                    ADF.utils.message('error','Dependent field lookup failed',jqXHR);
                    if( jqXHR.responseJSON.hasOwnProperty('errors') ){
                        _.each(jqXHR.responseJSON.errors,function( element, index, array ){
                            alert(element);
                        });
                    }else{
                        alert('Looks like the ajax response wasn\'t quite what was expected.  Probably need to get a TA involved to help figure it out.');
                    }
                }
            }
        });

    }
});