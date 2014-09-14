var SaveAction = Action.extend(function($, context) {

	this._super($, context);

	// Return an object exposed to the public
	return {

		title : ToolbarConfig.SAVE_ACTION.TITLE,
		icon : ToolbarConfig.SAVE_ACTION.ICON,

		
		activate : function() {
			// $.ajax

			// puis affichage du résulat
			var _alert = context.$alert.clone();
			_alert.addClass('alert alert-info');
			_alert.find('.contentspan').text(context.paper.toSVG());
			context.$canvas.after(_alert);

			_alert = context.$alert.clone();
			_alert.addClass('alert alert-success notifications');
			_alert.find('.contentspan').text('Your work has been successfully saved');
			context.$canvas.before(_alert);
			_alert.fadeOut(2000);
		}

	};
});