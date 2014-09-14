var ClearAction = DefaultToolbarItem.extend(function($, options, editor) {

	this._super($, options);

	// privates
	$this = $(this);
	
	// public
	return {

		title : ToolbarConfig.CLEAR_ACTION.TITLE,
		icon : ToolbarConfig.CLEAR_ACTION.ICON,
		cls : ToolbarConfig.CLEAR_ACTION.CLS,

		
		activate : function() {

			options.$modal.find('.modal-title').text('Confirmation');
			options.$modal.find('.modal-body p').text('Every elements will be deleted, are you sure?');
			options.$modal.find('.btn-default').text('Cancel');
			options.$modal.find('.btn-primary').text('OK').on('click', function(e) {
				options.paper.clear();
				$this.trigger('svge.clearPaper');
			});
			options.$modal.modal({
				title : 'bla'
			});
		}

	};
});