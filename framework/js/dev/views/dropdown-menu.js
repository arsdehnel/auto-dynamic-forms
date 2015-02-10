/*global
ADF,
Backbone
*/
ADF.DropdownMenuView = Backbone.Marionette.CompositeView.extend({
    template: ADF.templates.dropdownMenu,
    tagName: 'li',
    childView: ADF.DropdownItemView,
    childViewContainer: '.dropdown-menu',
    // baseEvents: {
    //     'click .dropdown-wrapper .dropdown-toggle'     : 'dropdownToggle',
    // },
    // customEvents: {},
    // events: function() {
    //     return _.extend({},this.baseEvents,this.customEvents);
    // },
    // model: new ADF.DropdownMenuModel({
    //     buttonLabel: 'Menu Name',
    //     wrapClass: 'column-selector',
    //     footerOptions: []
    // }),
    initialize: function( options ) {
        ADF.utils.message('log','DropdownMenu Initialized', options );
    }

});