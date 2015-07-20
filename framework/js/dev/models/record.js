/*global
ADF,
Backbone,
_
*/
ADF.RecordModel = Backbone.Model.extend({

    initialize: function( attrs, opts ){
        ADF.utils.message('log','RecordModel Initialized', attrs, opts);
        var recordModel = this;

        // give the record an ID even if it is new (ie not from the database)
        if( recordModel.isNew() ){
            recordModel.set('id','a'+ADF.utils.randomId());
            recordModel.set('rowClass','added');
        }else{
            recordModel.set('rowClass','current');
        }

        // make sure all attributes are lowercase
        _.each(attrs,function(element, index, array){
            if( index.toLowerCase() !== index ){
                recordModel.set(index.toLowerCase(),element);
                recordModel.unset(index);
            }
            if( _.isArray(element) ){
                _.each(element, function( childElement, childIndex, childArray ){
                    ADF.utils.objPropToLower( childElement );
                });
                recordModel.set(index.toLowerCase(), element );
            }
        });

        // this.listenTo(this,'sync',recordModel.recordSave);

    },

    parse: function( response, options ){

        if( response.success ){
            return ADF.utils.objPropToLower( response.data );
        }else{
            return response;
        }

    },

    save: function( attrs, options ) {

        var attrs, xhr, attributes = this.attributes;
        var recordModel = this;
        var params = {};
        var dataArray = [];

        /* ----------------------------------------------
                 BEGIN FROM ORIGINAL BACKBONE.SYNC (v1.1.2)
           ---------------------------------------------- */
            // Default JSON-request options.
            // var params = {type: type, dataType: 'json'};

            // // Ensure that we have a URL.
            params.type = 'POST';
            if (!options.url) {
              params.url = _.result(recordModel, 'url') || ADF.utils.message('error','No URL specified');
            }
            var success = options.success;
            options.success = function(resp) {
                // Ensure attributes are restored during synchronous saves.
                recordModel.attributes = attributes;
                var serverAttrs = recordModel.parse(resp, options);
                if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
                if (_.isObject(serverAttrs) && !recordModel.set(serverAttrs, options)) {
                    return false;
                }
                if (success) success(recordModel, resp, options);

                // the following line is NOT from the original sync
                recordModel.set('rowClass','current');

                recordModel.trigger('sync', recordModel, resp, options);
            };

        /* ----------------------------------------------
                 END FROM ORIGINAL BACKBONE.SYNC (v1.1.2)
           ---------------------------------------------- */

            // now that we're in our own custom code we'll have to do our slightly odd JSON creation
            // where we create a three attribute object for each attribute
            // and put them into an array and then submit that
            // console.log( options.fieldsCollection, this, ADF.utils.dataSerialize( options.fieldsCollection, this ) );
            dataArray = ADF.utils.dataSerialize( options.fieldsCollection, recordModel );
            params.data = {adfSerializedData:JSON.stringify(dataArray)};


            // and then back to the original backbone sync
        /* ----------------------------------------------
                 BEGIN FROM ORIGINAL BACKBONE.SYNC (v1.1.2)
           ---------------------------------------------- */
            // Make the request, allowing the user to override any Ajax options.
            xhr = options.xhr = Backbone.ajax(_.extend(params, options));
            recordModel.trigger('request', recordModel, xhr, options);
            return xhr;
        /* ----------------------------------------------
                 END FROM ORIGINAL BACKBONE.SYNC (v1.1.2)
           ---------------------------------------------- */


    }

});