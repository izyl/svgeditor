var ColorAction = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);
	// public
	return {

		title : ToolbarConfig.COLOR_ACTION.TITLE,
		icon : ToolbarConfig.COLOR_ACTION.ICON,
		text : ToolbarConfig.COLOR_ACTION.TEXT,

	};
});