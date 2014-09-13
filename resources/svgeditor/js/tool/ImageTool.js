var ImageTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// public
	return {

		title : ToolbarConfig.IMAGE_TOOL.TITLE,
		icon : ToolbarConfig.IMAGE_TOOL.ICON,

		activate : function() {
			console.log('open file dialog');
		}

	};
});