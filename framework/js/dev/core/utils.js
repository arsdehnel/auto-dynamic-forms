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
    string: {
        underscore: function( string ) {
            return string.replace(/([A-Z])/g, function($1){return '_'+$1.toLowerCase();});
        },
        escape: function( string ) {
            // copied the below from the underscore library itself and remove the &, < and > escaping from the escape map
            var escapeMap = {
                '"': '&quot;',
                "'": '&#x27;',
                '`': '&#x60;'
            };
            var createEscaper = function(map) {
                var escaper = function(match) {
                  return map[match];
                };
                // Regexe   s for identifying a key that needs to be escaped
                var source = '(?:' + _.keys(map).join('|') + ')';
                var testRegexp = RegExp(source);
                var replaceRegexp = RegExp(source, 'g');
                return function(string) {
                  string = string == null ? '' : '' + string;
                  return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
                };
            };
            return createEscaper(escapeMap)(string);// _.escape(string);
        },
        camelize: function( string ) {
            // added this bit to handle the situation where the current string value is all uppercase
            if( string.toUpperCase() === string ){
                string = string.toLowerCase();
            }
            return string.replace(/[_.-](\w|$)/g, function (_,x) {
                return x.toUpperCase();
            });
        },
        capitalize: function( string ) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        querystringToObj: function( string ) {
            var oResult = {};
            var aQueryString = string.split('&');//(location.search.substr(1)).split("&");
            for (var i = 0; i < aQueryString.length; i++) {
                var aTemp = aQueryString[i].split('=');
                if (aTemp[1].length > 0) {
                    oResult[aTemp[0]] = decodeURIComponent(aTemp[1]);
                }
            }
            return oResult;

        },
        substitute: function( inputString, inputData ){
            var tokenArray = ( inputString ? inputString.split('##') : [] );
            var returnString = tokenArray[0];
            for( var i = 1; i < tokenArray.length; i++ ){
                if( i % 2 === 1 ){
                    if( inputData[tokenArray[i].toLowerCase()] ){
                        returnString += inputData[tokenArray[i].toLowerCase()];
                    }
                }else{
                    returnString += tokenArray[i];
                }
            }
            return returnString;
        }
    },
    emToPx: function( context, emValue ){
        return emValue * parseFloat( getComputedStyle( context || document.documentElement ).fontSize );
    },
    prepareDebug: function( $element ){
        var dataObj = $element.data();
        _.each(dataObj,function(dataItem, index){
            if (typeof dataItem === 'function' ){
                delete dataObj[index];
            }
        });
        $element.append(ADF.templates.utils.debugData({data:dataObj}));
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
    inputHandlerRefresh: function( $context ) {

        if( !$context ){
            $context = adf.page.$el;
        }

        $('.adf-datepicker',$context).datepicker({
            dateFormat: 'mm/dd/yy',
            changeYear: true,
            yearRange: '-10:+50'
        });
        // TODO: dynamically set the minDate to either NOW or the current value and then set the max date to 50 years from now
        $('.adf-datetimepicker',$context).datetimepicker({
            dateFormat: 'mm/dd/yy',
            timeFormat: 'HH:mm',
            changeYear: true,
            yearRange: '-10:+50'
        });
        this.selectFancy.refresh();

    },
    selectFancy: {
        render: function() {

            // TODO: dynamically determine if user can clear selection
            // TODO: dynamically determine if user can add new option
            // TODO: handle the readonly assignment in the constructor rather than calling the select2() function again
            // TODO: allow for ajax lookup to be dictated through some data- attributes

            var settings = {
                dropdownAutoWidth : true,
                allowClear : true,
                formatResult : ADF.utils.selectFancy.template,
                matcher: ADF.utils.selectFancy.matcher
            };

            $.extend( settings, arguments[0] );

            var selectFancyObj = settings.selectFancyObj;

            delete settings.selectFancyObj;

            // TODO: remove this IF condition (maybe) if we figure out why sometimes this isn't available
            // if( selectFancyObj.select2 ){
                // selectFancyObj.select2(settings);
                selectFancyObj.chosen(settings);
                if( selectFancyObj.attr('readonly') === 'readonly' ){
                    selectFancyObj.select2('readonly',true);
                }
            // }

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
            return ADF.templates.inputHelpers.select2Record( entryObj );

        },
        refresh: function() {

            /*
            $('body .select-fancy:input').not('.select2-offscreen').each(function(){
                // console.log($(this));
                ADF.utils.selectFancy.render({
                    selectFancyObj : $(this)
                });
            });
*/

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

        // console.log('Function caller: ',Function.caller);

        // TODO: log all messages into "level" specific arrays
        // TODO: somehow know when there is a line number and file reference so the message in the messagesWindow could be a link

        var args = Array.prototype.slice.call(arguments);

        // remove first argument
        var level = ( args[0] ? args.shift().toLowerCase() : false );

        // handle some process not passing in anything
        if( !level ){
            return;
        }

        if( ADF.config.get('messages').levels[level] ){

            var levelObj = ADF.config.get('messages').levels[level];

            // TODO: extend this to present errors as modals
            switch( levelObj.displayMethod ){
                case 'confirm':
                    confirm(args);
                    break;
                case 'messagesWindow':
                    // TODO: handle errors somehow before the adf and adf.page are defined
                    // since we might have an error before the page loads up we'll do this for a bit to see if we can get into the messages window
                    if( adf && adf.page && adf.page.getRegion('messagesWindow') ){
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
                        if( window.console ){
                            console[level](args);
                        }
                    }
                    break;
                case 'console':
                    // since we are just logging it we add a prefix item to the logs just to try and be clear where it came from
                    args.unshift('[ADF]');
                    if( window.console ){
                        console[level](args);
                    }
                    break;

            }

        }else{
            ADF.utils.message('error','unexpected level'+ADF.utils.printObject(args));
        }

    },

    printObject: function(obj){
        return JSON.stringify(obj,null,'\t').replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;');
    },

    buildADFserializedArray: function( fieldsCollection, fieldsObject, recordModel ) {

        var dataArray = [];
        var crntVal;

        if( fieldsCollection ){
            fieldsCollection.each(function( model ) {
                // console.log(model,dataModel);
                if( _.isUndefined( recordModel ) || _.isNull( recordModel ) || !recordModel ){
                    crntVal = model.get('currentValue');
                }else{
                    crntVal = recordModel.get(model.get('name'));
                }

                // TODO: figure out a way to use the model here to determine if a given value should be escaped or not
                // crntVal = _.escape(crntVal);
                // adding a custom escape function because we need to escape single quotes but the _.escape() function also escapes things like &, < and > into their html entities which we don't want
                crntVal = ADF.utils.string.escape( crntVal );

                dataArray.push({
                    dyn_frm_fld_mstr_id : model.get('fldMstrId'),
                    field_code : model.get('name'),
                    data_value : crntVal
                });

            });
        }

        if( fieldsObject ){

            _.each(fieldsObject,function( fieldVal, fieldKey ) {

                // check to make sure this field code isn't already in the data array from the fieldsCollection portion of this
                if( _.where(dataArray,{field_code:ADF.utils.string.underscore( fieldKey )}).length === 0 ){

                    if( _.isUndefined( recordModel ) || _.isNull( recordModel ) || !recordModel ){
                        crntVal = fieldVal;
                    }else{
                        crntVal = recordModel.get(fieldKey);
                    }

                    dataArray.push({
                        field_code : ADF.utils.string.underscore( fieldKey ),
                        // adding a custom escape function because we need to escape single quotes but the _.escape() function also escapes things like &, < and > into their html entities which we don't want
                        data_value : ADF.utils.string.escape(crntVal)
                    });

                }

            });            
        }

        // var serializeOutput = _.map(dataArray,function(dataItem){
        //     // console.log(dataItem.field_code+': '+dataItem.data_value+' (fldMstrId: '+dataItem.dyn_frm_fld_mstr_id+')')
        //     return dataItem.field_code+': '+dataItem.data_value+' (fldMstrId: '+dataItem.dyn_frm_fld_mstr_id+')';
        // });

        if( adf.debugEnabled ){
            if( dataArray.length > 0 ){        
                console.log('Data Array:');
                console.table(dataArray);
            }else{
                console.log('Data array empty');
            }
            // ADF.utils.message('debug','buildADFserializedArray array',_.map(dataArray,function(dataItem){
            //     return dataItem.field_code+': '+dataItem.data_value+' (fldMstrId: '+dataItem.dyn_frm_fld_mstr_id+')';
            // }));
        }

        return dataArray;

    },

    userPrefs: {

        get: function( item ) {

            return ( adf.userPrefs[item] ? adf.userPrefs[item] : ADF.config.get('userPrefDefaults')[item] );

        },

        set: function( item, value ) {

            adf.userPrefs[item] = value;

            localStorage.setItem('userPreferences',JSON.stringify(adf.userPrefs));

        }

    },

    cookies: {
        get: function (sKey) {
            if (!sKey) {
                return null;
            }
            return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
        },
        set: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return false;
            }
            var sExpires = '';
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
                        break;
                    case String:
                        sExpires = '; expires=' + vEnd;
                        break;
                    case Date:
                        sExpires = '; expires=' + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
            return true;
        },
        remove: function (sKey, sPath, sDomain) {
            if (!this.hasItem(sKey)) {
                return false;
            }
            document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
            return true;
        },
        has: function (sKey) {
            if (!sKey) {
                return false;
            }
            return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
        },
        keys: function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
                aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
            }
            return aKeys;
        }
    }
};