var ExportAction = Action.extend(function($, context) {
	this._super($, context);

	// public
	return {

		title : ToolbarConfig.EXPORT_ACTION.TITLE,
		icon : ToolbarConfig.EXPORT_ACTION.ICON,

		activate : function() {
			this._super();
			// $.ajax

			// puis affichage du résulat
			var _alert = context.$alert.clone();
			_alert.addClass('alert alert-info');
			_alert.find('.contentspan').text(context.paper.toSVG());
			context.$canvas.after(_alert);

			_alert = context.$alert.clone();
			_alert.addClass('alert alert-success notifications');
			context.$canvas.before(_alert);
			_alert.find('.contentspan').text('Your work has been successfully saved');
			_alert.fadeOut(2000);
		}

	};
});