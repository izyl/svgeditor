var SaveAction = DefaultToolbarItem.extend(function($) {
	// privates
	var me = this;
	
	// Return an object exposed to the public
	return {

		title : ToolbarConfig.SAVE_ACTION.TITLE,
		icon : ToolbarConfig.SAVE_ACTION.ICON,

		// rend l'outil actif
		activate : function() {
			// $.ajax

			// puis affichage du résulat
			var _alert = me.$alert.clone();
			_alert.addClass('alert alert-info');
			_alert.find('.contentspan').text(me.paper.toSVG());
			me.$canvas.after(_alert);

			_alert = me.$alert.clone();
			_alert.addClass('alert alert-success notifications');
			_alert.find('.contentspan').text('Your work has been successfully saved');
			me.$canvas.before(_alert);
			_alert.fadeOut(2000);
		}

	};
});