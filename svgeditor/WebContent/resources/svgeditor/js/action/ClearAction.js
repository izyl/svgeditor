// on va voir pour faire de l'héritage propre après
var ClearAction = (function($) {

	// privates

	var paper;
	var canvas;
	var modal;

	// Return an object exposed to the public
	return {

		init : function(options) {
			var me = this;
			canvas = options.canvas;
			paper = options.paper;
			modal = options.modal;

			modal.find('.modal-title').text('Confirmation');
			modal.find('.modal-body p').text('Every elements while be deleted, are you sure?');
			modal.find('.btn-default').text('Cancel');
			modal.find('.btn-primary').text('OK').on('click', function(e) {
				paper.clear();
			});
			;

		},

		// rend l'outil actif
		activate : function() {
			modal.modal({
				title : 'bla'
			});
		},

		// desactive cet outil
		desactivate : function() {
		}
	};
})(jQuery);