var PolygonTool = Tool.extend(function($, context) {

	this._super($, context);

	// privates
	var me = this;
	var $this = $(this);
	var points = [];
	var path = null;
	var tmpPath = null;
	var form;

	function addTmpPoint(e) {
		var point = me.getMousePosition(e);
		tmpPath = path + 'L' + point.x + ',' + point.y + 'L' + points[0].x + ',' + points[0].y + 'z';
		form.attr('path', tmpPath);
	}

	function addPoint(e) {
		var point = me.getMousePosition(e);
		points.push(point);

		if (points.length == 1) {
			path = "M" + point.x + ',' + point.y;
			form = context.paper.path(path);
			form.attr("fill", context.fill.color);
			form.attr("stroke", context.stroke.color);
			form.attr("stroke-width", context.stroke.width);
			form.attr('path', path);
		} else if (points.length > 1) {
			path = path + 'L' + point.x + ',' + point.y;
			form.attr('path', path);
		}
	}

	// close the polygon
	function end(e) {
		form.attr('path', tmpPath);
		form.mousedown(ToolManager.getTool('selectTool').onSelect);
		form.dblclick(ToolManager.getTool('selectTool').onDblClick);

		// prepare for a new polygon
		form = null;
		points = [];
	}

	// public
	return {

		title : ToolbarConfig.POLYGON_TOOL.TITLE,
		icon : ToolbarConfig.POLYGON_TOOL.ICON,

		onMouseDown : function(e) {
			addPoint(e);
		},

		onMouseMove : function(e) {
			if (form)
				addTmpPoint(e);
		},

		onDblclick : function(e) {
			end(e);
			
		},

		desactivate : function() {
			me._super();

			if (form) {
				form.remove();
			}
			form = null;
			points = [];
		}
	};
});