var TextTool = Tool.extend(function($, context) {

	this._super($, context);
	var me = this;
	var form;

	var $popover = $('<div></div>');
	$popover.popover({
		'html' : true,
		'content' : ToolbarConfig.TEXT_DIALOG.CONTENT
	});
	$('body').append($popover);

	function start(e) {
		center = me.getMousePosition(e);
		var pos = me.getMousePosition(e);
		form = context.paper.text(pos.x, pos.y, "text");

		$popover.css('position', 'absolute');
		var bbox = form.getBBox();
		$popover.css('left', context.$canvas.offset().left + bbox.x2);
		$popover.css('top', context.$canvas.offset().top + bbox.y2 - (bbox.height / 2));
		$popover.popover('show');

		$('#svg-text-close').on('click', function(e) {
			$popover.popover('hide');
		});

		$('#svg-text-input').on('change', function(e) {
			console.log($(this));
			form.attr('text', $(this).val());
		});

		form.mousedown(ToolManager.getTool('selectTool').onSelect);
		form.dblclick(ToolManager.getTool('selectTool').onDblClick);
	}

	// public
	return {
		title : ToolbarConfig.TEXT_TOOL.TITLE,
		icon : ToolbarConfig.TEXT_TOOL.ICON,

		onMouseDown : function(e) {
			start(e);
		},

		activate : function() {
			me._super();
		}
	};
});