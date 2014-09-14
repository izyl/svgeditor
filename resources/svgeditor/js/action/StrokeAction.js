var StrokeAction = Action.extend(function($, context) {

	this._super($, context);

	// public
	return {

		title : ToolbarConfig.STROKE_ACTION.TITLE,
		icon : ToolbarConfig.STROKE_ACTION.ICON,
		text : ToolbarConfig.STROKE_ACTION.TEXT,
	};
});