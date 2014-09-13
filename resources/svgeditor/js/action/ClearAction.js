var ClearAction = DefaultToolbarItem.extend(function($) {
	// privates
	var me = this;
	
	// public
	return {

		title : ToolbarConfig.CLEAR_ACTION.TITLE,
		icon : ToolbarConfig.CLEAR_ACTION.ICON,
		cls : ToolbarConfig.CLEAR_ACTION.CLS,

		// rend l'outil actif
		activate : function() {

			me.$modal.find('.modal-title').text('Confirmation');
			me.$modal.find('.modal-body p').text('Every elements while be deleted, are you sure?');
			me.$modal.find('.btn-default').text('Cancel');
			me.$modal.find('.btn-primary').text('OK').on('click', function(e) {
				me.paper.clear();
			});
			me.$modal.modal({
				title : 'bla'
			});
		}

	};
});