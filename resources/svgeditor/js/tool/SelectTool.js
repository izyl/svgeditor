var SelectTool = Tool.extend(function($, context) {
	this._super($, context);

	// privates
	var KEYCODE_ESCAPE = 27;
	var $popover = $('<div></div>');
	$('body').append($popover);
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
			selection.push(element);
			// Add freeTransform with options and callback
			var ft = context.paper.freeTransform(element, {
				keepRatio : true,
				draw : [ 'bbox', 'circle' ]
			// draw : [ 'bbox', 'circle' ]
			}, function(ft, events) {
			});
			element.data('ft', ft);
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
			me.active = false;
			me.clearSelection();
		},

		onDblClick : function(e) {

			var element = this;

			$popover.popover({
				'title' : function() {
					return '<h4>' + ToolbarConfig.PROPERTIES_DIALOG.TITLE + '</h4>';
				},
				'html' : true,
				'content' : ToolbarConfig.PROPERTIES_DIALOG.CONTENT
			});
			$popover.css('position', 'absolute');
			var bbox = this.getBBox();
			$popover.css('left', context.$canvas.offset().left + bbox.x2);
			$popover.css('top', context.$canvas.offset().top + bbox.y2 - (bbox.height / 2));
			$popover.popover('show');

			$('#svg-element-close').on('click', function(e) {
				$popover.popover('hide');
			});

			$('#svg-element-stroke-color').on('change', function(e) {
				element.attr('stroke', '#' + $(this).val());
			});
			$('#svg-element-stroke-width').on('change', function(e) {
				element.attr('stroke-width', $(this).val());
			});
			$('#svg-element-stroke-opacity').on('change', function(e) {
				element.attr('stroke-opacity', $(this).val() + '%');
			});
			$('#svg-element-fill-color').on('change', function(e) {
				element.attr('fill', '#' + $(this).val());
			});
			$('#svg-element-fill-opacity').on('change', function(e) {
				element.attr('fill-opacity', $(this).val() + '%');
			});
			$('#svg-element-up').on('click', function(e) {
				element.toFront();
			});

			$('#svg-element-down').on('click', function(e) {
				element.toBack();
			});

			// $popover.on('hidden.bs.popover', function(a,b,c,d) {
			// // do something…
			// $popover.popover('hide');
			// });

			// <!-- Button trigger modal -->
			// <button class="btn btn-primary btn-lg" data-toggle="modal"
			// data-target="#myModal">
			// Launch demo modal
			// </button>
			//
			// <!-- Modal -->
			// <div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			// aria-labelledby="myModalLabel" aria-hidden="true">
			// <div class="modal-dialog">
			// <div class="modal-content">
			// <div class="modal-header">
			// <button type="button" class="close" data-dismiss="modal"><span
			// aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
			// <h4 class="modal-title" id="myModalLabel">Modal title</h4>
			// </div>
			// <div class="modal-body">
			// ...
			// </div>
			// <div class="modal-footer">
			// <button type="button" class="btn btn-default"
			// data-dismiss="modal">Close</button>
			// <button type="button" class="btn btn-primary">Save changes</button>
			// </div>
			// </div>
			// </div>
			// </div>

		}
	};
});
