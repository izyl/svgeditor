var PolygonTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	var me = this;
	var $this = $(this);
	var points = [];
	var path = null;
	var isDrawing = false;
	var tmpPath = null;
	var form;
	
	function draw() {
		form.attr('path', path);
	}

	function addTmpPoint(e) {
		if (isDrawing) {
			var point = me.getMousePosition(e);
			tmpPath = path + 'L' + point.x + ',' + point.y + 'L' + points[0].x + ',' + points[0].y + 'z';
			form.attr('path', tmpPath);
		}
	}

	function addPoint(e) {
		isDrawing = true;
		var point = me.getMousePosition(e);
		points.push(point);

		if (points.length == 1) {
			path = "M" + point.x + ',' + point.y;
			form = options.paper.path(path);
			form.attr("fill", options.fill.color);
			form.attr("stroke", options.stroke.color);
			form.attr("stroke-width", options.stroke.width);
			draw();
		} else if (points.length > 1) {
			path = path + 'L' + point.x + ',' + point.y;
			draw();
		}
	}

	// close the polygon
	function end(e) {
		form.attr('path', tmpPath);
		$this.trigger('svge.addElement', form);
		
		// prepare for a new polygon
		form = null;
		points = [];
		isDrawing = false;
	}

	// public
	return {

		title : ToolbarConfig.POLYGON_TOOL.TITLE,
		icon : ToolbarConfig.POLYGON_TOOL.ICON,

		onMouseDown : function(e) {
			addPoint(e);
		},

		onMouseMove : function(e) {
			addTmpPoint(e);
		},

		onDblclick : function(e) {
			end(e);
		},
		
		desactivate: function(){
			me._super();
			
			if(isDrawing){
				form.remove();
			}
			form = null;
			points = [];
			isDrawing = false;
		}
	};
});