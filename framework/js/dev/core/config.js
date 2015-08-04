/*global
ADF,
_
*/
ADF.config = {
    validationSettings : {
        selector: '.adf-validation-required',
        failClass: 'adf-validation-fail'
    },
    dataAttributes: {
        // these will be "formRow" if not valued
        'input-delimiter': {
            location: 'formInput'
        }
    },
    upload : {
        url : '../service/excel-conversion/upload-file.action',
        maxFileSize : 30000000,
        fileTypes: [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]
    },
    svg : {
        cdnUrl: 'https://www.program-info.com/cdn/adf/svg/defs.svg',
        // cdnUrl: 'http://adf.local/framework/svg/defs.svg'
    },
    messages : {
        levels : {
            'confirm' : {
                'displayMethod' : 'none',
                'label' : 'Confirm'
            },
            'log' : {
                'displayMethod' : 'none',
                'label' : 'Log Entry'
            },
            'info' : {
                'displayMethod' : 'console',
                'label' : 'Info'
            },
            'debug' : {
                'displayMethod' : 'console',
                'label' : 'Debug'
            },
            'warn' : {
                'displayMethod' : 'console',
                'label' : 'Warning'
            },
            'error' : {
                'displayMethod' : 'messagesWindow',
                'label' : 'Error'
            }
        }
    },
    set: function( itemName, value ){
        if( Object.prototype.toString.call( value ) === '[object Object]' ) {
            localStorage.setItem(itemName, JSON.stringify(value));
        }else{
            localStorage.setItem(itemName, value);
        }
    },
    get: function( itemName ){

        var configItem;

        if(!localStorage.getItem(itemName)) {
            configItem = ADF.config[itemName];
        }else{
            configItem = localStorage.getItem(itemName);
            if( _.isObject( configItem ) === '[object Object]') {
                configItem = JSON.parse( configItem );
            }
        }

        return configItem;

    }
};