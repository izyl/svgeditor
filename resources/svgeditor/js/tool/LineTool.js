var LineTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	var me = this;
	var $this = $(this);
	var firstPoint = null;
	var secondPoint = null;
	var form;

	function start(e) {
		firstPoint = me.getMousePosition(e);
		form = options.paper.path("M" + firstPoint.x + "," + firstPoint.y);
	}

	function getLinePath(firstPoint, secondPoint) {
		return "M" + firstPoint.x + "," + firstPoint.y + "L" + secondPoint.x + "," + secondPoint.y + "z";
	}
	function draw(e) {
		secondPoint = me.getMousePosition(e);
		var linePath = getLinePath(firstPoint, secondPoint);
		form.attr({
			'path' : linePath,
			"fill" : options.fill.color,
			"stroke" : options.stroke.color,
			"stroke-width" : options.stroke.width
		});
	}

	// Public
	return {

		title : ToolbarConfig.LINE_TOOL.TITLE,
		icon : ToolbarConfig.LINE_TOOL.ICON,

		onMouseDown : function(e) {
			start(e);
		},

		onMouseMove : function(e) {
			if (form) {
				draw(e);
			}
		},

		onMouseUp : function(e) {
			draw(e);
			$this.trigger('svge.addElement', form);
			form = null;
		}
	};
});