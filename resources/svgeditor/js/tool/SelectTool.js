var SelectTool = Tool.extend(function($, context) {
	this._super($, context);

	// privates
	var KEYCODE_ESCAPE = 27;
	var me = this;
	$(document).keydown(function(e) {
		if (KEYCODE_ESCAPE == e.keyCode) {
			me.clearSelection();
		}
	});

	var selection = context.paper.set();

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
			console.log(element);
			selection.push(element);
			// Add freeTransform with options and callback
			var ft = context.paper.freeTransform(element, {
				keepRatio : true,
				draw : [ 'bbox', 'circle' ]
			// draw : [ 'bbox', 'circle' ]
			}, function(ft, events) {
				console.log(ft.attrs);
				console.log(events);
			});
			element.data('ft', ft);
		}
	}

	// public
	return {

		title : ToolbarConfig.SELECT_TOOL.TITLE,
		icon : ToolbarConfig.SELECT_TOOL.ICON,

		clearSelection : function() {
			selection.forEach(function(element) {
				element.data('ft').unplug();
			});
			selection.clear();
		},

		deleteSelection : function() {
			selection.forEach(function(element) {
				element.data('ft').unplug();
				element.remove();
			});
			selection.clear();
		},

		onMouseDown : function(e) {
			console.log(this);
			var element = context.paper.getElementByPoint(e.pageX, e.pageY)
			if (!element)
				me.clearSelection();
		},

		onSelect : function(e) {
			if (me.active) {
				select(this);
				e.stopPropagation();
			}
		},

		descativate : function() {
			me._super();
			me.active = false;
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
