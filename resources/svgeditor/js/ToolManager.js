// Singleton for tool management
var ToolManager = (function($, context) {

	var toolMap;

	// Public
	return {

		// TODO : faire un chargement lazy
		init : function($, context) {
			toolMap = {};

			toolMap['colorAction'] = new ColorAction($, context);
			toolMap['exportAction'] = new ExportAction($, context);
			toolMap['clearAction'] = new ClearAction($, context);
			toolMap['deleteAction'] = new DeleteAction($, context);
			toolMap['gridAction'] = new GridAction($, context);
			toolMap['importAction'] = new ImportAction($, context);
			toolMap['saveAction'] = new SaveAction($, context);
			toolMap['strokeAction'] = new StrokeAction($, context);
			toolMap['toBackAction'] = new ToBackAction($, context);
			toolMap['toFrontAction'] = new ToFrontAction($, context);

			toolMap['circleTool'] = new CircleTool($, context);
			toolMap['imageTool'] = new ImageTool($, context);
			toolMap['lineTool'] = new LineTool($, context);
			toolMap['pathTool'] = new PathTool($, context);
			toolMap['polygonTool'] = new PolygonTool($, context);
			toolMap['rectangleTool'] = new RectangleTool($, context);
			toolMap['selectTool'] = new SelectTool($, context);
			toolMap['textTool'] = new TextTool($, context);
		},

		getTool : function(name) {
			if (!name in toolMap) {
				if (console) {
					console.log('Tool or action ' + name + ' is not registered in ToolManager');
				}
				return null;
			}

			return toolMap[name];
		}
	};

})();