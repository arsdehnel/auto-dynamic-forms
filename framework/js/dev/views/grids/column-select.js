/*global
ADF,
$,
_
*/
ADF.Grids.ColumnSelectView = ADF.Core.DropdownView.extend({
    childView: ADF.Grids.ColumnSelectItemView,
    events: {
        'click  .adf-grid-column-group'                : 'columnGroupSelect'
    },
    initialize: function( options ) {
        ADF.utils.message('log','ColumnSelectView Initialized', options );

        var footerOptions = [];

        this.regionName = options.regionName;

        // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.Core.DropdownView.prototype.events,this.events);

        this.model.set('buttonLabel','Column Select');
        this.model.set('wrapClass','column-selector');

        footerOptions.push({
            href : '#',
            itemClass : 'adf-grid-column-group',
            label : 'All Columns',
            dataAttributes : [
                {
                    'name' : 'column-select-type',
                    'value' : 'all'
                }
            ]
        });

        footerOptions.push({
            href : '#',
            itemClass : 'adf-grid-column-group',
            label : 'Minimum Columns',
            dataAttributes : [
                {
                    'name' : 'column-select-type',
                    'value' : 'min'
                }
            ]
        });

        footerOptions.push({
            href : '#',
            itemClass : 'adf-grid-column-group',
            label : 'Default Columns',
            dataAttributes : [
                {
                    'name' : 'column-select-type',
                    'value' : 'dflt'
                }
            ]
        });

        this.model.set('footerOptions',footerOptions);

    },
    filter: function (child, index, collection) {
      return child.get('fieldPriority') !== 0;
    },
    columnGroupSelect: function(e) {

        e.preventDefault();
        
        var colSelect = this;
        var $target = $(e.target);
        var groupType = $target.attr('data-column-select-type');

        switch( groupType ){

            case 'all':
                $target.closest('.dropdown-wrapper').find('.dropdown-menu :input').not(':checked').trigger('click');
                break;

            case 'min':
                $target.closest('.dropdown-wrapper').find('.dropdown-menu :input').each(function(){
                    var inputObj = $(this);
                    var priority = parseInt( $('#'+inputObj.val()).attr('data-column-select-priority'), 10 );
                    if( ( inputObj.is(':checked') && priority > 1 ) || ( inputObj.is(':not(:checked)') && priority <= 1 ) ){
                        inputObj.trigger('click');
                    }
                });
                break;

            case 'dflt':
                var dropdownMenu = $target.closest('.dropdown-wrapper').find('.dropdown-menu');
                $('.adf-grid th, .adf-grid td').css('display', '');
                $('.adf-grid th').each(function(){

                    var inputObj = dropdownMenu.find(':input[value='+$(this).attr('id')+']');

                    //check the visibility of this header which is now based on the media queries
                    if( $(this).css('display') === 'table-cell' && inputObj.is(':not(:checked)') ){

                        inputObj.trigger('click');

                    }else if( $(this).css('display') === 'none' && inputObj.is(':checked') ){

                        inputObj.trigger('click');

                    }

                });
                break;

        }

        colSelect.dropdownToggle( $target.closest('.dropdown-wrapper').find('.dropdown-toggle') );

    }

});