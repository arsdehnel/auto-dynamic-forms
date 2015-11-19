/*global
$
*/
$.fn.formValidate = function( options ){
        
        var settings = $.extend({
            failClass: 'validation-fail',
            passClass: 'validation-pass'
        },options);
        
        var allValid = true;

        var checkFunctions = {

                nonempty: function( value, $field, containerData ){
                    return ( value && value.length ) ? true : false;
                },
                
                daterange: function( value, $field, containerData ){
                        
                    var valueDate = new Date(value);
                    var minDate = new Date();  
                    var maxDate = new Date();
                    
                    if( containerData.validationMinDate ){
                        if( containerData.validationMinDate.indexOf('sysdate') >= 0 ){
                            var stepValue = parseInt( (containerData.validationMinDate.split(/[+-]/))[1], 10 );
                            if( containerData.validationMinDate.indexOf('-') >= 0 ){
                                minDate.setDate(minDate.getDate() - stepValue); 
                            }else if( containerData.validationMinDate.indexOf('+') >= 0 ){
                                minDate.setDate(minDate.getDate() + stepValue); 
                            }
                        }else{
                            minDate = Date.parse(containerData.validationMinDate);
                        }
                    }else{
                        minDate = valueDate;
                    }
                    
                    if( containerData.validationMaxDate ){
                        if( containerData.validationMaxDate.indexOf('sysdate') >= 0 ){
                            console.log('uses sysdate');                  
                        }else{
                            maxDate = Date.parse(containerData.validationMaxDate);
                        }
                    }else{
                        maxDate = valueDate;
                    }
                    return valueDate >= minDate && valueDate <= maxDate;
                },

                // can test either a single email address or a comma-separated series of email addresses (spaces will be removed)
                email: function( value, $field, containerData ) {
                    var addresses = value.replace(/ /g,'').split(',');
                    var passed = 0;

                    // if empty string, then let it pass, we are checking for valid email(s), not non-empty
                    if( value.length === 0 ){ return true; }

                    $.each(addresses, function(addrIdx,addr) {
                        passed += ( settings.emailPattern.test(addr) ) ? 1 : 0;
                    });

                    return ( passed === addresses.length );
                },
                
                numeric: function( value, $field, containerData ) {
                    if( value.length === 0 ){ 
                        return true; 
                    }
                    var patt = /(^[1-9]\d*$)/;
                    return value.match(patt) && value.match(patt).length ? true : false;
                },
                
                url: function( value, $field, containerData ) {
                    if( value.length === 0 ){ return true; }
                    if( value.substr(1,4) !== 'http' ){
                        value = 'http://' + value;
                    }
                    return settings.urlPattern.test(value);      
                },

                lengthRange: function( value, $field, containerData ) {

                    var minLength = containerData.validationMinLength || value.length;
                    var maxLength = containerData.validationMaxLength || value.length;

                    if( value.length === 0 ){ return true; }

                    return value.length >= minLength && value.length <= maxLength;

                },

                numberRange: function( value, $field, containerData ) {

                    var minNumber = containerData.validationMinNumber || value;
                    var maxNumber = containerData.validationMaxNumber || value;

                    if( value.length === 0 ){ return true; }

                    return value.length >= minNumber && value.length <= maxNumber;

                },                
                
                regex: function( value, $field, containerData ) {
                    if( value.length === 0 ){ return true; }
                    
                    var regex = containerData.validationRegex;
                    var patt = new RegExp(regex, 'i');

                    if (value !== null && value !== ''){
                        value = patt.test(value);
                    }
                    return value;
                }
                

        };

        this.find(settings.selector).each(function(){
                
                var $container = $(this);
                var $input = $container.is(':input') ? $container : $container.find(':input');
                var value = ( $input.is(':checkbox') || $input.is(':radio') ) ? ( $input.is(':checked') ? $input.val() : false ) : $input.val();
                var containerData = $container.data();
                var checks = containerData.validationChecks ? containerData.validationChecks.split(',') : [];
                var valid = true;
                
                // reset
                $container.removeClass(settings.failClass+' '+settings.passClass).find('.validation-message').remove();
                
                // do checks
                $.each(checks,function(chkIdx, chkType){
                        
                    if( checkFunctions[chkType] && !checkFunctions[chkType](value,$input,containerData) ){
                                
                        $container.addClass(settings.failClass).append('<span class="validation-message">'+containerData['validationMsg'+chkType.charAt(0).toUpperCase() + chkType.slice(1)]+'</span>');
                        valid = false;
                        allValid = false;  
                                
                    }else{
                                
                        $container.addClass(settings.passClass);
                                
                    }
                        
                });

        });

        return allValid;

};