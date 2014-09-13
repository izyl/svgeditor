var PathTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	var me = this;
	var $this = $(this);
	var path = "";
	var isDrawing = false;

	function draw(e) {
		var point = me.getMousePosition(e);
		path += 'L' + point.x + ',' + point.y;
		options.form.attr('path', path);
	}

	function start(e) {
		isDrawing = true;
		var point = me.getMousePosition(e);
		path = "M" + point.x + ',' + point.y;
		options.form = options.paper.path(path);
		options.form.attr("fill", options.fill.color);
		options.form.attr("stroke", options.stroke.color);
		options.form.attr("stroke-width", options.stroke.width);
	}

	function end(e) {
		path += 'z';
		options.form.attr('path', path);
	}

	// public
	return {

		title : ToolbarConfig.PATH_TOOL.TITLE,
		icon : ToolbarConfig.PATH_TOOL.ICON,

		onMouseDown : function(e) {
			start(e);
		},

		onMouseMove : function(e) {
			if (isDrawing) {
				draw(e);
			}
		},

		onMouseUp : function(e) {
			draw(e);
			isDrawing = false;
		},

		onDblclick : function(e) {
			end(e);
			$this.trigger('svge.addElement', options.form);
		}
	};
});