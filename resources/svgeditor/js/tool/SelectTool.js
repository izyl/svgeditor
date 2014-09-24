var SelectTool = Tool.extend(function($, context) {
	this._super($, context);

	// privates
	var KEYCODE_ESCAPE = 27;
	var $popover = $('<div></div>');
	$popover.popover({
		'title' : function() {
			return '<h4>' + ToolbarConfig.PROPERTIES_DIALOG.TITLE + '</h4>';
		},
		'html' : true,
		'content' : ToolbarConfig.PROPERTIES_DIALOG.CONTENT
	});

	$('body').append($popover);
	var me = this;
	$(document).keydown(function(e) {
		if (KEYCODE_ESCAPE == e.keyCode) {
			me.clearSelection();
		}
	});

	var selection = context.paper.set();
	var freetransform;

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

	function select(element) {
		if (!isElementSelected(element)) {
			selection.push(element);

			if (freetransform) {
				freetransform.unplug();
			}

			freetransform = context.paper.freeTransform(selection, {
				keepRatio : true,
				draw : [ 'bbox', 'circle' ]
			});
			freetransform.apply();
		}
	}

	// public
	return {

		title : ToolbarConfig.SELECT_TOOL.TITLE,
		icon : ToolbarConfig.SELECT_TOOL.ICON,

		toFront : function() {
			selection.forEach(function(elem) {
				elem.toFront();
			});
		},

		toBack : function() {
			selection.forEach(function(elem) {
				elem.toBack();
			});
		},

		clearSelection : function() {
			if (freetransform) {
				freetransform.unplug();
			}
			selection.clear();
		},

		deleteSelection : function() {
			selection.forEach(function(element) {
				element.remove();
			});
			if (freetransform) {
				freetransform.unplug();
			}
			selection.clear();
		},

		onMouseDown : function(e) {
			var element = context.paper.getElementByPoint(e.pageX, e.pageY);
			if (!element) {
				me.clearSelection();
				$popover.popover('hide');
			}
		},

		onSelect : function(e) {
			if (me.active) {
				select(this);
				e.stopPropagation();
			}
		},

		desactivate : function() {
			me._super();
			me.clearSelection();
		},

		onDblClick : function(e) {

			if (!me.active) {
				return;
			}
			console.log('dbl');
			var element = this;

			$popover.css('position', 'absolute');
			var bbox = this.getBBox();
			$popover.css('left', context.$canvas.offset().left + bbox.x2);
			$popover.css('top', context.$canvas.offset().top + bbox.y2 - (bbox.height / 2));
			$popover.popover('show');

			$('#svg-element-close').on('click', function(e) {
				$popover.popover('hide');
			});

			$('#svg-element-stroke-color').val(element.attr('stroke')).on('change', function(e) {
				selection.attr('stroke', '#' + $(this).val());
			});
			$('#svg-element-stroke-width').on('change', function(e) {
				selection.attr('stroke-width', $(this).val());
			});
			$('#svg-element-stroke-opacity').on('change', function(e) {
				selection.attr('stroke-opacity', $(this).val() + '%');
			});
			$('#svg-element-fill-color').on('change', function(e) {
				selection.attr('fill', '#' + $(this).val());
			});
			$('#svg-element-fill-opacity').on('change', function(e) {
				selection.attr('fill-opacity', $(this).val() + '%');
			});
			$('#svg-element-up').on('click', function(e) {
				selection.toFront();
			});

			$('#svg-element-down').on('click', function(e) {
				selection.toBack();
			});
		}
	};
});
