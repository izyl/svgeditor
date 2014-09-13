var ImportAction = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// public
	return {

		title : ToolbarConfig.IMPORT_ACTION.TITLE,
		icon : ToolbarConfig.IMPORT_ACTION.ICON,
	};
});