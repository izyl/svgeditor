var SelectTool = DefaultToolbarItem.extend(function($) {

	// privates
	var me = this;
	var elements;
	var bboxs;

	var selectionStyle = {
		color : "#0066FF",
		offsetx : 2,
		offsety : 2
	};

	function onStart() {
	}

	function onMove(dx, dy, x, y, e) {
		elements.transform('t' + dx + ',' + dy);
		bboxs.transform('t' + dx + ',' + dy);
	};

	function applyTransfo(set) {

		set.forEach(function(elem) {

			console.log(elem.attr('path'));
			var realX = elem.matrix.x(elem.attr("x"), elem.attr("y"));
			var realY = elem.matrix.y(elem.attr("x"), elem.attr("y"));
			console.log(elem);
			if (elem.type == 'path') {
				elem.attr('path', Raphael.transformPath(elem.attr('path'), elem.transform()));
			} else {
				elem.attr({
					x : realX,
					y : realY,
					cx : realX,
					cy : realY,
				});
			}
			elem.transform('');
		});

	}

	function onEnd(e) {
		applyTransfo(bboxs);
		applyTransfo(elements);
	};

	function isElementSelected(element) {
		var found = false;
		elements.forEach(function(elem) {
			if (elem.id == element.id) {
				found = true;
				return false;
			}
		});

		return found;
	};

	// var elem = paper.getElementByPoint(e.pageX, e.pageY);
	function select(e) {

		element = me.paper.getElementByPoint(e.pageX, e.pageY);
		if (!element) {
			clearSelection();
		} else if (isElementSelected(element)) {
			//unselect(element);
		} else if (element) {
			elements.push(element);
			bboxProps = element.getBBox(false);
			bbox = me.paper.rect(bboxProps.x, bboxProps.y, bboxProps.width, bboxProps.height);
			bboxs.push(bbox);
			bbox.attr('stroke', selectionStyle.color);
			element.drag(onMove, onStart, onEnd);
			element.data('bbox', bbox);
			bbox.drag(onMove, onStart, onEnd);
		}
	};

	function unselect(element) {
		elements.exclude(element);
		var bbox = element.data('bbox');
		bboxs.exclude(bbox);
		bbox.remove();
	};

	function clearSelection() {
		bboxs.forEach(function(a) {
			a.remove();
		});
		bboxs.clear();
		elements.clear();
	};

	// public
	return {

		title : ToolbarConfig.SELECT_TOOL.TITLE,
		icon : ToolbarConfig.SELECT_TOOL.ICON,

		init : function(options) {
			this._super(options);
			elements = me.paper.set();
			bboxs = me.paper.set();
		},

		onMouseDown : function(e) {
			select(e);
		},

		getSelectionStyle : function() {
			return selectionStyle;
		},

		desactivate : function() {
			this._super();
			clearSelection();
		}
	};
});