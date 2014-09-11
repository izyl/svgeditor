(function($) {

	/** private varialbes/methods */
	var canvasTemplate = '<div class="panel panel-default canvas"></div>';
	var toolbarTemplate = '<div class="btn-toolbar" role="toolbar"></div>';
	var toolbarGroupTemplate = '<div class="btn-group"></div>)';
	var toolbarButtonTemplate = '<a class="btn btn-default"  data-toggle="tooltip" data-placement="left" data-toggle="confirmation" type="button" ></a>';
	// j'utilise des img car les icones graphiques que je veux ne sont pas dans les Glyphicons de bootstrap : http://getbootstrap.com/components/#glyphicons
	var imgTemplate = '<img class="media-object">';
	var modalTemplate = '<div class="modal fade">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header waning">'
			+ '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
			+ '<h4 class="modal-title">Modal title</h4>' + '</div>' + '<div class="modal-body">' + '<p>One fine body&hellip;</p>' + '</div>'
			+ '<div class="modal-footer">' + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
			+ '<button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>' + '</div>' + '</div>' + '</div>' + '</div>';
	var alert = $('<div class="alert alert-info"> <a class="close" href="#" data-dismiss="alert">&times;</a> <span class="contentspan"></span></div>');
	var modal = $(modalTemplate);

	var paper;
	var canvas;

	var stroke = {
		width : 1,
		opacity : .50,
		color : '#000'
	};
	var fill = {
		color : '#ccc',
		opacity : .90
	};
	var glow = {
		width : 10,
		fill : false,
		opacity : 0.5,
		offsetx : 0,
		offsety : 0,
		color : '#000'
	};
	var selectedTool;
	
	// editor = new VectorEditor($("#canvas").get(0), $("#canvas").width(), $("#canvas").height());
	var buildButton = function(btn) {
		var $button = $(toolbarButtonTemplate);

		if (btn.cls) {
			$button.addClass(btn.cls);
		}

		if (btn.id) {
			$button.attr('id', btn.id);
		}

		$button.attr({
			title : btn.title
		});
		$button.text(btn.text);

		if (btn.icon) {
			$button.append($(imgTemplate).attr('src', btn.icon).attr('alt', btn.title));
		}

		if (btn.tool) {

			btn.tool.init({
				editor : this,
				canvas : canvas,
				paper : paper,
				modal : modal,
				stroke : stroke,
				fill : fill,
				alert : alert
			});

			$button.on('click', function(e) {
				if (selectedTool) {
					selectedTool.desactivate();
				}
				selectedTool = btn.tool;
				selectedTool.activate();
			});
		}

		return $button;
	}

	var buildToolbarGroup = function(buttons, cssClass) {

		var $toolbar = $(toolbarGroupTemplate);

		if (cssClass) {
			$toolbar.addClass(cssClass);
		}

		for (button in buttons) {
			$toolbar.append(buildButton(buttons[button]));
		}

		return $toolbar;
	}

	var buildUi = function($this) {
		initCanvas($this);
		initToolbar($this);
	}

	var initCanvas = function($this) {
		canvas = $(canvasTemplate);
		$this.append(canvas);
		paper = Raphael(canvas.get(0), canvas.width(), canvas.height());
		$(window).on('resize', function(e) {
			paper.setSize(canvas.width(), canvas.height())
		});
	}

	var initToolbar = function($this) {

		var toolbarBtnGroups = [];

		var btns = [ {
			title : 'Select an element',
			icon : 'resources/svgeditor/img/select.gif',
			tool : new SelectTool()
		}, {
			title : 'Group select',
			icon : 'resources/svgeditor/img/selectadd.gif',
			tool : GroupTool
		}, {
			title : 'Delete a selection',
			icon : 'resources/svgeditor/img/delete.gif',
			tool : DeleteAction
		}, {
			title : 'Clear scene',
			icon : 'resources/svgeditor/img/arrow_rotate_clockwise.png',
			tool : ClearAction,
			cls : 'clearTool',
			id : 'clearTool'
		} ];

		toolbarBtnGroups.push(buildToolbarGroup(btns));

		btns = [ {
			title : 'Draw a rectangle',
			icon : 'resources/svgeditor/img/rectangle.gif',
			tool : new RectangleTool()
		}, {
			title : 'Draw a line',
			icon : 'resources/svgeditor/img/line.gif',
			tool : LineTool
		}, {
			title : 'Draw a circle',
			icon : 'resources/svgeditor/img/circle.gif',
			tool : new CircleTool()
		}, {
			title : 'Draw a path',
			icon : 'resources/svgeditor/img/path.gif',
			tool : new PathTool()
		}, {
			title : 'Draw a polygon',
			icon : 'resources/svgeditor/img/polygon.gif',
			tool : new PolygonTool()
		}, {
			title : 'Insert an image',
			icon : 'resources/svgeditor/img/image.gif',
			tool : ImageTool
		}, {
			title : 'Write some text',
			icon : 'resources/svgeditor/img/text.gif',
			tool : TextTool
		} ];

		toolbarBtnGroups.push(buildToolbarGroup(btns));

		btns = [ {
			title : 'Choose a background color',
			// icon : 'resources/svgeditor/img/color.gif',
			text : 'Color'
		}, {
			title : 'Customize your stroke',
			// icon : 'resources/svgeditor/img/stroke.gif',
			text : 'Stroke'
		} ];

		toolbarBtnGroups.push(buildToolbarGroup(btns));

		btns = [ {
			title : 'Import a file',
			icon : 'resources/svgeditor/img/folder_go.png',
			tool : ImportAction
		}, {
			title : 'Export a file',
			icon : 'resources/svgeditor/img/script_code.png',
			tool : ExportAction
		}, {
			title : 'Save your work',
			icon : 'resources/svgeditor/img/disk.png',
			tool : SaveAction
		} ];

		toolbarBtnGroups.push(buildToolbarGroup(btns));
		var $toolbar = $(toolbarTemplate);
		for (toolbarBtnGroup in toolbarBtnGroups) {
			$toolbar.append(toolbarBtnGroups[toolbarBtnGroup]);
		}

		$this.before($toolbar);
	};

	var methods = {
			
		init : function(options) {
			return this.each(function() {
				var $this = $(this);
				var settings = $this.data('svgeditor');

				if (typeof (settings) == 'undefined') {

					var defaults = {
						propertyName : 'value',
						onSomeEvent : function() {
						}
					}

					settings = $.extend({}, defaults, options);

					$this.data('svgeditor', settings);
				} else {
					settings = $.extend({}, settings, options);
				}

				buildUi($this);
			});
			return this;
		},
		destroy : function(options) {
			return $(this).each(function() {
				var $this = $(this);

				$this.removeData('svgeditor');
			});
		}
	};

	/**
	 * Ajoute le plugin à jQuery
	 * 
	 * @param {Object}
	 *            Les paramètres passé lors de l'appel du plugin
	 */
	$.fn.svgeditor = function() {
		var method = arguments[0];

		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if (typeof (method) == 'object' || !method) {
			method = methods.init;
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.svgeditor');
			return this;
		}

		return method.apply(this, arguments);

	}

})(jQuery);