var DeleteAction = Action.extend(function($, context) {

	this._super($, context);

	// privates
	var KEYCODE_DELETE = 46;
	$(document).keydown(function(e) {
		if (KEYCODE_DELETE == e.keyCode) {
			ToolManager.getTool('selectTool').deleteSelection();
		}
	});

	// public
	return {

		title : ToolbarConfig.DELETE_TOOL.TITLE,
		icon : ToolbarConfig.DELETE_TOOL.ICON,

		activate : function() {
			this._super();
			ToolManager.getTool('selectTool').deleteSelection();
		}
	};
});