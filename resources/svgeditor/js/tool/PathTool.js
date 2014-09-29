var PathTool = Tool.extend(function($, context) {

	this._super($, context);

	// privates
	var me = this;
	var $this = $(this);
	var path = "";
	var form;

	function draw(e) {
		var point = me.getMousePosition(e);
		path += 'L' + point.x + ',' + point.y;
		form.attr('path', path);
	}

	function start(e) {
		var point = me.getMousePosition(e);
		path = "M" + point.x + ',' + point.y;
		form = context.paper.path(path);
		form.attr("fill", context.fill.color);
		form.attr("stroke", context.stroke.color);
		form.attr("stroke-width", context.stroke.width);
	}

	function end(e) {
		draw(e);
		path += 'z';
		form.attr('path', path);
	}

	// public
	return {

		title : ToolbarConfig.PATH_TOOL.TITLE,
		icon : ToolbarConfig.PATH_TOOL.ICON,

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
				end(e);
				form.mousedown(ToolManager.getTool('selectTool').onSelect);
				form.dblclick(ToolManager.getTool('selectTool').onDblClick);
				form = null;
			}
		},

	};
});