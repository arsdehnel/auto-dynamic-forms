// TODO: svg rendering
var ADF = ADF||{};
ADF.App = Marionette.Application.extend({
  events: {
    'overlayRemove'            : 'removeOverlay'
  },
  initialize: function(options) {
     ADF.utils.message('log','App Initialized', options);
     var adf = this;
     adf.listenTo(adf,'regionsInitialized',function(){
      // TODO: remove this bullshit
        setTimeout(function(){
            adf.showRegions()
        },200)
    });
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
        regions[regionData.regionName] = new ADF[regionData.regionClass](_.extend({el: regionData.elSelector},regionData));
        app.addRegions(regions);
    },app.trigger('regionsInitialized'));
  },
  showRegions: function() {
    _.each(this.getRegions(),function(region){
      region.show();
    })
  },
  findRegion: function( filter ) {
    var regions = this.getRegions();
    return _.find(regions,function(region){
      return region[filter.attribute] === filter.value || region.options[filter.attribute] === filter.value;
    });
  },
  removeOverlay: function() {
    $('.body-overlay').addClass('hide');
  }
});

var adf = new ADF.App({container: '.adf-page'});
adf.on("start", function(options){
    this.initRegions();
});