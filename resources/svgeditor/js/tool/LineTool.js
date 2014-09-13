var LineTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	var me = this;
	var $this = $(this);
	var firstPoint = null;
	var secondPoint = null;

	function start(e) {
		firstPoint = me.getMousePosition(e);
		options.form = options.paper.path("M" + firstPoint.x + "," + firstPoint.y);
	}

	function getLinePath(firstPoint, secondPoint) {
		return "M" + firstPoint.x + "," + firstPoint.y + "L" + secondPoint.x + "," + secondPoint.y + "z";
	}
	function draw(e) {
		secondPoint = me.getMousePosition(e);
		var linePath = getLinePath(firstPoint, secondPoint);
		options.form.attr('path', linePath);
		options.form.attr("fill", options.fill.color);
		options.form.attr("stroke", options.stroke.color);
		options.form.attr("stroke-width", options.stroke.width);
	}

	// Public
	return {

		title : ToolbarConfig.LINE_TOOL.TITLE,
		icon : ToolbarConfig.LINE_TOOL.ICON,

		onMouseDown : function(e) {
			start(e);
		},

		onMouseMove : function(e) {
			if (options.form) {
				draw(e);
			}
			;
		},

		onMouseUp : function(e) {
			draw(e);
			$this.trigger('svge.addElement', options.form);
			options.form = null;
		}
	};
});