var ExportAction = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

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
			var _alert = options.$alert.clone();
			_alert.addClass('alert alert-info');
			_alert.find('.contentspan').text(paper.toSVG());
			options.$canvas.after(_alert);

			_alert = options.$alert.clone();
			_alert.addClass('alert alert-success notifications');
			options.$canvas.before(_alert);
			_alert.find('.contentspan').text('Your work has been successfully saved');
			_alert.fadeOut(2000);
		}

	};
});