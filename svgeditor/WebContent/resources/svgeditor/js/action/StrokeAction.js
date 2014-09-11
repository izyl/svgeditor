// on va voir pour faire de l'héritage propre après
var StrokeAction = (function($) {

	// privates
	var paper;
	var canvas;

	// Return an object exposed to the public
	return {

		init : function(options) {
			var me = this;
			canvas = options.canvas;
			paper = options.paper;
		},

		// rend l'outil actif
		activate : function() {
		},

		// desactive cet outil
		desactivate : function() {
			canvas.off();
		}
	};
})(jQuery);