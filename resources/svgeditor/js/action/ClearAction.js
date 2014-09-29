var ClearAction = Action.extend(function($, context) {

	this._super($, context);
	// privates
	var $this;
	
	// public
	return {

		title : ToolbarConfig.CLEAR_ACTION.TITLE,
		icon : ToolbarConfig.CLEAR_ACTION.ICON,
		cls : ToolbarConfig.CLEAR_ACTION.CLS,

		activate : function() {
			this._super();
			$this = $(this);
			
			context.$modal.find('.modal-title').text('Confirmation');
			context.$modal.find('.modal-body p').text('Every elements will be deleted, are you sure?');
			context.$modal.find('.btn-default').text('Cancel');
			context.$modal.find('.btn-primary').text('OK').on('click', function(e) {
				context.paper.clear();
				ToolManager.getTool('gridAction').afterClear();
			});
			context.$modal.modal({
				title : 'brrraaaaa'
			});
		}

	};
});