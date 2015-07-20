/*global
ADF,
Backbone,
adf,
$,
_
*/
// TODO: add unload check to make sure there aren't any changes pending before navigating away
ADF.PageLayoutView = Backbone.Marionette.LayoutView.extend({
    events: {
        'click .overlay-close'          : 'closeOverlayEditor',
        'adf-module-received'           : 'moduleReceived'
    },
    initialize: function( options ) {
        ADF.utils.message('log','PageLayoutView Initialized', options);
        var pageView = this;
        pageView.dndSources = [];
        pageView.dndTargets = [];

        pageView.loadSvgDefs();

        if( adf.debugEnabled ){
            this.$el.addClass('tsga-debug-enabled');
        }

        pageView.initRegions();

        this._super( options );
    },
    loadSvgDefs: function() {
        var adfPage = this;
        $.ajax({
            url:'https://www.program-info.com/cdn/adf/svg/defs.svg',
            dataType: 'html',
            complete: function( jqXHR, textStatus ){
                adfPage.$el.append(jqXHR.responseText);
            }
        });
    },
    _buildRegion: function( regionData, id ) {
        var regionObj = {};
        regionData.regionClass = ADF[ADF.utils.string.capitalize(ADF.utils.string.camelize(regionData.adfRegionType))+'Region'];
        regionData.selector = '#'+id;
        regionData.regionName = ADF.utils.string.camelize(id);

        regionObj[regionData.regionName] = regionData;

        return regionObj;
    },
    initRegions: function(){
        var pageView = this;
        // var regions = {};
        // make sure there is a messages window on the page
        this._initMessagesWindow();
        pageView.$el.find('.adf-region').each(function(){
            var $region = $(this);
            var regionData = $region.data();

            // skip regions that maybe are malformed or missing the region type
            if( regionData.adfRegionType ){

                pageView.addRegions(pageView._buildRegion( regionData, $region.attr('id') ));

            }
        });
        // TODO: remove this bullshit
        setTimeout(function(){
            pageView.showRegions();
        },1);

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
    },
    _initMessagesWindow: function() {
        var pageView = this;
        if( pageView.$el.find('.adf-messages-window').size() === 0 ){
            pageView.$el.append(ADF.templates.messagesWindow());
        }
    }

});