var ClearAction = DefaultToolbarItem.extend(function($, options) {

	this._super($, options);

	// privates
	var me = this;

	// public
	return {

		title : ToolbarConfig.CLEAR_ACTION.TITLE,
		icon : ToolbarConfig.CLEAR_ACTION.ICON,
		cls : ToolbarConfig.CLEAR_ACTION.CLS,

		// rend l'outil actif
		activate : function() {

			options.$modal.find('.modal-title').text('Confirmation');
			options.$modal.find('.modal-body p').text('Every elements will be deleted, are you sure?');
			options.$modal.find('.btn-default').text('Cancel');
			options.$modal.find('.btn-primary').text('OK').on('click', function(e) {
				options.paper.clear();
			});
			options.$modal.modal({
				title : 'bla'
			});
		}

	};
});