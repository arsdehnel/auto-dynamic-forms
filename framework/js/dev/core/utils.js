/*global
ADF,
_,
$
*/
ADF.utils = {
    randomId: function() {
        return Math.floor( Math.random() * 3789.4);
    },
    capitalize: function( string ) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    camelize: function( string ) {
        return string.toLowerCase().replace(/[_.-](\w|$)/g, function (_,x) {
            return x.toUpperCase();
        });
    },
    objPropToLower: function( object ) {

        _.each(object,function(element, index, array){
            // console.log(element);
            if( index.toLowerCase() !== index ){
                object[index.toLowerCase()] = element;
                delete object[index];
            }
        });

        return object;

    },
    select2: {
        render: function() {

            // TODO dynamically determine if user can clear selection
            // TODO dynamically determine if user cna add new option

            var settings = {
                dropdownAutoWidth : true,
                allowClear : true,
                formatResult : ADF.utils.select2.template,
                matcher: ADF.utils.select2.matcher
            };

            $.extend( settings, arguments[0] );

            var select2Obj = settings.select2Obj;

            delete settings.select2Obj;

            select2Obj.select2(settings);

            if( select2Obj.attr('readonly') === 'readonly' ){
                select2Obj.select2('readonly',true);
            }

        },
        matcher: function(term, text, option) {
            return text.toUpperCase().indexOf(term.toUpperCase())>=0 || option.val().toUpperCase().indexOf(term.toUpperCase())>=0;
        },
        template: function( object, container, query ){

            //make this into a jQ object so we can retrieve the data- attribute data
            var optObj = $(object.element);
            var entryObj = {
                value: object.id,
                tooltip: optObj.data('tooltip')
            };

            //have to do some manual stuff to "convert" this object that we get
            //into a normal js object that can be used in hour handlebars template
            //rather than just a plain old js-built template
            if( object.id === object.text || object.text.length === 0 ){
                entryObj.label = object.id;
            }else{
                entryObj.label = '<span class="select2-option-value">'+object.id+'</span><span class="select2-option-label">'+object.text+'</span>';
            }
            return ADF.templates.inputHelperSelect2Record( entryObj );

        },
        refresh: function() {

            $('body .select2:input').not('.select2-offscreen').each(function(){
                ADF.utils.select2.render({
                    select2Obj : $(this)
                });
            });

        }
    },
    spin: function( targetObj, opts ) {

        var settings = {};
        var defaults = {
            emptyTarget : false
        };

        $.extend(settings, defaults, opts);

        if( settings.stop ){

            targetObj.removeClass('loading').find('.spinner').remove();

        }else{

            targetObj.removeClass('hide');

            if( settings.emptyTarget ){
                targetObj.empty();
            }

            targetObj.addClass('loading').spin();

        }

    },
    message: function() {

        // var args = Array.slice(arguments);
        var args = Array.prototype.slice.call(arguments);

        // remove first argument
        var level = args.shift();

        // add a prefix item to the logs just to try and be clear where it came from
        args.unshift('[ADF]');

        if( _.indexOf(ADF.config.get('messages').displayLevels,level) >= 0 ){

            // if( level.toLowerCase() === 'error' ){
            // if( level.toLowerCase() === 'error' ){
            //   adf.page.showBackdrop();
            //   adf.page.getRegion('modal').show( 'An error has occurred', ADF.utils.printObject( args ) );
            // }else{
              // TODO: extend this to present errors as modals
              console[level](args);
            // }

        }

        // TODO: log all messages into "level" specific arrays

//      // make sure our history log is ready
//          autoAdmin.log.history = autoAdmin.log.history || [];   // store logs to an array for reference

//          // output it if this browser supports that
//          if(window.console){
//          console.log( arguments );
//          }

//          // add a datestamp
//          args.push(Date.now());

//          // put it into our history log with the datestamp added
//          autoAdmin.log.history.push(args);

// below is from handlebars

  // var logger = {
  //   methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  //   // State enum
  //   DEBUG: 0,
  //   INFO: 1,
  //   WARN: 2,
  //   ERROR: 3,
  //   level: 3,

  //   // can be overridden in the host environment
  //   log: function(level, obj) {
  //     if (logger.level <= level) {
  //       var method = logger.methodMap[level];
  //       if (typeof console !== 'undefined' && console[method]) {
  //         console[method].call(console, obj);
  //       }
  //     }
  //   }
  // };

    },

    printObject: function(obj){
        return JSON.stringify(obj,null,'\t').replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;');
    },

};