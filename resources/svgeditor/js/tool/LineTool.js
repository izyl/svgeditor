var LineTool = Tool.extend(function($, context) {

	this._super($, context);

	// privates
	var me = this;
	var $this = $(this);
	var firstPoint = null;
	var secondPoint = null;
	var form;

	function start(e) {
		firstPoint = me.getMousePosition(e);
		form = context.paper.path("M" + firstPoint.x + "," + firstPoint.y);
	}

	function getLinePath(firstPoint, secondPoint) {
		return "M" + firstPoint.x + "," + firstPoint.y + "L" + secondPoint.x + "," + secondPoint.y + "z";
	}
	function draw(e) {
		secondPoint = me.getMousePosition(e);
		var linePath = getLinePath(firstPoint, secondPoint);
		form.attr({
			'path' : linePath,
			"fill" : context.fill.color,
			"stroke" : context.stroke.color,
			"stroke-width" : context.stroke.width,
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
			if (form) {
				draw(e);
				$this.trigger('svge.addElement', form);
				form = null;
			}
		}
	};
});