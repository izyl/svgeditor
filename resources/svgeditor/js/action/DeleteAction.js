var DeleteAction = Action.extend(function($, context) {

	var KEYCODE_DELETE = 46;

	this._super($, context);

	// privates
	$this = $(this);
	$(document).keydown(function(e) {
		if (KEYCODE_DELETE == e.keyCode) {
			$this.trigger('svge.deleteSelection');
		}
	});

	// public
	return {

		title : ToolbarConfig.DELETE_TOOL.TITLE,
		icon : ToolbarConfig.DELETE_TOOL.ICON,

		activate : function() {
			$this.trigger('svge.deleteSelection');
		}
	};
});