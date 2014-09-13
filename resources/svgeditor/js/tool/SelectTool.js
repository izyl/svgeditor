var SelectTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	var elements = options.paper.set();
	var glows = options.paper.set();
	// var bboxs = options.paper.set();

	function onMove(dx, dy, x, y, e) {
		elements.transform("t" + dx + "," + dy);
		glows.transform("t" + dx + "," + dy);
		// bboxs.transform("t" + dx + "," + dy);
	}

	function onEnd(e) {
		applyTransfo(elements);
		for (var glow = 0; glow < glows.length; glow++) {
			applyTransfo(glows[glow]);
		}
		// applyTransfo(bboxs);
	}

	function applyTransfo(set) {

		set.forEach(function(elem) {

			var realX = elem.matrix.x(elem.attr("x"), elem.attr("y"));
			var realY = elem.matrix.y(elem.attr("x"), elem.attr("y"));

			if (elem.type == "path") {
				elem.attr("path", Raphael.transformPath(elem.attr("path"), elem.transform()));
			} else {
				elem.attr({
					x : realX,
					y : realY,
					cx : realX,
					cy : realY,
				});
			}
			elem.transform("");
		});

	}

	function isElementSelected(element) {
		var found = false;
		elements.forEach(function(elem) {
			if (elem.id == element.id) {
				found = true;
				return false;
			}
		});

		return found;
	}

	function select(e) {
		element = options.paper.getElementByPoint(e.pageX, e.pageY);
		if (!element) {
			clearSelection();
		} else if (isElementSelected(element)) {
			// unselect(element);
		} else if (element) {
			elements.push(element);
			// bboxProps = element.getBBox(false);
			// bbox = options.paper.rect(bboxProps.x, bboxProps.y, bboxProps.width, bboxProps.height);
			// bboxs.push(bbox);
			// bbox.attr("stroke", selectionStyle.color);
			// element.data("bbox", bbox);
			var glow = element.glow(ToolbarConfig.glow);
			glows.push(glow);
			element.data("glow", glow);

			element.drag(onMove, $.emptyFn, onEnd);
			glow.drag(onMove, $.emptyFn, onEnd);
		}
	}

	// function unselect(element) {
	// elements.exclude(element);
	// // var bbox = element.data("bbox");
	// // bboxs.exclude(bbox);
	// // bbox.remove();
	// var glow = element.data("glow");
	// glows.exclude(glow);
	// glow.remove();
	// }

	function clearSelection() {
		glows.remove();
		glows.clear();
		elements.clear();
		elements.undrag();
	}

	// public
	return {

		title : ToolbarConfig.SELECT_TOOL.TITLE,
		icon : ToolbarConfig.SELECT_TOOL.ICON,

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