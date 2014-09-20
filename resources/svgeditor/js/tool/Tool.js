// Tool : classe mere des tools
var Tool = Action.extend(function($, context) {

	this._super($, context);

	// private
	var me;

	// public
	return {

		type : 'tool',
		active : false,

		onMouseDown : function(e) {
		},

		onMouseMove : function(e) {
		},

		onMouseUp : function(e) {
		},

		onDblclick : function(e) {
		},

		activate : function() {

			// this représente ici l'instance de l'objet enfant (par exemple rectangleTool), on
			// l'affete à me pour pouvoir l'utiliser dans cette classe indépendament du context
			me = this;
			me.active = true;
			context.$canvas.on("mousedown", me.onMouseDown);
			$(document).on("mousemove", me.onMouseMove);
			$(document).on("dblclick", me.onDblclick);
			$(document).on("mouseup", me.onMouseUp);
		},

		desactivate : function() {
			context.$canvas.off("mousedown", me.onMouseDown);
			$(document).off("mousemove", me.onMouseMove);
			$(document).off("dblclick", me.onDblclick);
			$(document).off("mouseup", me.onMouseUp);
			me.active = false;
		},

		getBBoxCenter : function(bbox) {
			var center = {};
			center.x = (bbox.x2 - bbox.x) / 2 + bbox.x;
			center.y = (bbox.y2 - bbox.y) / 2 + bbox.y;
			return center;
		},

		getMousePosition : function(e) {
			var offset = context.$canvas.offset();
			var point = {};

			point.x = e.pageX - offset.left;
			point.y = e.pageY - offset.top;

			return point;
		}
	};
});