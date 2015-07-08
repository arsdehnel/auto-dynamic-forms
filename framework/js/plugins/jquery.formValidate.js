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
    }
    

  };

  this.find(settings.selector).each(function(){
    
    var $container = $(this);
    var $input = $container.is(':input') ? $container : $container.find(':input');
    var value = $input.val();
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
//        $('body').append('fail: '+chkType);      
        
      }else{
        
        $container.addClass(settings.passClass);
//         $('body').append('pass: '+chkType);
        
      }
      
    });

  });

  return allValid;

};