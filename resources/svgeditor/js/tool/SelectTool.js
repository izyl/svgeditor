var SelectTool = Tool.extend(function($, context) {

	this._super($, context);

	// privates
	var me = this;
	var elements = context.paper.set();
	var glows = context.paper.set();

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

	function addGlow(element) {
		var glow = element.glow(ToolbarConfig.glow);
		element.data("glow", glow);
		glows.push(glow);
		// glow.mousemove(scaleBox);
	}

	function select(element) {
		if (!isElementSelected(element)) {
			console.log("add", element);
			elements.push(element);
			addGlow(element);
		}
	}

	var scaleBox = function(e) {
		var element = context.paper.getElementByPoint(e.pageX, e.pageY);
		if (isElementSelected(element)) {

			var bbox = element.getBBox();
			var center = me.getBBoxCenter(bbox);
			var cursor = me.getMousePosition(e);

			// angle formé des 3 points dans l'ordre : coin supérieur gauche de la bbox,
			// centre de
			// la bbox, curseur
			var angle = Raphael.angle(bbox.x, bbox.y, cursor.x, cursor.y, center.x, center.y);
			var glow = element.data("glow") ? element.data("glow") : element;
			// log visuel pour la postion du curseur
			$('#console').text("x:" + cursor.x + ",y:" + cursor.y + ", angle: " + angle);
			// ça va pas marcher .. TODO : calcul du sens de la double fleche
			if (angle > 5 && angle < 35) {
				glow.attr('cursor', 'n-resize');
			} else if (angle >= 35 && angle <= 50) {
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
	}

	function unselect(element) {
		elements.exclude(element);
		// var bbox = element.data("bbox");
		// bboxs.exclude(bbox);
		// bbox.remove();
		var glow = element.data("glow");
		glows.exclude(glow);
		glows.undrag();
		glow.remove();
	}

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

		onSelect : function(e) {
			if (me.active) {
				e.stopPropagation();
				select(this);
			}
		},

		onMouseDown : function(e) {
			me.clearSelection();
		},

		onDblClick : function(e) {
			var bbox = this.getBBox();
			context.$popover.attr('title', 'Element properties');
			context.$popover.attr('data-content', 'The properties panel with inputs : stroke , color, scale, rotation, etc...');
			context.$popover.css('left', context.$canvas.offset().left + bbox.x2);
			context.$popover.css('top', context.$canvas.offset().top + bbox.y2 - (bbox.height / 2));
			context.$popover.popover('show');
			$('body').one('click.popover.data-api', function() {
				context.$popover.popover('hide');
			});

		}
	};
});