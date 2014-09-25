var ImageTool = Tool.extend(function($, context) {

	this._super($, context);
	var me = this;
	
	// public
	return {

		title : ToolbarConfig.IMAGE_TOOL.TITLE,
		icon : ToolbarConfig.IMAGE_TOOL.ICON,

		activate : function() {
			
			me._super();
		}

	};
});