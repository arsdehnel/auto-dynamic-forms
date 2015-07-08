/*global
ADF,
Backbone,
$
*/
ADF.Grids.ColumnSelectItemView = Backbone.Marionette.ItemView.extend({
    template: ADF.templates.dropdownSelectItem,
    tagName: 'li',
    events: {
        'change :input' : 'columnSelect'
    },
    initialize: function( options ){
        ADF.utils.message('log','ColumnSelectItemView Initialized', options);
        this.model.set('idPrefix','ColSelect');
    },
    onRender: function() {
        this.setElement(this.$el.find('li').unwrap());
    },
    columnSelect: function(e) {
        var $input = this.$el.find(':checkbox');
        var id = this.model.get('regionName') + '--' + this.model.get('name');
        var $cells = $('#'+id+', .adf-grid td[data-header-id='+id+']');

        if( $input.is(':checked') ){
            $cells.show();
            this.model.set({
                'checkedInd':'Y',
                'colSelectDispOverride': 'Y'
            });
        }else{
            $cells.hide();
            this.model.set({
                'checkedInd':'N',
                'colSelectDispOverride': 'N'
            });
        }        

    }
});