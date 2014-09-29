var CircleTool = Tool.extend(function($, context) {

	this._super($, context);
	var $this = $(this);

	// privates
	var me = this;
	var center = 0;
	var r = 0;
	var form;

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
		form = context.paper.circle(center.x, center.y, 0);
	}

	function draw(e) {
		r = getR(e);
		drawCircle();
	}

	function drawCircle() {
		form.attr('x', center.x);
		form.attr('y', center.y);
		form.attr('r', r);
		form.attr("fill", context.fill.color);
		form.attr("stroke", context.stroke.color);
		form.attr("stroke-width", context.stroke.width);
	}

	// Public
	return {

		title : ToolbarConfig.CIRCLE_TOOL.TITLE,
		icon : ToolbarConfig.CIRCLE_TOOL.ICON,

		onMouseDown : function(e) {
			start(e);
		},

		onMouseMove : function(e) {
			if (form) {
				draw(e);
			}
		},

		onMouseUp : function(e) {
			if (form) {
				draw(e);
				form.mousedown(ToolManager.getTool('selectTool').onSelect);
				form.dblclick(ToolManager.getTool('selectTool').onDblClick);
				form = null;
			}
		}
	};
});