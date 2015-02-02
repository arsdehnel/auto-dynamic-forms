// TODO: get this prototype to work
// ADF.ColumnSelectView = ADF.DropdownMenuView({
ADF.ColumnSelectView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.dropdownMenu,
    tagName: 'li',
    childView: ADF.ColumnSelectItemView,
    childViewContainer: '.dropdown-menu',
    // childViewOptions : function () {
    //     return { regionName: this.regionName };
    // },
    events: {
        // TODO: this should go to the parent prototype
        "click .dropdown-wrapper .dropdown-toggle"     : "dropdownToggle",
        // TODO: create hierarchy of events somehow
        "click .adf-grid-column-group"          : "columnSelect",
        "change .column-selector .dropdown-menu input" : "columnSelect"
    },
    initialize: function( options ) {
        ADF.utils.message('log','ColumnSelectView Initialized', options );
        this.regionName = options.regionName;

        // TODO: this model should go to the parent prototype but something wasn't working with that so it's on the list for later
        // TODO: seems like this model shouldn't be created in the view since that's a bit backwards
        // TODO: hide this when the user clicks off of it
        this.model = new ADF.DropdownMenuModel({
            buttonLabel : 'Column Select',
            wrapClass : 'column-selector',
            footerOptions : [
                {
                    href : "#",
                    itemClass : "adf-grid-column-group",
                    label : "All Columns",
                    dataAttributes : [
                        {
                            "name" : "column-select-type",
                            "value" : "all"
                        }
                    ]
                },
                {
                    href : "#",
                    itemClass : "adf-grid-column-group",
                    label : "Minimum Columns",
                    dataAttributes : [
                        {
                            "name" : "column-select-type",
                            "value" : "min"
                        }
                    ]
                },
                {
                    href : "#",
                    itemClass : "adf-grid-column-group",
                    label : "Default Columns",
                    dataAttributes : [
                        {
                            "name" : "column-select-type",
                            "value" : "dflt"
                        }
                    ]
                }
            ]
        });

    },
    render: function() {

        // render the main bits
        this.$el.html(this.template(this.model.toJSON()));

        var columnSelect = this;

        // normally would do variables up top but this requires the html() to be created already
        var childContainer = this.$el.find(this.childViewContainer).find('.divider');

        // put the children (the fields) into the drop down but above the divider
        this.collection.each(function(model){

            // TODO: move this to the model initializer
            model.set('regionName',columnSelect.regionName);

            if( model.get("fieldPriority") !== 0 ){
                var childView = new columnSelect.childView;
                var headerCell = $('#'+columnSelect.regionName+'--'+model.get("name"));
                if( headerCell.css('display') === 'table-cell' ){
                    model.set('checked',true);
                }
                childContainer.before(childView.template(model.toJSON()))
            }

        })

        return this;
    },
    // TODO: move this to the prototype
    dropdownToggle: function( event ) {

        if( event.target ){

            event.preventDefault();
            var $target = $(event.target);

        }else{      // we're just going to assume it's a jQuery object then

            var $target = event;

        }

        $target.closest('.dropdown-wrapper').find('.dropdown-menu').toggleClass('hide');

    },
    columnSelect: function(e) {

        e.preventDefault();

        var colSelect = this;
        var $target = $(e.target);
        var groupType = $target.attr('data-column-select-type')

        console.log('columnselect triggered',$target,groupType,id);

        if( typeof groupType == 'undefined' ){

            var id = $target.val();
            var cells = $('#'+id+", .adf-grid td[data-header-id="+id+"]");

            console.log('columnselect details',id,cells);

            if( $target.is(':checked') ){
                cells.show();
            }else{
                cells.hide();
            }

        }else{

            switch( groupType ){

                case "all":
                    $target.closest('.dropdown-wrapper').find('.dropdown-menu :input').not(':checked').trigger('click');
                    break;

                case "min":
                    $target.closest('.dropdown-wrapper').find('.dropdown-menu :input').each(function(){
                        var inputObj = $(this);
                        var priority = parseInt( $('#'+inputObj.val()).attr('data-column-select-priority'), 10 );
                        if( ( inputObj.is(':checked') && priority > 1 ) || ( inputObj.is(':not(:checked)') && priority <= 1 ) ){
                            inputObj.trigger('click');
                        }
                    })
                    break;

                case "dflt":
                    var dropdownMenu = $target.closest('.dropdown-wrapper').find('.dropdown-menu');
                    $('.adf-grid th, .adf-grid td').css("display", "");
                    $('.adf-grid th').each(function(){

                        var inputObj = dropdownMenu.find(':input[value='+$(this).attr('id')+']');

                        //check the visibility of this header which is now based on the media queries
                        if( $(this).css('display') === 'table-cell' && inputObj.is(':not(:checked)') ){

                            inputObj.trigger('click');

                        }else if( $(this).css('display') === 'none' && inputObj.is(':checked') ){

                            inputObj.trigger('click');

                        }

                    })
                    break;

            }

            colSelect.dropdownToggle( $target.closest('.dropdown-wrapper').find('.dropdown-toggle') );

        }

    }

});