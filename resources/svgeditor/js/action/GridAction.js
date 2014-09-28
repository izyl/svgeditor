var GridAction = Action.extend(function($, context) {

	this._super($, context);

	// privates
	var me = this;
	var grid = [];
	showGrid();

	function showGrid() {
		grid = [];
		// On ne veut pas que les clicks sur les lignes de la grille soient propagés : sinon
		// elle
		// serait selectionnable au meme titre que les autres éléments -> cliquer sur une case
		// ne
		// déclencherait pas la déselection
		for (var x = (context.$canvas.offset().left % ToolbarConfig.gridCellSize); x < context.$canvas.width(); x += ToolbarConfig.gridCellSize) {
			var vpath = "M " + x + " 0 l 0 " + context.$canvas.height() + " z";
			var path = context.paper.path(vpath);
			path.attr(ToolbarConfig.grid);
			path.attr(ToolbarConfig.grid);
			path.node.className.baseVal += " svg-grid";
			path.data('grid', true);
			grid.push(path);
		}
		// horizontal lines
		for (var y = (context.$canvas.offset().top % ToolbarConfig.gridCellSize); y < context.$canvas.height(); y += ToolbarConfig.gridCellSize) {
			var hpath = "M 0 " + y + " l " + context.$canvas.width() + " 0 z";
			var path = context.paper.path(hpath);
			path.attr(ToolbarConfig.grid);
			path.node.className.baseVal += " svg-grid";
			path.data('grid', true);
			grid.push(path);
		}
	}

	function hideGrid() {
		for (line in grid) {
			grid[line].remove();
		}
		grid.length = 0;
	}

	// public
	return {

		title : ToolbarConfig.GRID_ACTION.TITLE,
		icon : ToolbarConfig.GRID_ACTION.ICON,

		getGrid : function(){
			return grid;
		},
		
		activate : function() {
			this._super();
			if (grid.length) {
				hideGrid();
			} else {
				showGrid();
			}
		},

		afterClear : function() {
			if (grid.length) {
				showGrid();
			}
		}
	};
});