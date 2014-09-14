var ImageTool = Tool.extend(function($, context) {

	this._super($, context);

	// public
	return {

		title : ToolbarConfig.IMAGE_TOOL.TITLE,
		icon : ToolbarConfig.IMAGE_TOOL.ICON,

		activate : function() {
			console.log('open file dialog');
		}

	};
});