// on va voir pour faire de l'héritage propre après
var ExportAction = (function($) {

	// privates

	var paper;
	var canvas;
	var alert;

	// Return an object exposed to the public
	return {

		init : function(options) {
			var me = this;
			canvas = options.canvas;
			paper = options.paper;

			alert = options.alert;
		},

		// rend l'outil actif
		activate : function() {
			// $.ajax

			// puis affichage du résulat
			var _alert = alert.clone();
			_alert.addClass('alert alert-info');
			_alert.find('.contentspan').text(paper.toSVG());
			canvas.after(_alert);

			_alert = alert.clone();
			_alert.addClass('alert alert-success notifications');
			canvas.before(_alert);
			_alert.find('.contentspan').text('Your work has been successfully saved');
			_alert.fadeOut(2000)
		},

		// desactive cet outil
		desactivate : function() {
			canvas.off();
		}
	};
})(jQuery);