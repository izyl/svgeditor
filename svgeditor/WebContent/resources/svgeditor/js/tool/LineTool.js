// on va voir pour faire de l'héritage propre après
var LineTool = (function($) {

	// private

	var paper;
	var canvas;
	var fill;
	var stroke;

	var firstPoint;
	var secondPoint;
	var line;

	function getMousePosition(e) {
		var position = canvas.position();
		var offset = canvas.offset();
		var point = {};

		point.x = e.pageX - (offset.left);
		point.y = e.pageY - (offset.top)

		return point;
	}

	function start(e) {
		firstPoint = getMousePosition(e);
		line = paper.path("M" + firstPoint.x + "," + firstPoint.y);
	}

	function getLinePath(firstPoint, secondPoint) {
		return "M" + firstPoint.x + "," + firstPoint.y + "L" + secondPoint.x + "," + secondPoint.y + "z";
	}

	function draw(e) {
		secondPoint = getMousePosition(e);
		var linePath = getLinePath(firstPoint, secondPoint);
		line.attr('path', linePath);
		line.attr("fill", fill.color);
		line.attr("stroke", stroke.color);
		line.attr("stroke-width", stroke.width);
	}

	// Public
	return {

		init : function(options) {
			var me = this;
			canvas = options.canvas;
			paper = options.paper;
			fill = options.fill;
			stroke = options.stroke;
		},

		// rend l'outil actif
		activate : function() {
			canvas.on("mousedown", function(e) {
				start(e);
			});

			canvas.on("mousemove", function(e) {

				if (line) {
					draw(e);
				}
			});

			canvas.on("mouseup", function(e) {

				draw(e);
				line = null;
			});
		},

		// desactive cet outil
		desactivate : function() {
			canvas.off();
		}
	};
})(jQuery);