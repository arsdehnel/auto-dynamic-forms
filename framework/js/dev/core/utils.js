/*global
ADF,
_,
$,
adf
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
    arrayToHTML: function( array, parentElement, childElement ) {
        var retElement = document.createElement(parentElement);
        _.each( array, function(item) {
            var child = document.createElement(childElement);
            child.appendChild(document.createTextNode(item));
            retElement.appendChild(child);
        });
        return retElement.innerHTML;
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

        // TODO: log all messages into "level" specific arrays

        // var args = Array.slice(arguments);
        var args = Array.prototype.slice.call(arguments);

        // remove first argument
        var level = args.shift().toLowerCase();

        if( ADF.config.get('messages').levels[level] ){

            var displayMethod = ADF.config.get('messages').levels[level].displayMethod;

            // TODO: extend this to present errors as modals
            switch( displayMethod ){
                case 'messagesWindow':
                    adf.page.getRegion('messagesWindow').messageWindowView.collection.add([
                        {
                            level: level,
                            label: 'An error has occurred',
                            content: ADF.utils.arrayToHTML( args, 'ul', 'li' )
                        }
                    ]);
                    adf.page.getRegion('messagesWindow').show();
                    break;
                case 'log':
                    // since we are just logging it we add a prefix item to the logs just to try and be clear where it came from
                    args.unshift('[ADF]');
                    console[level](args);
                    break;
                default:
                    // since we are just logging it we add a prefix item to the logs just to try and be clear where it came from
                    args.unshift('[ADF]');
                    console[level](args);

            }

        }else{
            alert('unexpected level'+ADF.utils.printObject(args));
        }

    },

    printObject: function(obj){
        return JSON.stringify(obj,null,'\t').replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;');
    },

};