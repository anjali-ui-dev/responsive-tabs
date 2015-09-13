(function( $, document, window ) {

    var debug = false; // For debugging the code

    var ResponsiveTabs = {

        _initialActive: function( anchor, option ) {

            if (option === null) {

                if ( window.location.hash ) {
                    ResponsiveTabs._processTabs(window.location.hash);
                    debug && console && console.log( window.location.hash );
                } else {
                    return anchor[0].hash;
                }

            } else if ( option >= 1 && option <= anchor.length ) {
                return anchor[option - 1].hash;
            } else {
                console.error("Tab No : " + option + " is not available");
            }
        },


        _processTabs: function( hash ) {

            var anchor = $("[href=" + hash + "]");
            var div = $(hash);

            // activate tab and corresponding container and remove others activation

            anchor.addClass("active").parent().siblings().find("a").removeClass("active");
            div.addClass("active").siblings().removeClass("active");

            // Update URL with hash 
            window.history.replaceState("", "", hash);

            // In mobile, Close the menu
            anchor.closest("ul").removeClass("open");

        },

        _bindClick: function() {

            $( document )
                .on("click", ".responsive-tabs a[href^='#']:not('.active')", function(event) {
                    ResponsiveTabs._processTabs(this.hash);
                    event.preventDefault();
                })
                .on("click", ".responsive-tabs a.active", function( event ) {
                    ResponsiveTabs._switchMenu(event, this);
                    event.preventDefault();
                });
        },

        // If the page has hash, go to that tab

        _onPageLoad: function() {
            this._processTabs( document.location.hash );
        },

        _switchMenu: function( event, el ) {
            $(el ).closest( "ul" ).toggleClass( "open" );
        }
    }

    $.fn.tabs = function( options ) {

        options = $.extend({
            active: null
        }, options);

        this.first().addClass('responsive-tabs-container');

        this.first().find('nav').addClass('responsive-tabs');

        var anchor = this.first().find('nav').find('ul').children('li').children('a');

        if (anchor.length >= 1) {

            var hash = ResponsiveTabs._initialActive(anchor, options.active);
            ResponsiveTabs._processTabs(hash);
            
            ResponsiveTabs._bindClick();
            ResponsiveTabs._onPageLoad();            

        } else {
            console.error("Please Initialize Tabs");
        }
    }
}( jQuery, document, window ));