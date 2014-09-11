var PathTool = DefaultTool.extend(function($) {

	// privates
	var me = this;
	var path;
	var isDrawing;

	function draw(e) {
		var point = me.getMousePosition(e);
		path += 'L' + point.x + ',' + point.y;
		me.form.attr('path', path);
	}

	function start(e) {
		isDrawing = true;
		var point = me.getMousePosition(e);
		path = "M" + point.x + ',' + point.y;
		me.form = me.paper.path(path);
		me.form.attr("fill", me.fill.color);
		me.form.attr("stroke", me.stroke.color);
		me.form.attr("stroke-width", me.stroke.width);
	}
	
	function end(e){
		console.log("end");
		path += 'z';
		me.form.attr('path', path);
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
			if (isDrawing) {
				draw(e)
			}
		},

		onMouseUp : function(e) {
			draw(e);
			isDrawing = false;
		},
		
		onDblclick : function(e){
			end(e);
			me.form = null;
		},
		
		desactivate : function(e) {
			me._super(e);
			me.form = null;
		},
	};
});