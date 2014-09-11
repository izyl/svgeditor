var SelectTool = DefaultTool.extend(function($) {

	// privates
	var me = this;
	var element;
	var bbox;
	var cdx = cdy = 0;

	var selectionStyle = {
		color : "#0066FF",
		offsetx : 2,
		offsety : 2
	}

	function onStart() {
		console.log('start');
	}

	function onMove(dx, dy, x, y, e) { // e = event
		
		element.transform('t' + dx + ',' + dy);
		bbox.transform('t' + dx + ',' + dy);
		
		console.log('t' + (dx) + ',' + (dy));
	}

	function onEnd(dx, dy) {
		//trans = element.transform();
		//rtrans = bbox.transform();
	}

	// var elem = paper.getElementByPoint(e.pageX, e.pageY);
	function select(e) {
		element = me.paper.getElementByPoint(e.pageX, e.pageY);
		if (element && !bbox) {
			
			console.log('selected');
			bboxProps = element.getBBox(false);
			bbox = me.paper.rect(bboxProps.x, bboxProps.y, bboxProps.width, bboxProps.height);
			bbox.glow(selectionStyle);

			element.drag(onMove, onStart, onEnd);
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
		}
	};
});