var LineTool = DefaultToolbarItem.extend(function($) {
	// privates
	var me = this;
	var firstPoint = null;
	var secondPoint = null;
	var line = null;

	function start(e) {
		firstPoint = me.getMousePosition(e);
		line = me.paper.path("M" + firstPoint.x + "," + firstPoint.y);
	}

	function getLinePath(firstPoint, secondPoint) {
		return "M" + firstPoint.x + "," + firstPoint.y + "L" + secondPoint.x + "," + secondPoint.y + "z";
	}
	function draw(e) {
		secondPoint = me.getMousePosition(e);
		var linePath = getLinePath(firstPoint, secondPoint);
		line.attr('path', linePath);
		line.attr("fill", me.fill.color);
		line.attr("stroke", me.stroke.color);
		line.attr("stroke-width", me.stroke.width);
	}

	// Public
	return {

		title : ToolbarConfig.LINE_TOOL.TITLE,
		icon : ToolbarConfig.LINE_TOOL.ICON,

		// rend l'outil actif
		activate : function() {
			me.$canvas.on("mousedown", function(e) {
				start(e);
			});

			me.$canvas.on("mousemove", function(e) {

				if (line) {
					draw(e);
				}
			});

			me.$canvas.on("mouseup", function(e) {
				draw(e);
				line = null;
			});
		},
	};
});