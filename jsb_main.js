/**
 * Widget main class
 *
 * Loads the main structure and necessary scripts for the plugins to work on, creates the page swipper,
 * plugin placeholder, and banner area.
 *
 * @author Alejandro Platt <plattpou@hotmail.com>
 *
 */
//Verify JQuery exists if not then load it
if (typeof jQuery == 'undefined') {

	// JQuery is not loaded, therefore we need to include Jquery from google CDN

	/**
	 * Loads external scripts and calls a callback function
	 *
	 * @param string url
	 * @param function callback
	 */
	function loadScript(url, callback) {

        var objScript = document.createElement("script");
        objScript.type = "text/javascript";

        if (objScript.readyState) { //IE
        	objScript.onreadystatechange = function () {
                if (objScript.readyState == "loaded" || objScript.readyState == "complete") {
                	objScript.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
        	objScript.onload = function () {
                callback();
            };
        }
        objScript.src = url;
        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(objScript);
    }

	//Load jQuery
    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js",
		function () {
	    	//Append loader to the page load event
	    	jQuery(function(){
	    		objJSBWidjet.init();
	    	});
	    }
    );

} else {
	//jQuery was already there, Append loader to the page load event
	jQuery(function(){
		objJSBWidjet.init();
	});
}

/**
 * MAIN IMPLEMENTATION CLASS
 * Creates UI and loads plugins into the webpage
 */
var objJSBWidjet = new function() {

	this.arrPlugins = new Array(); 						//plugin list
	this.jqView = null; 								//will contain the jquery of the main div.
	this.strBaseUrl = "http://local.pfwidget.com/";		//holds this script base path, to be used by plugins

	this.numSlideOutPosition = "-265";					//css right property of the main panel width hidden

	/**
	 * Builds UI, executed at the end of the page load
	 */
	this.init = function () {

		// Create view and add basic structure
		this.jqView = jQuery(document.body).append('<div id="pfw_panel"><div id="plugins_stripe"></div><div id="swiper"></div><div id="ad_placeholder"></div></div>').find('div#pfw_panel'); //create main view

		if (this.arrPlugins.length > 0) {

			// Add toggle button
			this.jqView.append('<a href="javascript:;" class="toggle"></a>');
			this.jqView.find('a.toggle').click(function(){
				jqPanel = jQuery(this).parent();
				var numRight = parseInt(jqPanel.css('right'));
				if (numRight < 0) {
					jqPanel.animate({right: "0"}, 500);
				} else {
					jqPanel.animate({right: objJSBWidjet.numSlideOutPosition},500);
				}
			});

			// Add Plugins
			var numPlugins = this.arrPlugins.length;
			for (var numIdx = 0; numIdx < numPlugins; numIdx++) {
				objPlugin = this.arrPlugins[numIdx];

				// Create plugin view
				var jqView = this.jqView.find('div#plugins_stripe').append('<div class="panel" id="' + objPlugin.getName() + '">' + objPlugin.getHtml() + '</div>').find("div#" + objPlugin.getName());
				jqView.css('left',(numIdx * 100) + "%" );
				objPlugin.init(jqView); //init plugin

				// Add to stripe, not needed if is only one plugin
				if (numPlugins > 1) {
					this.jqView.find('div#swiper').append('<a class="swiper_btn" href="javascript:objJSBWidjet.swipeTo(' + (numIdx + 1) + ');">' + (numIdx + 1) + '</a>');
				}
			}

			// If its only one plugin hide the swiper and extend the plugin panel height
			if (numPlugins == 1) {
				this.jqView.find('div#plugins_stripe').css('bottom',(parseInt(this.jqView.find('div#plugins_stripe').css('bottom')) - this.jqView.find('div#swiper').outerHeight() + 5) + "px" );
				this.jqView.find('div#swiper').hide();
			}
		}

		//Add ad to ad_placeholder
		var strAdCode = "<img src='http://placehold.it/250x250'/>"; //this can be changed to a google adsense code
		this.jqView.find('div#ad_placeholder').append(strAdCode);

	};

	/**
	 * Swipe to a plugin page
	 *
	 * @param numPage Page to swipe to
	 */
	this.swipeTo = function (numPage) {
		var numNewPosition = '-' + ( (numPage -1) * 100) + '%';
		this.jqView.find('div#plugins_stripe div.panel').animate({marginLeft: numNewPosition}, 500);
	};

	/**
	 * Add plugin to the pluggin list, executed at plugin definition
	 *
	 * @param objPlugin object with getHtml, getName, and init methods
	 */
	this.addPlugin = function (objPlugin) {
		this.arrPlugins[this.arrPlugins.length] = objPlugin;
	};

};

