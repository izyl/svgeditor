var SaveAction = Action.extend(function($, context) {

	this._super($, context);

	// Return an object exposed to the public
	return {

		title : ToolbarConfig.SAVE_ACTION.TITLE,
		icon : ToolbarConfig.SAVE_ACTION.ICON,

		activate : function() {
			this._super();
			// $.ajax

			// puis affichage du résulat
			var _alert = context.$alert.clone();
			_alert.addClass('alert alert-info');

			var svg = context.paper.toSVG(context.grid);
			$($.parseXML(svg)).find(".svg-grid").each(function(line) {
				line.remove();
			});
			_alert.find('.contentspan').text(svg);
			context.$canvas.after(_alert);

			_alert = context.$alert.clone();
			_alert.addClass('alert alert-success notifications');
			_alert.find('.contentspan').text('Your work has been successfully saved');
			context.$canvas.before(_alert);
			_alert.fadeOut(2000);
		}

	};
});