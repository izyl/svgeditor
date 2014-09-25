var ToFrontAction = Action.extend(function($, context) {

	this._super($, context);

	// public
	return {

		title : ToolbarConfig.TOFRONT_ACTION.TITLE,
		text : ToolbarConfig.TOFRONT_ACTION.TEXT,

		activate : function() {
			this._super();
			$(this).trigger('svge.toFront');
		}
	};
});