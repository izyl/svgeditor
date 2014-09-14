var PathTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

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
		form = options.paper.path(path);
		form.attr("fill", options.fill.color);
		form.attr("stroke", options.stroke.color);
		form.attr("stroke-width", options.stroke.width);
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
				$this.trigger('svge.addElement', form);
				form = null;
			}
		},

	};
});