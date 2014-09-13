var TextTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// public
	return {
		title : ToolbarConfig.TEXT_TOOL.TITLE,
		icon : ToolbarConfig.TEXT_TOOL.ICON,
	};
});