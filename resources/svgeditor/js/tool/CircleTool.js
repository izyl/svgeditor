var CircleTool = DefaultToolbarItem.extend(function($) {

	// privates
	var me = this;
	var center = 0;
	var r = 0;

	function getDistance(point1, point2) {
		var xs = 0;
		var ys = 0;

		xs = point2.x - point1.x;
		xs = xs * xs;

		ys = point2.y - point1.y;
		ys = ys * ys;

		return Math.sqrt(xs + ys);
	}

	function getR(e) {
		var secondPoint = me.getMousePosition(e);
		return getDistance(center, secondPoint);
	}

	function start(e) {
		center = me.getMousePosition(e);
		me.form = me.paper.circle(center.x, center.y, 0);
	}

	function draw(e) {
		r = getR(e);
		drawCircle();
	}

	function drawCircle() {
		me.form.attr('x', center.x);
		me.form.attr('y', center.y);
		me.form.attr('r', r);
		me.form.attr("fill", me.fill.color);
		me.form.attr("stroke", me.stroke.color);
	}

	// Public
	return {

		title : ToolbarConfig.CIRCLE_TOOL.TITLE,
		icon : ToolbarConfig.CIRCLE_TOOL.ICON,

		onMouseDown : function(e) {
			start(e);
		},

		onMouseMove : function(e) {
			if (me.form) {
				draw(e);
			}
		},

		onMouseUp : function(e) {
			draw(e);
			me.form = null;
		}
	};
});