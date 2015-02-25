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
    isObject: function( obj ) {
        return Object.prototype.toString.call( obj ) === '[object Object]';
    },
    arrayToHTML: function( array, parentElement, childElement ) {
        var retElement = document.createElement(parentElement);
        _.each( array, function(item) {
            var child = document.createElement(childElement);
            if( ADF.utils.isObject( item ) ){
                // TODO: handle an item of the array being an object
                child.appendChild(document.createTextNode(item));
            }else{
                child.appendChild(document.createTextNode(item));
            }
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

            // TODO: dynamically determine if user can clear selection
            // TODO: dynamically determine if user can add new option
            // TODO: handle the readonly assignment in the constructor rather than calling the select2() function again
            // TODO: allow for ajax lookup to be dictated through some data- attributes

            var settings = {
                dropdownAutoWidth : true,
                allowClear : true,
                formatResult : ADF.utils.select2.template,
                matcher: ADF.utils.select2.matcher
            };

            $.extend( settings, arguments[0] );

            var select2Obj = settings.select2Obj;

            delete settings.select2Obj;

            // TODO: remove this IF condition (maybe) if we figure out why sometimes this isn't available
            if( select2Obj.select2 ){
                select2Obj.select2(settings);
                if( select2Obj.attr('readonly') === 'readonly' ){
                    select2Obj.select2('readonly',true);
                }
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
        // TODO: somehow know when there is a line number and file reference so the message in the messagesWindow could be a link

        // var args = Array.slice(arguments);
        var args = Array.prototype.slice.call(arguments);

        // remove first argument
        var level = args.shift().toLowerCase();

        if( ADF.config.get('messages').levels[level] ){

            var levelObj = ADF.config.get('messages').levels[level];

            // TODO: extend this to present errors as modals
            switch( levelObj.displayMethod ){
                case 'messagesWindow':
                    // TODO: handle errors somehow before the adf and adf.page are defined
                    // since we might have an error before the page loads up we'll do this for a bit to see if we can get into the messages window
                    if( adf.page && adf.page.getRegion('messagesWindow') ){
                        adf.page.getRegion('messagesWindow').messagesWindowView.collection.add([
                            {
                                level: level,
                                label: levelObj.label,
                                originalArguments: args
                            }
                        ]);
                        adf.page.getRegion('messagesWindow').show();
                    }else{
                        args.unshift('[ADF]');
                        console[level](args);
                    }
                    break;
                case 'console':
                    // since we are just logging it we add a prefix item to the logs just to try and be clear where it came from
                    args.unshift('[ADF]');
                    console[level](args);
                    break;

            }

        }else{
            alert('unexpected level'+ADF.utils.printObject(args));
        }

    },

    printObject: function(obj){
        return JSON.stringify(obj,null,'\t').replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;');
    },

    dataSerialize: function( fieldCollection, dataModel ){

        var dataArray = [];
        var crntVal;

        fieldCollection.each(function( model ) {
            // console.log(model,dataModel);
            if( _.isUndefined( dataModel ) ){
                crntVal = model.get('currentValue');
            }else{
                crntVal = dataModel.get(model.get('name'));
            }

            dataArray.push({
                dyn_frm_fld_mstr_id : model.get('fldMstrId'),
                field_code : model.get('name'),
                data_value : crntVal
            });
        });

        return dataArray;

    }

};