var SelectTool = Tool.extend(function($, context) {

	this._super($, context);

	// privates
	var me = this;
	var selection = context.paper.set();

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
		selection.forEach(function(elem) {
			if (elem.id == element.id) {
				found = true;
				return false;
			}
		});

		return found;
	}

	function addGlow(element) {
		element.data("glow", element.glow(ToolbarConfig.glow));
	}
	
	function removeGlow(element){
		element.data("glow").remove();
		element.data("glow", null);
	}

	function select(element) {
		if (!isElementSelected(element)) {
			console.log("add", element);
			selection.push(element);
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
		selection.exclude(element);
		removeGlow(element);
	}

	// public
	return {

		title : ToolbarConfig.SELECT_TOOL.TITLE,
		icon : ToolbarConfig.SELECT_TOOL.ICON,
		
		clearSelection : function() {
			selection.forEach(function(element) {
				removeGlow(element);
			});
			selection.clear();
		},

		deleteSelection : function() {
			selection.forEach(function(element) {
				removeGlow(element);
				element.remove();
			});
			selection.clear();
		},

		onMove : function(dx, dy, x, y, e) {
			selection.forEach(function(element){
				removeGlow(element);
			});
			selection.forEach(function(element){
				element.transform("t" + dx + "," + dy);
			});
			selection.forEach(function(element){
				addGlow(element);
			});
		},

		onEnd : function(e) {
			applyTransfo(selection);
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
			
			console.log(this);
			
//			var bbox = this.getBBox();
//			context.$popover.attr('title', 'Element properties');
//			context.$popover.attr('data-content', 'The properties panel with inputs : stroke , color, scale, rotation, etc...');
//			context.$popover.css('left', context.$canvas.offset().left + bbox.x2);
//			context.$popover.css('top', context.$canvas.offset().top + bbox.y2 - (bbox.height / 2));
//			context.$popover.popover('show');
//			
//			$('body').one('click.popover.data-api', function() {
//				context.$popover.popover('hide');
//			});

		}
	};
});
