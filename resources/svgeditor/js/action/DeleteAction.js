var DeleteAction = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// public
	return {

		title : ToolbarConfig.DELETE_TOOL.TITLE,
		icon : ToolbarConfig.DELETE_TOOL.ICON,

	};
});