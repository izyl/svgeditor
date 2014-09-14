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

		getBBoxCenter : function(bbox) {
			var center = {};
			center.x = (bbox.x2 - bbox.x) / 2 + bbox.x;
			center.y = (bbox.y2 - bbox.y) / 2 + bbox.y;
			return center;
		},

		getRelativePosition : function(x, y) {
			var offset = options.$canvas.offset();
			var relativePoint = {};
			relativePoint.x = x + offset.left;
			relativePoint.y = y + offset.top;

			return relativePoint;
		},

		getMousePosition : function(e) {
			var offset = options.$canvas.offset();
			var point = {};

			point.x = e.pageX - offset.left;
			point.y = e.pageY - offset.top;

			return point;
		}
	};
});