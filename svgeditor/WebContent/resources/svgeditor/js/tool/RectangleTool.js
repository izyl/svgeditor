var RectangleTool = DefaultTool.extend(function($) {

	// privates
	var me = this;
	var firstPoint;
	var secondPoint;

	function getProperties(pointA, pointB) {

		var props = {
			x : null,
			y : null,
			width : null,
			height : null
		}

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
		me.form.attr('x', props.x);
		me.form.attr('y', props.y);
		me.form.attr('width', props.width);
		me.form.attr('height', props.height);
		me.form.attr("fill", me.fill.color);
		me.form.attr("stroke", me.stroke.color);
	}

	function draw(e) {
		secondPoint = me.getMousePosition(e);
		var props = getProperties(firstPoint, secondPoint);
		setProps(props);
	}

	function start(e) {
		firstPoint = me.getMousePosition(e);
		me.form = me.paper.rect(firstPoint.x, firstPoint.y, 0, 0);
	}

	// public
	return {

		init : function(options) {
			me._super(options);
		},

		onMouseDown : function(e) {
			start(e);
		},

		onMouseMove : function(e) {
			if (me.form) {
				draw(e)
			}
		},

		onMouseUp : function(e) {
			draw(e);
			me.form = null;
		}
	};
});