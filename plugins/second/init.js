/**
 * Second plugin class
 * This is just for demonstration on how plugins work together
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
			return "second";	 //must be unique, used for the panel creation
		};

		/**
		 * Gets the HTML code for the panel, used to create the view
		 *
		 * @returns string
		 */
		this.getHtml = function () {
			return "This is the second page and also has javascript running to update this counter: <span id='second_counter'></span>";
		};

		/**
		 * Initializes all logic for the view
		 */
		this.init = function (jqView) {
			setInterval(function(){
				if (this.counter == undefined) this.counter = 0;
				jqView.find('span#second_counter').html(this.counter++);
			},1000);
		};

	});

}
