var PolygonTool = DefaultTool.extend(function($) {

	// privates
	var me = this;
	var points = [];
	var path;
	var isDrawing = false;
	var tmpPath;

	function draw() {
		me.form.attr('path', path);
	}

	function addTmpPoint(e) {
		var point = me.getMousePosition(e);
		tempPath = path + 'L' + point.x + ',' + point.y + 'L' + points[0].x + ',' + points[0].y + 'z';
		me.form.attr('path', tempPath);
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
		isDrawing = false;
		me.form.attr('path', tempPath);

		// prepare for a new polygon
		points = [];
		isDrawing = false;
	}

	// public
	return {

		init : function(options) {
			me._super(options);
		},

		onMouseDown : function(e) {
			addPoint(e);
		},

		onMouseMove : function(e) {
			if (isDrawing) {
				addTmpPoint(e)
			}
		},

		onDblclick : function(e) {
			end(e);
		}
	};
});