var PolygonTool = DefaultToolbarItem.extend(function($) {

	// privates
	var me = this;
	var points = [];
	var path = null;
	var isDrawing = false;
	var tmpPath = null;

	function draw() {
		me.form.attr('path', path);
	}

	function addTmpPoint(e) {
		if (isDrawing) {
			var point = me.getMousePosition(e);
			tmpPath = path + 'L' + point.x + ',' + point.y + 'L' + points[0].x + ',' + points[0].y + 'z';
			me.form.attr('path', tmpPath);
		}
	}

	function addPoint(e) {
		isDrawing = true;
		var point = me.getMousePosition(e);
		points.push(point);

		if (points.length == 1) {
			path = "M" + point.x + ',' + point.y;
			me.form = me.paper.path(path);
			me.form.attr("fill", me.fill.color);
			me.form.attr("stroke", me.stroke.color);
			me.form.attr("stroke-width", me.stroke.width);
			draw();
		} else if (points.length > 1) {
			path = path + 'L' + point.x + ',' + point.y;
			draw();
		}
	}

	// close the polygon
	function end(e) {
		me.form.attr('path', tmpPath);

		// prepare for a new polygon
		points = [];
		isDrawing = false;
	}

	// public
	return {

		title : ToolbarConfig.POLYGON_TOOL.TITLE,
		icon : ToolbarConfig.POLYGON_TOOL.ICON,

		onMouseDown : function(e) {
			addPoint(e);
		},

		onMouseMove : function(e) {
			addTmpPoint(e);
		},

		onDblclick : function(e) {
			end(e);
		}
	};
});