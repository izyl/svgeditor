// Default tool : classe mere des tools
var DefaultToolbarItem = CClass.create(function($, options) {

	// private
	var me;

	// public
	return {

		onMouseDown : function(e) {
		},

		onMouseMove : function(e) {
		},

		onMouseUp : function(e) {
		},

		onDblclick : function(e) {
		},

		activate : function() {

			me = this;
			// this représente ici l'instance de l'objet enfant (par exemple rectangleTool)
			options.$canvas.on("mousedown", function(e) {
				me.onMouseDown(e);
			});

			options.$canvas.on("mousemove", function(e) {
				me.onMouseMove(e);
			});

			options.$canvas.on("mouseup", function(e) {
				me.onMouseUp(e);
			});

			options.$canvas.on("dblclick", function(e) {
				me.onDblclick(e);
			});
		},

		desactivate : function() {
			options.$canvas.off();
		},

		getMousePosition : function(e) {
			var offset = options.$canvas.offset();
			var point = {};

			point.x = e.pageX - (offset.left);
			point.y = e.pageY - (offset.top);

			return point;
		}
	};
});