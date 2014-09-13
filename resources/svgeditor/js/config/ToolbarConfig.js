ToolbarConfig = {

	stroke : {
		width : 1,
		opacity : .50,
		color : '#000'
	},
	fill : {
		color : '#ccc',
		opacity : .90
	},

	/**
	 * on fait la présentation avec Bootstrap ui : on va la centraliser ici pour faire abstraction de la couche de présentation il faudrait écrire dans un objet
	 * de config toutes les classes bootstrap utilisées dans les toolbaritems et dépacler le contenu bootsrap qui se trouve ici avec
	 */
	TEMPLATE_CANVAS : '<div class="panel panel-default canvas"></div>',
	TEMPLATE_TOOLBAR : '<div class:"btn-toolbar" role:"toolbar"></div>',
	TEMPLATE_TOOLBARGROUP : '<div class="btn-group"></div>',
	TEMPLATE_BUTTON : '<a class="btn btn-default" data-toggle="tooltip" data-placement="left" data-toggle="confirmation" type="button" ></a>',
	// j'utilise des img car les icones graphiques que je veux ne sont pas dans les Glyphicons de bootstrap : http://getbootstrap.com/components/#glyphicons
	TEMPLATE_IMG : '<img class="media-object">',
	TEMPLATE_MODAL : '<div class:"modal fade">' + '<div class:"modal-dialog">' + '<div class:"modal-content">' + '<div class:"modal-header waning">'
			+ '<button type:"button" class:"close" data-dismiss:"modal"><span aria-hidden:"true">&times,</span><span class:"sr-only">Close</span></button>'
			+ '<h4 class:"modal-title">Modal title</h4>' + '</div>' + '<div class:"modal-body">' + '<p>One fine body&hellip,</p>' + '</div>'
			+ '<div class:"modal-footer">' + '<button type:"button" class:"btn btn-default" data-dismiss:"modal">Close</button>'
			+ '<button type:"button" class:"btn btn-primary" data-dismiss:"modal">Save changes</button>' + '</div>' + '</div>' + '</div>' + '</div>',
	TEMPLATE_ALERT : '<div class:"alert alert-info"> <a class:"close" href:"#" data-dismiss:"alert">&times,</a> <span class:"contentspan"></span></div>',

	/** TOOLS héritent de DefaultToolbarItem, ils manipulent le canvas, 1 seul outil actif à la fois */
	SELECT_TOOL : {
		TITLE : "Select an element",
		ICON : "resources/svgeditor/img/select.gif"
	},

	GROUP_TOOL : {
		TITLE : "Group select",
		ICON : "resources/svgeditor/img/selectadd.gif",
	},

	DELETE_TOOL : {
		TITLE : "Delete a selection",
		ICON : "resources/svgeditor/img/delete.gif",
	},

	RECTANGLE_TOOL : {
		TITLE : "Draw a rectangle",
		ICON : "resources/svgeditor/img/rectangle.gif",
	},

	LINE_TOOL : {
		TITLE : "Draw a line",
		ICON : "resources/svgeditor/img/line.gif",
	},

	CIRCLE_TOOL : {
		TITLE : "Draw a circle",
		ICON : "resources/svgeditor/img/circle.gif",
	},

	PATH_TOOL : {
		TITLE : "Draw a path",
		ICON : "resources/svgeditor/img/path.gif",
	},

	POLYGON_TOOL : {
		TITLE : "Draw a polygon",
		ICON : "resources/svgeditor/img/polygon.gif",
	},

	IMAGE_TOOL : {
		TITLE : "Insert an image",
		ICON : "resources/svgeditor/img/image.gif",
	},

	TEXT_TOOL : {
		TITLE : "Write some text",
		ICON : "resources/svgeditor/img/TEXT.gif",
	},

	/** Les actions s'executent indépendamment du paper raphael et peuvent être appliquées même si un outil est en cours d'utilisation */
	CLEAR_ACTION : {
		TITLE : "Clear scene",
		ICON : "resources/svgeditor/img/arrow_rotate_clockwise.png",
		CLS : "clearTool"
	},

	COLOR_ACTION : {
		TITLE : "Choose a background color",
		// ICON : "resources/svgeditor/img/color.gif",
		TEXT : "Color"
	},

	STROKE_ACTION : {
		TITLE : "Customize your stroke",
		// ICON : "resources/svgeditor/img/stroke.gif",
		TEXT : "Stroke"
	},

	IMPORT_ACTION : {
		TITLE : "Import a file",
		ICON : "resources/svgeditor/img/folder_go.png",
	},

	EXPORT_ACTION : {
		TITLE : 'Export a file',
		ICON : 'resources/svgeditor/img/script_code.png',
	},

	SAVE_ACTION : {
		TITLE : 'Save your work',
		ICON : 'resources/svgeditor/img/disk.png',
	}

};