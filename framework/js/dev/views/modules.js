/*global
ADF,
Marionette,
adf,
$
*/
ADF.ModulesView = Marionette.CollectionView.extend({

    template: ADF.templates.moduleListWrapper,
    childView: ADF.ModuleView,
    childViewContainer: '.module-list-wrapper',
    childViewOptions: function() {
        return { regionName: this.regionName };
    },
    events: {
        'adf-module-received'           : 'moduleReceived',
        'adf-module-sent'               : 'moduleSent',
        'click .btn'                    : 'handleAction'
    },
    initialize: function( options ) {
        ADF.utils.message('log','ModulesView Initialized', options );
        this.regionName = options.regionName;
        this.fieldsCollection = adf.page.getRegion(this.regionName).fieldsCollection;
        this.dndSource = options.dndSource;
        this.dndTarget = options.dndTarget;

        if( this.dndSource ){
            adf.page.dndSources.push(this);
        }
        if( this.dndTarget ){
            adf.page.dndTargets.push(this);
        }
    },
    render: function() {

        // the normal render
        var modulesView = this;
        // modulesView.$el.find('#ACTIONS-field-wrap').remove();
        modulesView.$el.empty();
        modulesView._super();

        // console.log('within render',modulesView.collection);

        // rendering the 'actions' for a given form
        // start by getting the region since that is where the actions are kept
        var region = adf.page.getRegion(modulesView.options.regionName);

        // TODO: commonize this "action collection" handling since it's here and in the form view
        // see if we have any actions because if we don't we can stop right away
        if( region.actionsCollection.length > 0 ){
            modulesView.$el.append(ADF.templates.formRow({
                name: 'ACTIONS',
                fldMstrId: 0
            }));

            var childContainer = modulesView.$el.find('#ACTIONS-field-wrap .form-input');

            region.actionsCollection.each( function( action ) {
                var childView = new ADF.FormActionView({model:action});
                childContainer.append(childView.render());
            });

        }

        // drag and drop setup
        if( modulesView.dndSource ){

            modulesView.$el.sortable({
                handle: '.dnd-handle',
                connectWith: '.dnd-wrapper[data-adf-dnd-target=true]',
                placeholder: 'module-placeholder',
                stop: function(event, ui) {
                    ui.item.trigger('adf-module-drop', ui.item.index());
                },
                remove: function(event, ui) {
                    console.log('remove');
                    ui.item.trigger('adf-module-remove', ui.item.index());
                },
                activate: function( event, ui ) {
                    modulesView.$el.addClass('dnd-active');
                },
                deactivate: function( event, ui ) {
                    modulesView.$el.removeClass('dnd-active');
                }
            });

        }

    },
    handleAction: function(e) {
        e.preventDefault();
        var modulesView = this;
        var $targetObj = $(e.target).closest('a');
        var actionType = $targetObj.attr('data-action-type');
        // TODO: experiment with making this dynamic
        switch( actionType ){
            case 'save':
                modulesView.collection.each(function( moduleModel ){
                    moduleModel.url = $targetObj.attr('href');
                    moduleModel.save(null,{fieldsCollection: modulesView.fieldsCollection});
                });
                break;
            default:
                ADF.utils.message('error','Unexpected record action ('+actionType+') triggered.',$targetObj);
        }
    },
    moduleReceived: function( e, model, position ) {

        var modulesView = this;

        // TODO: fetch the new page detail object
        // console.log('modulesView moduleDrop',this.regionName,e,model,position);
        // console.log('record to be added at position',position);
        // this.collection.remove(model);
        // this.collection.each(function(model, index){
        //   var ordinal = index;
        //   if(index >= position){
        //     ordinal+=1;
        //   }
        //   // model.set('ordinal', ordinal);
        // });

        // model.set('ordinal', position);
        modulesView.collection.add(model, {at: position});
        // modulesView.collection.add(new ADF.RecordModel({}));
        // console.log(modulesView.collection);
        modulesView.render();
    },
    moduleSent: function( e, model, position ) {
        var modulesView = this;
        // console.log('moduleSent');
        modulesView.collection.remove(model);
    }


});


//     saveModules: function( e ){

//         e.preventDefault();

//         var modulesView = this;

//         _.each(modulesView.recordsColl.models, function( element, index, array ){

//             element.save(null,{});

//         });

//     },

//     dndSourceInit: function( opts ) {

//         var modulesView = this;

//         if( opts.destroy ){
//             // modulesView.$el.sortable('destroy');
//         }

