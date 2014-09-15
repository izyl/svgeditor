var ImportAction = Action.extend(function($, context) {

	this._super($, context);

	// privates
	var me = this;
	
	// public
	return {

		title : ToolbarConfig.IMPORT_ACTION.TITLE,
		icon : ToolbarConfig.IMPORT_ACTION.ICON,
	};
});