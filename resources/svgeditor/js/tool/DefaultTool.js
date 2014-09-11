// Default tool : classe mere des tools
var DefaultTool = CClass.create(function($) {

	// private
	var me;

	// public
	return {

		init : function(options) {
			me = this;
			me.canvas = options.canvas;
			me.paper = options.paper;
			me.fill = options.fill;
			me.stroke = options.stroke;
			// toutes les items svg
			me.items = options.items;
			// l'item en cours
			me.form = null;
		},

		onMouseDown : function(e) {
		},

		onMouseMove : function(e) {
		},

		onMouseUp : function(e) {
		},

		onDblclick : function(e) {
		},

		activate : function() {

			// ici this représente l'instance de l'objet enfant (par exemple rectangleTool)
			me.canvas.on("mousedown", function(e) {
				me.onMouseDown(e);
			});

			me.canvas.on("mousemove", function(e) {
				me.onMouseMove(e);
			});

			me.canvas.on("mouseup", function(e) {
				me.onMouseUp(e);
			});

			me.canvas.on("dblclick", function(e) {
				me.onDblclick(e);
			});
		},

		desactivate : function() {
			me.canvas.off();
		},

		getMousePosition : function(e) {
			var offset = this.canvas.offset();
			var point = {};

			point.x = e.pageX - (offset.left);
			point.y = e.pageY - (offset.top)

			return point;
		}
	};
});