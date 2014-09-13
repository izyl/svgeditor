var SaveAction = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// Return an object exposed to the public
	return {

		title : ToolbarConfig.SAVE_ACTION.TITLE,
		icon : ToolbarConfig.SAVE_ACTION.ICON,

		
		activate : function() {
			// $.ajax

			// puis affichage du résulat
			var _alert = options.$alert.clone();
			_alert.addClass('alert alert-info');
			_alert.find('.contentspan').text(options.paper.toSVG());
			options.$canvas.after(_alert);

			_alert = options.$alert.clone();
			_alert.addClass('alert alert-success notifications');
			_alert.find('.contentspan').text('Your work has been successfully saved');
			options.$canvas.before(_alert);
			_alert.fadeOut(2000);
		}

	};
});