//         modulesView.$el.sortable({
//             connectWith: '.dnd-wrapper.dnd-target'
//         }).bind('dragstart.h5s', function(e, ui) {
//             console.log(e);
//         });

//     },

//     dndTargetInit: function( opts ) {

//         var modulesView = this;
//         var $target;

//         if( opts.destroy ){
//             // modulesView.$el.sortable('destroy');
//         }

//         modulesView.$el.sortable({
//             connectWith: '.dnd-wrapper.dnd-source'
//         }).bind('dragstart.h5s', function(e, ui) {
//             console.log(e);
//         }).bind('sortupdate', function(e,ui) {

//             $target = $(e.target);

//             var nextRecordId = parseInt( ui.item.next().attr('id'), 10 );
//             var nextModel = modulesView.recordsColl.findWhere({id:nextRecordId});
//             var nextIdx = modulesView.recordsColl.indexOf(nextModel);

//             console.log( nextRecordId, nextModel, nextIdx );

//             // is the drag from an outside parent
//             if( ui.startparent.attr('id') !== ui.endparent.attr('id') ){

//                 console.log(ui.item.find(':input').serializeObject());

//                 $.ajax({
//                     url: modulesView.recordsColl.newUrl,
//                     type: 'POST',
//                     contentType: 'application/json',
//                     data: JSON.stringify(ui.item.find(':input').serializeObject()),
//                     dataType: 'json',
//                     beforeSend: function(){
//                         ADF.utils.spin(modulesView.$el);
//                     },
//                     complete: function( jqXHR, textStatus ){

//                         if( jqXHR.status === 200 ){

//                             if( !jqXHR.hasOwnProperty('responseJSON') ){
//                                 jqXHR.responseJSON = JSON.parse(jqXHR.responseText);
//                             }

//                             ADF.utils.log('AJAX message: '+jqXHR.responseJSON.message);

//                             if( jqXHR.responseJSON.success === true ){

//                                 if( jqXHR.responseJSON.data.hasOwnProperty('records') ){
//                                     modulesView.recordsColl.add( jqXHR.responseJSON.data.records, { at: nextIdx } );
//                                 }

//                                 modulesView.$el.empty();
//                                 modulesView.renderModules();

//                             }else{

//                                 if( jqXHR.responseJSON.hasOwnProperty('errors') ){
//                                     _.each(jqXHR.responseJSON.errors,function( element, index, array ){
//                                         alert(element);
//                                     });
//                                 }else{
//                                     alert('Looks like the ajax response wasn\'t quite what was expected from '+opts.url+'.  Probably need to get a TA involved.');
//                                 }

//                             }

//                         }else if( jqXHR.status === 404 ){

//                             alert('Page Not Found\n\nThe ajax calls is being made to a page ('+opts.url+') that could not be found. Probably going to need to get a TA involved to see what is going on here.');

//                         }else{

//                             alert(textStatus+'! Probably going to need to get a TA involved.');
//                             console.log('opts',opts);
//                             console.log(jqXHR);
//                             // target.html(jqXHR.responseText);

//                         }

//                     }
//                 });

//             // drag is happening within a list, just need to resort
//             }else{

//                 var thisId = parseInt( ui.item.attr('id'), 10 );
//                 var thisModel = modulesView.recordsColl.findWhere({id:thisId});
//                 var thisIdx = modulesView.recordsColl.indexOf(thisModel);
//                 modulesView.recordsColl.remove(thisModel);

//                 // TODO: HANDLE DRAG WITHIN TARGET
//                         // reorder: function(new_index, original_index) {
//                         //         // If nothing is being changed, don't bother
//                         //         if (new_index is original_index) return this
//                         //         // Get the model being moved
//                         //         temp = collection.at(original_index)
//                         //         // Remove it
//                         //         collection.remove(temp)
//                         //         // Add it back in at the new index
//                         //         collection.add(temp, {at: new_index))
//                         //         return this
//                         // }
//                 if( thisIdx > nextIdx ){
//                     modulesView.recordsColl.add( thisModel, { at: nextIdx } );
//                 }else{
//                     modulesView.recordsColl.add( thisModel, { at: ( nextIdx - 1 ) } );
//                 }
//                 modulesView.$el.empty();
//                 _.each( modulesView.recordsColl, function( element, index, array ){
//                     modulesView.recordsColl.models[index].set('read_order',( index * 10 ) + 10);
//                 });
//                 modulesView.renderModules();

//             }

//         }).bind('dragenter.h5s', function(e) {
//             if( $(e.target).parent().hasClass('dnd-target') ){
//                 $(e.target).css({
//                     background: 'orange'
//                 });
//             }
//         });


//     }

// });