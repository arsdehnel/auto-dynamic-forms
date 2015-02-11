/*global
ADF,
_
*/
ADF.config = {
    messages : {
        levels : {
            'log' : {
                'displayMethod' : 'none',
                'label' : 'Log Entry'
            },
            'info' : {
                'displayMethod' : 'log',
                'label' : 'Info'
            },
            'debug' : {
                'displayMethod' : 'messagesWindow',
                'label' : 'Debug Info'
            },
            'warning' : {
                'displayMethod' : 'log',
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