/*global
ADF,
Backbone,
$,
_
*/
ADF.PageLayoutView = Backbone.Marionette.LayoutView.extend({
    events: {
        'click .overlay-close'          : 'closeOverlayEditor'
    },
    initialize: function( options ) {
        ADF.utils.message('log','PageLayoutView Initialized', options);
        var pageView = this;

        pageView.listenTo(pageView,'regionsInitialized',function(){
            // TODO: remove this bullshit
            setTimeout(function(){
                pageView.showRegions();
            },200);
        });

        pageView.initRegions();

        this._super( options );
    },
    initRegions: function(){
        var pageView = this;
        var regions = {};
        pageView.$el.find('.adf-region').each(function(){
            var region = $(this);
            var regionData = region.data();

            // skip regions that maybe are malformed or missing the region type
            if( regionData.adfRegionType ){

                regionData.regionClass = ADF.utils.capitalize(ADF.utils.camelize(regionData.adfRegionType))+'Region';
                regionData.elSelector = '#'+$(this).attr('id');
                regionData.regionName = ADF.utils.camelize($(this).attr('id'));

                if( !ADF[regionData.regionClass]){
                    ADF.utils.message('error','unexpected region class',regionData.regionClass);
                    return true;
                }

                // create the region
                regions[regionData.regionName] = new ADF[regionData.regionClass](_.extend({el: regionData.elSelector},regionData));
                pageView.addRegions(regions);

            }
        },pageView.trigger('regionsInitialized'));
    },
    showRegions: function() {
        _.each(this.getRegions(),function(region){
            if( !region.inert ){
                region.show();
            }
        });
    },
    findRegion: function( filter ) {
        var regions = this.getRegions();
        return _.find(regions,function(region){
            return region[filter.attribute] === filter.value || region.options[filter.attribute] === filter.value;
        });
    },
    showBackdrop: function() {
        $('.backdrop').removeClass('hide');
    },
    hideBackdrop: function() {
        $('.backdrop').addClass('hide');
    },
    closeOverlayEditor: function(e) {
        e.preventDefault();
        this.getRegion('overlayEditor').hide();
    }

});