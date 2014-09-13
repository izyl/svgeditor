var RectangleTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	var me = this;
	var $this = $(this);
	var firstPoint = null;
	var secondPoint = null;

	function getProperties(pointA, pointB) {

		var props = {
			x : null,
			y : null,
			width : null,
			height : null
		};

		if (!pointA || !pointB) {
			return null;
		}

		pointA.x < pointB.x ? props.x = pointA.x : props.x = pointB.x;
		pointA.y < pointB.y ? props.y = pointA.y : props.y = pointB.y;

		if (pointA.x < pointB.x) {
			props.x = pointA.x;
			props.width = pointB.x - pointA.x;
		} else {
			props.x = pointB.x;
			props.width = pointA.x - pointB.x;
		}

		if (pointA.y < pointB.y) {
			props.y = pointA.y;
			props.height = pointB.y - pointA.y;
		} else {
			props.y = pointB.y;
			props.height = pointA.y - pointB.y;
		}

		return props;
	}

	function setProps(props) {
		options.form.attr('x', props.x);
		options.form.attr('y', props.y);
		options.form.attr('width', props.width);
		options.form.attr('height', props.height);
		options.form.attr("fill", options.fill.color);
		options.form.attr("stroke", options.stroke.color);
		options.form.attr("stroke-width", options.stroke.width);
	}

	function draw(e) {
		secondPoint = me.getMousePosition(e);
		var props = getProperties(firstPoint, secondPoint);
		setProps(props);
	}

	function start(e) {
		firstPoint = me.getMousePosition(e);
		options.form = options.paper.rect(firstPoint.x, firstPoint.y, 0, 0);
	}

	// public
	return {

		title : ToolbarConfig.RECTANGLE_TOOL.TITLE,
		icon : ToolbarConfig.RECTANGLE_TOOL.ICON,

		onMouseDown : function(e) {
			start(e);
		},

		onMouseMove : function(e) {
			if (options.form) {
				draw(e);
			}
		},

		onMouseUp : function(e) {
			draw(e);
			$this.trigger('svge.addElement', options.form);
			options.form = null;
		}
	};
});