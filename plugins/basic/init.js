/**
 * Basic plugin class
 * Copy & Paste to have a basic plugin structure
 *
 * @author Alex Platt
 */

// Main instance exists?
if (objJSBWidjet != undefined) {

	//Create plugin
	objJSBWidjet.addPlugin(new function (){

		/**
		 * Gets the plugin name, used to generate the panel id
		 *
		 * @returns string
		 */
		this.getName = function() {
			return "basic";	 //must be unique, used for the panel creation
		};

		/**
		 * Gets the HTML code for the panel, used to create the view
		 *
		 * @returns string
		 */
		this.getHtml = function () {
			return "This is the HTML, and has a counter: <span id='first_counter'></span>";
		};

		/**
		 * Initializes all logic for the view
		 */
		this.init = function (jqView) {
			setInterval(function(){
				if (this.counter == undefined) this.counter = 0;
				jqView.find('span#first_counter').html(this.counter++);
			},1000);
		};

	});

}
