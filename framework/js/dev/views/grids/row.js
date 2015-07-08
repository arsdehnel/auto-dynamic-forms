/*global
ADF,
adf,
_,
$
*/
ADF.Grids.RowView = ADF.Core.RecordView.extend({
    template: ADF.templates.gridRow,
    tagName: 'tr',
    childView: ADF.Grids.CellView,
    events: {
        'click .adf-grid-overlay-value'                 : 'showOverlayEditor',
        'click span[data-select-grid-rendering=true]'   : 'selectInGridToggle',
        'keyup .select-fancy'                           : 'fancySelectSearch',
        'click .select-fancy-options a'                 : 'fancySelectClick'
    },
    initialize: function( options ) {
        ADF.utils.message('log','GridRowView Initialized', options);
        this.regionName = options.regionName;
        this.region = adf.page.getRegion(this.regionName);

        // inherit events from the prototype but allow for custom events as well
        this.events = _.extend({},ADF.Core.RecordView.prototype.events,this.events);
        this._super( options );
    },
    onRender: function(){
        var $cells = this.$el.children('td');
        this.setElement(this.$el.find('tr').unwrap().append($cells));
    },    
    fancySelectSearch: function(e) {
        var $wrap = $(e.currentTarget).closest('.select-fancy-wrapper');
        var $hidden = $wrap.find('.adf-form-input');
        var $options = $wrap.find('.select-fancy-options');
        $options.empty();
        var val = $wrap.find('.select-fancy').val();
        var selectData = this.collection.findWhere({name:$hidden.attr('name')}).get('data');
        var results = _.filter(selectData,function(item){
            if( item.label && item.label.length > 0 ){
                return item.value.toLowerCase().indexOf(val.toLowerCase()) >= 0 || item.label.toLowerCase().indexOf(val.toLowerCase()) >= 0;    
            }else{
                return item.value.toLowerCase().indexOf(val.toLowerCase()) >= 0;
            }
        });
        if( results.length === 0 ){
            $options.append('<li>No results found</li>');
        }else{
            _.each(results,function(result){
                $options.append(ADF.templates.inputHelperSelectFancyRecord(result));
            });                    
        }
    },
    fancySelectClick: function(e) {
        e.preventDefault();
        var $selected = $(e.currentTarget);
        var $input = $selected.closest('td').find('.select-fancy');
        var $hidden = $selected.closest('td').find(':input:hidden');
        $input.val($selected.text());
        $hidden.val($selected.data('value'));
        this.model.set('currentValue',$selected.data('value'));
        $selected.closest('td').find('.select-fancy-options').empty();
    }
});