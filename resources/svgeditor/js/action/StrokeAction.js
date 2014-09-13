var StrokeAction = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// public
	return {

		title : ToolbarConfig.STROKE_ACTION.TITLE,
		icon : ToolbarConfig.STROKE_ACTION.ICON,
		text : ToolbarConfig.STROKE_ACTION.TEXT,
	};
});