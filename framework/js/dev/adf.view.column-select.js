// TODO: get this prototype to work
// ADF.ColumnSelectView = ADF.DropdownMenuView({
ADF.ColumnSelectView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.dropdownMenu,
    tagName: 'li',
    childView: ADF.ColumnSelectItemView,
    childViewContainer: '.dropdown-menu',
    events: {
        // TODO: this should go to the parent prototype
        "click .dropdown-wrapper .dropdown-toggle"     : "dropdownToggle",
        // TODO: create hierarchy of events somehow
        "click .auto-admin-grid-column-group"          : "columnSelect",
        "change .column-selector .dropdown-menu input" : "columnSelect"
    },
    // TODO: this model should go to the parent prototype but something wasn't working with that so it's on the list for later
    model: new ADF.DropdownMenuModel(),
    initialize: function( options ) {
        ADF.utils.message('log','ColumnSelectView Initialized', options );
        this.model.set('parent',options.gridView.options.region.options.regionName);
        this.model.set('buttonLabel','Column Select');
        this.model.set('wrapClass','column-selector');
        this.model.get('footerOptions').push({
            href : "#",
            itemClass : "auto-admin-grid-column-group",
            label : "All Columns",
            dataAttributes : [
                {
                    "name" : "column-select-type",
                    "value" : "all"
                }
            ]
        });
        this.model.get('footerOptions').push({
            href : "#",
            itemClass : "auto-admin-grid-column-group",
            label : "Minimum Columns",
            dataAttributes : [
                {
                    "name" : "column-select-type",
                    "value" : "min"
                }
            ]
        });
        this.model.get('footerOptions').push({
            href : "#",
            itemClass : "auto-admin-grid-column-group",
            label : "Default Columns",
            dataAttributes : [
                {
                    "name" : "column-select-type",
                    "value" : "dflt"
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
            model.set('regionName',this.regionName);
            console.debug(model.toJSON());

            // TODO: check for actual visibility of this column
            if( model.get("fieldPriority") !== 0 ){
                var childView = new columnSelect.childView;
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

        var pageView = this;
        var $target = $(e.target);
        var groupType = $target.attr('data-column-select-type')

        if( !groupType ){

            var id = $target.val();
            var cells = $('#'+id+", .auto-admin-grid td[data-header-id="+id+"]");

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
                    $('.auto-admin-grid th, .auto-admin-grid td').css("display", "");
                    $('.auto-admin-grid th').each(function(){

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

            pageView.dropdownToggle( $target.closest('.dropdown-wrapper').find('.dropdown-toggle') );

        }

    }

});