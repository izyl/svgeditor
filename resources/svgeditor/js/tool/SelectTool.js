var SelectTool = DefaultTool.extend(function($) {

	// privates
	var me = this;
	var element;
	var bbox;
	var set;
	var cdx, cdy;

	var selectionStyle = {
		color : "#0066FF",
		offsetx : 2,
		offsety : 2
	}

	function onStart() {
		console.log('start');
	}

	function onMove(dx, dy, x, y, e) { // e = event

		set.transform('t' + dx + ',' + dy);
		cdx = dx;
		cdy = dy;
	}

	function applyTransfo(elem) {
		var realX = elem.matrix.x(elem.attr("x"), elem.attr("y"));
		var realY = elem.matrix.y(elem.attr("x"), elem.attr("y"));
		elem.attr({
			x : realX,
			y : realY
		});
		elem.transform('');
	}

	function onEnd(e) {

		applyTransfo(bbox);
		applyTransfo(element);
	}

	// var elem = paper.getElementByPoint(e.pageX, e.pageY);
	function select(e) {

		if (!element) {
			element = me.paper.getElementByPoint(e.pageX, e.pageY);
			if (element) {
				bboxProps = element.getBBox(false);
				bbox = me.paper.rect(bboxProps.x, bboxProps.y, bboxProps.width, bboxProps.height);
				bbox.attr('stroke', selectionStyle.color);
				set = me.paper.set(element, bbox);
				set.drag(onMove, onStart, onEnd);
			}
		}
	}

	// public
	return {

		init : function(options) {
			me._super(options);
		},

		onMouseDown : function(e) {
			select(e);
		},

		getSelectionStyle : function() {
			return selectionStyle;
		},

		desactivate : function() {
			element = null;
			bbox.remove();
			bbox = null;
		}
	};
});