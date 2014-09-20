var ToBackAction = Action.extend(function($, context) {

	this._super($, context);

	// public
	return {

		title : ToolbarConfig.TOBACK_ACTION.TITLE,
		text : ToolbarConfig.TOBACK_ACTION.TEXT,

		activate : function() {
			this._super();
			$(this).trigger('svge.toBack');
		}
	};
});