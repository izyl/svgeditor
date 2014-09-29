var ImageTool = Tool.extend(function($, context) {

	this._super($, context);
	var me = this;

	// public
	return {

		title : ToolbarConfig.IMAGE_TOOL.TITLE,
		icon : ToolbarConfig.IMAGE_TOOL.ICON,

		activate : function() {
			me._super();
			var form = context.paper.image("http://www.smitwallpaper.com/wallpaper/original/dual-display-wallpapers-20.jpg", 200, 100, 200, 100);
			form.mousedown(ToolManager.getTool('selectTool').onSelect);
			form.dblclick(ToolManager.getTool('selectTool').onDblClick);
		}
	};
});