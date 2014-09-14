var SelectTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	var me = this;
	var elements = options.paper.set();
	var glows = options.paper.set();

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
		if (!found) {
			glows.forEach(function(glow) {
				glow.forEach(function(elem) {
					if (elem.id == element.id) {
						found = true;
						return false;
					}
				});
			});
		}

		return found;
	}

	function select(e) {
		element = options.paper.getElementByPoint(e.pageX, e.pageY);
		if (!element) {
			me.clearSelection();
		} else if (isElementSelected(element)) {
			// unselect(element);
		} else if (element) {
			elements.push(element);
			if (!element.data("glow")) {
				var glow = element.glow(ToolbarConfig.glow);
				element.data("glow", glow);
				glows.push(glow);
				glow.drag(this.onMove, $.emptyFn, this.onEnd);
				//glow.mousemove(scaleBox);
			}
		}
	}

	var scaleBox = function(e) {
		var element = options.paper.getElementByPoint(e.pageX, e.pageY);
		if (isElementSelected(element)) {

			var bbox = element.getBBox();
			var center = me.getBBoxCenter(bbox);
			var cursor = me.getMousePosition(e);

			// angle formé des 3 points dans l'ordre : coin supérieur gauche de la bbox, centre de
			// la bbox, curseur
			var angle = Raphael.angle(bbox.x, bbox.y, cursor.x, cursor.y, center.x, center.y);
			var glow = element.data("glow") ? element.data("glow") : element;
			// log visuel pour la postion du curseur
			$('#console').text("x:" + cursor.x + ",y:" + cursor.y + ", angle: " + angle);
			// ça va pas marcher .. TODO : calcul du sens de la double fleche
			if (angle > 5 && angle < 35) {
				glow.attr('cursor', 'n-resize');
			} else if (angle >= 35 && angle <= 40) {
				glow.attr('cursor', 'ne-resize');
			} else if (angle > 40 && angle < 60) {
				glow.attr('cursor', 'e-resize');
			} else if (angle > -5 && angle < 5) {
				glow.attr('cursor', 'se-resize');
			} else if (angle > -5 && angle < 5) {
				glow.attr('cursor', 's-resize');
			} else if (angle > -5 && angle < 5) {
				glow.attr('cursor', 'sw-resize');
			} else if (angle > -5 && angle < 5) {
				glow.attr('cursor', 'w-resize');
			} else if (angle > -5 && angle < 5) {
				glow.attr('cursor', 'nw-resize');
			}
		}
	};

	// function unselect(element) {
	// elements.exclude(element);
	// // var bbox = element.data("bbox");
	// // bboxs.exclude(bbox);
	// // bbox.remove();
	// var glow = element.data("glow");
	// glows.exclude(glow);
	// glow.remove();
	// }

	// public
	return {
		clearSelection : function() {
			glows.remove();

			glows.unmousemove(scaleBox);
			glows.clear();
			elements.forEach(function(element) {
				element.data("glow", null);
			});
			elements.clear();
			elements.undrag();
		},

		deleteSelection : function() {
			glows.remove();
			glows.clear();
			elements.remove();
			elements.clear();
		},

		title : ToolbarConfig.SELECT_TOOL.TITLE,
		icon : ToolbarConfig.SELECT_TOOL.ICON,

		onMove : function(dx, dy, x, y, e) {
			elements.transform("t" + dx + "," + dy);
			glows.transform("t" + dx + "," + dy);
		},

		onEnd : function(e) {
			applyTransfo(elements);
			for (var glow = 0; glow < glows.length; glow++) {
				applyTransfo(glows[glow]);
			}
		},

		onMouseDown : function(e) {
			select(e);
		},

		getSelectionStyle : function() {
			return selectionStyle;
		},

//		desactivate : function() {
//			this._super();
//			this.clearSelection();
//		}
	};
});