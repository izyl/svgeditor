var DeleteAction = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	$this = $(this);

	// public
	return {

		title : ToolbarConfig.DELETE_TOOL.TITLE,
		icon : ToolbarConfig.DELETE_TOOL.ICON,

		activate : function() {
			$this.trigger('svge.deleteSelection');
		}
	};
});