var LineTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	var me = this;
	var firstPoint = null;
	var secondPoint = null;
	var line = null;

	function start(e) {
		firstPoint = me.getMousePosition(e);
		line = options.paper.path("M" + firstPoint.x + "," + firstPoint.y);
	}

	function getLinePath(firstPoint, secondPoint) {
		return "M" + firstPoint.x + "," + firstPoint.y + "L" + secondPoint.x + "," + secondPoint.y + "z";
	}
	function draw(e) {
		secondPoint = me.getMousePosition(e);
		var linePath = getLinePath(firstPoint, secondPoint);
		line.attr('path', linePath);
		line.attr("fill", options.fill.color);
		line.attr("stroke", options.stroke.color);
		line.attr("stroke-width", options.stroke.width);
	}

	// Public
	return {

		title : ToolbarConfig.LINE_TOOL.TITLE,
		icon : ToolbarConfig.LINE_TOOL.ICON,

		
		activate : function() {
			options.$canvas.on("mousedown", function(e) {
				start(e);
			});

			options.$canvas.on("mousemove", function(e) {

				if (line) {
					draw(e);
				}
			});

			options.$canvas.on("mouseup", function(e) {
				draw(e);
				line = null;
			});
		},
	};
});