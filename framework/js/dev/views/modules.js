/*global
ADF,
Marionette,
adf
*/
ADF.ModulesView = Marionette.CollectionView.extend({

    template: ADF.templates.moduleListWrapper,
    childView: ADF.ModuleView,
    childViewContainer: '.module-list-wrapper',
    childViewOptions: function() {
        return { regionName: this.regionName };
    },
    initialize: function( options ) {
        ADF.utils.message('debug','ModulesView Initialized', options );
        this.regionName = options.regionName;
    },
    render: function() {

        // the normal render
        var modulesView = this;
        modulesView._super();

        // rendering the 'actions' for a given form
        // start by getting the region since that is where the actions are kept
        var region = adf.page.getRegion(modulesView.options.regionName);

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

    }

});

// ADF.ModulesView = Backbone.View.extend({

//     className: 'ADF-modules',

//     el: '.ADF-modules',

//     childView: ADF.ModuleView,

//     initialize: function(opts){
//         var modulesView = this;

//         modulesView.target = opts.target;
//         modulesView.pageView = opts.pageView;

//         ADF.utils.log('ModulesView initialized', opts);

//         modulesView.fieldsColl = new ADF.FieldsCollection();
//         modulesView.recordsColl = new ADF.RecordsCollection(null,{saveUrl:modulesView.target.attr('data-record-save-url'),newUrl:modulesView.target.attr('data-record-new-url')});
//         modulesView.actionsColl = new ADF.ActionsCollection();

//         this.listenTo(this,'modulesWrapperRendered', function(){

//             modulesView.listenTo(modulesView.fieldsColl,'add',function(model){
//                 var fieldView = new ADF.FieldView({parentModulesView : modulesView, model:model});
//                 model.fieldView = fieldView;
//             });

//             modulesView.listenTo(modulesView.recordsColl,'add',function(model){
//                 var recordView = new ADF.RecordView({model:model,parentModulesView:modulesView});
//                 model.recordView = recordView;
//             });

//             modulesView.listenTo(modulesView.actionsColl,'add',function(model){
//                 var actionView = new ADF.ActionView({model:model});
//                 model.actionView = actionView;
//             });

//             modulesView.ajax( opts );

//         });

//         this.listenTo(this,'ajaxLoaded', function(){

//             modulesView.renderModules();

//         });

//         this.listenTo(this,'modulesRendered', function(){

//             // TODO: somehow setup these to not care which order they happen in (issue is present in form-builder)

//             if( modulesView.$el.hasClass('dnd-source') ){

//                 modulesView.dndSourceInit({destroy: true});
//                 _.each(modulesView.pageView.dndTargets,function(element, index, array){
//                     element.dndTargetInit({destroy: true});
//                 });
//                 modulesView.pageView.dndSources.push(modulesView);

//             }else if( modulesView.$el.hasClass('dnd-target') ){

//                 modulesView.dndTargetInit({destroy: true});
//                 _.each(modulesView.pageView.dndSources,function(element, index, array){
//                     element.dndSourceInit({destroy: true});
//                 });
//                 modulesView.pageView.dndTargets.push(modulesView);

//             }

//             ADF.utils.spin(opts.target, { stop: true } );

//         });

//         modulesView.render();

//     },

//     events: {
//         // ACTIONS
//         'click .btn-save'                     : 'saveModules'
//     },

//     render: function() {

//         var modulesView = this;

//         this.setElement(modulesView.target);

//         modulesView.trigger('modulesWrapperRendered');

//     },

//     renderModules: function() {

//         var modulesView = this;
//         modulesView.$el.sortable('destroy');

//         for ( var j = 0; j < modulesView.recordsColl.models.length; j++ ) {

//             modulesView.recordsColl.models[j].recordView.renderModule({
//                 target : modulesView.$el,
//                 fields : modulesView.fieldsColl.models
//             });

//         }

//         for ( var j = 0; j < modulesView.actionsColl.models.length; j++ ) {

//             // console.log(modulesView.actionsColl.models[j]);

//             modulesView.actionsColl.models[j].actionView.render({
//                 target : modulesView.$el
//             });

//         }

//         modulesView.trigger('modulesRendered');

//     },

//     ajax: function( opts ) {

//         var modulesView = this;

//         $.ajax({
//             url: opts.url,
//             type: opts.method,
//             data: opts.data,
//             dataType: ( opts.resultType === 'html' ? 'html' : 'json' ),
//             beforeSend: function(){
//                 ADF.utils.spin(opts.target);
//             },
//             complete: function( jqXHR, textStatus ){

//                 if( jqXHR.status === 200 ){

//                     if( !jqXHR.hasOwnProperty('responseJSON') ){
//                         jqXHR.responseJSON = JSON.parse(jqXHR.responseText);
//                     }

//                     ADF.utils.log('AJAX message: '+jqXHR.responseJSON.message);

//                     if( jqXHR.responseJSON.success === true ){

//                         if( jqXHR.responseJSON.data.hasOwnProperty('records') ){
//                             modulesView.recordsColl.add( jqXHR.responseJSON.data.records );
//                         }

//                         if( jqXHR.responseJSON.data.hasOwnProperty('fields') ){
//                             modulesView.fieldsColl.add( jqXHR.responseJSON.data.fields );
//                         }

//                         if( jqXHR.responseJSON.data.hasOwnProperty('actions') ){
//                             modulesView.actionsColl.add( jqXHR.responseJSON.data.actions );
//                         }

//                         modulesView.trigger('ajaxLoaded');

//                     }else{

//                         if( jqXHR.responseJSON.hasOwnProperty('errors') ){
//                             _.each(jqXHR.responseJSON.errors,function( element, index, array ){
//                                 alert(element);
//                             });
//                         }else{
//                             alert('Looks like the ajax response wasn\'t quite what was expected from '+opts.url+'.  Probably need to get a TA involved.');
//                         }

//                     }

//                 }else if( jqXHR.status === 404 ){

//                     alert('Page Not Found<br>The ajax calls is being made to a page ('+opts.url+') that could not be found. Probably going to need to get a TA involved to see what is going on here.');

//                 }else{

//                     alert(textStatus+'! Probably going to need to get a TA involved.');
//                     console.log('opts',opts);
//                     console.log(jqXHR);
//                     // target.html(jqXHR.responseText);

//                 }

//             }
//         });

//     },

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