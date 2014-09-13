var ExportAction = DefaultToolbarItem.extend(function($) {
	// privates
	var me = this;
	
	// public
	return {

		title : ToolbarConfig.EXPORT_ACTION.TITLE,
		icon : ToolbarConfig.EXPORT_ACTION.ICON,

		// rend l'outil actif
		activate : function() {
			// $.ajax

			// puis affichage du résulat
			var _alert = me.$alert.clone();
			_alert.addClass('alert alert-info');
			_alert.find('.contentspan').text(paper.toSVG());
			me.$canvas.after(_alert);

			_alert = me.$alert.clone();
			_alert.addClass('alert alert-success notifications');
			me.$canvas.before(_alert);
			_alert.find('.contentspan').text('Your work has been successfully saved');
			_alert.fadeOut(2000);
		}

	};
});