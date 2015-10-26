/*global
ADF,
Backbone,
$
*/
ADF.Core.ColumnSelectItemView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.dropdowns.selectItem,
    tagName: 'li',
    events: {
        'change :input' : 'columnSelect'
    },
    initialize: function( options ){
        ADF.utils.message('log','ColumnSelectItemView Initialized', options);
        this.region = options.region;

        // this is to differentiate the ID values from the actual cell/module ID values
        this.model.set('idPrefix','ColSelect');

        // have to set this so that the HBS rendering has it
        this.model.set('regionName',this.region.name);

        this.listenTo(this.model,'change:checkedInd',this.render);
    },
    onRender: function() {
        this.setElement(this.$el.find('li').unwrap());
    },
    columnSelect: function(e) {
        var $input = this.$el.find(':checkbox');
        var id = this.region.name + '--' + this.model.get('name');
        // TODO: merge these selectors into one for the grid and module implementations
        var $fields = this.region.$el.find('[data-field-name='+this.model.get('name')+']');
        var $cells = $('#'+id+', .adf-grid td[data-header-id='+id+']');

        if( $input.is(':checked') ){
            $cells.show();
            $fields.removeClass('hide').addClass('show');
            this.model.set({
                'checkedInd':'Y',
                'colSelectDispOverride': 'Y'
            });
        }else{
            $cells.hide();
            $fields.removeClass('show').addClass('hide');
            this.model.set({
                'checkedInd':'N',
                'colSelectDispOverride': 'N'
            });
        }
    }
});