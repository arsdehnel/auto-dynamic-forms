var ADF = ADF||{};
ADF.App = Marionette.Application.extend({
  initialize: function(options) {
     console.log('[ADF] App Initialized', options);
  },
  initRegions: function(){
    var app = this;
    var regions = {};
    $('.adf-region').each(function(){
        var region = $(this);
        var regionData = region.data();
        regionData.regionClass = ADF.utils.capitalize(regionData.adfRegionType)+'Region';
        regionData.elSelector = '#'+$(this).attr('id');
        regionData.regionName = ADF.utils.camelize($(this).attr('id'));

        // create the region
        regions[regionData.regionName] = new ADF[regionData.regionClass]({
            el: regionData.elSelector,
            adfData: regionData
        });
        app.addRegions(regions);
    })
    console.log('[ADF] initRegions complete',app.getRegions());
    app.trigger('regionsInitialized');
  }
});

var adf = new ADF.App({container: '.adf-page'});
adf.on("start", function(options){
    this.initRegions();
});