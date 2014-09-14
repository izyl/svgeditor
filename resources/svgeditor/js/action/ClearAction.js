var ClearAction = Action.extend(function($, context) {

	this._super($, context);
	// privates
	$this = $(this);
	// public
	return {

		title : ToolbarConfig.CLEAR_ACTION.TITLE,
		icon : ToolbarConfig.CLEAR_ACTION.ICON,
		cls : ToolbarConfig.CLEAR_ACTION.CLS,
		
		activate : function() {
			
			context.$modal.find('.modal-title').text('Confirmation');
			context.$modal.find('.modal-body p').text('Every elements will be deleted, are you sure?');
			context.$modal.find('.btn-default').text('Cancel');
			context.$modal.find('.btn-primary').text('OK').on('click', function(e) {
				context.paper.clear();
				$this.trigger('svge.clearPaper');
			});
			context.$modal.modal({
				title : 'bla'
			});
		}

	};
});