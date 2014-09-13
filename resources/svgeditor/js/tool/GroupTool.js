var GroupTool = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// Return an object exposed to the public
	return {

		title : ToolbarConfig.GROUP_TOOL.TITLE,
		icon : ToolbarConfig.GROUP_TOOL.ICON,

	};
});