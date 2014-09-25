(function($) {

	/** private varialbes/methods */
	var $this;
	var $settings;

	/** Important : préfixer les objets jQuery par $, sinon c'est le bordel */
	/** Tous les elements graphique dynamiques */
	var $canvas = $(ToolbarConfig.TEMPLATE_CANVAS);
	var $alert = $(ToolbarConfig.TEMPLATE_ALERT);
	var $modal = $(ToolbarConfig.TEMPLATE_MODAL);
	var toolbarTemplate = ToolbarConfig.TEMPLATE_TOOLBAR;
	var toolbarGroupTemplate = ToolbarConfig.TEMPLATE_TOOLBARGROUP;
	var buttonTemplate = ToolbarConfig.TEMPLATE_BUTTON;
	var imgTemplate = ToolbarConfig.TEMPLATE_IMG;

	/** la feuille de papier raphael */
	var paper;

	var stroke = ToolbarConfig.stroke;
	var fill = ToolbarConfig.fill;
	var currentTool;
	var grid = [];
	var selectTool;

	var methods = {
		init : function(options) {
			return this.each(function() {

				$this = $(this);
				me = this;

				$settings = $this.data('svgeditor');
				var defaults = {
					containerId : 'svgeditor',
					onSomeEvent : function() {
					}
				};

				$settings = $.extend(defaults, $settings, options);
				if (typeof ($settings) == 'undefined') {
					$this.data('svgeditor', $settings);
				}

				buildUi($this);
			});
			return this;
		},
		destroy : function(options) {
			return $(this).each(function() {
				$this.removeData($this.settings.containerId);
			});
		}
	};

	var buildUi = function($this) {
		initCanvas($this);
		if ($settings.initGrid)
			initGrid($this);
		initToolbar($this);
	};

	var initCanvas = function($this) {
		$this.append($canvas);

		paper = Raphael($canvas.get(0), $canvas.width(), $canvas.height());
		paper.canvas.style.backgroundColor = ToolbarConfig.grid.fill;
		paper.canvas.style.opacity = ToolbarConfig.grid.opacity;
		// Add freeTransform
		$(window).on('resize', function(e) {
			paper.setSize($canvas.width(), $canvas.height());
		});
	};

	var initGrid = function() {

		// On ne veut pas que les clicks sur les lignes de la grille soient propagés : sinon elle
		// serait selectionnable au meme titre que les autres éléments -> cliquer sur une case ne
		// déclencherait pas la déselection
		for (var x = ($canvas.offset().left % ToolbarConfig.gridCellSize); x < $canvas.width(); x += ToolbarConfig.gridCellSize) {
			var vpath = "M " + x + " 0 l 0 " + $canvas.height() + " z";
			var path = paper.path(vpath);
			path.attr(ToolbarConfig.grid).node.className.baseVal = "svg-grid";
			grid.push(path);
		}
		// horizontal lines
		for (var y = ($canvas.offset().top % ToolbarConfig.gridCellSize); y < $canvas.height(); y += ToolbarConfig.gridCellSize) {
			var hpath = "M 0 " + y + " l " + $canvas.width() + " 0 z";
			var path = paper.path(hpath);
			path.attr(ToolbarConfig.grid).node.className.baseVal = "svg-grid";
			grid.push(path);
		}
	};

	var initToolbar = function($this) {
		var $toolbar = $(toolbarTemplate);

		var options = {
			$canvas : $canvas,
			$alert : $alert,
			$modal : $modal,
			paper : paper,
			stroke : stroke,
			fill : fill,
			grid : grid
		};
		selectTool = new SelectTool($, options);

		var toFrontAction = new ToFrontAction($, options);
		$(toFrontAction).on('svge.toFront', function() {
			selectTool.toFront();
		});
		var toBackAction = new ToBackAction($, options);
		$(toBackAction).on('svge.toBack', selectTool.toBack);
		var clearAction = new ClearAction($, options);
		$(clearAction).on('svge.clearPaper', function() {
			paper.clear();
			initGrid();
		});
		var deleteAction = new DeleteAction($, options);

		var rectangleTool = new RectangleTool($, options);
		$(rectangleTool).on('svge.addElement', onAddElement);

		var lineTool = new LineTool($, options);
		$(lineTool).on('svge.addElement', onAddElement);
		var circleTool = new CircleTool($, options);
		$(circleTool).on('svge.addElement', onAddElement);
		var pathTool = new PathTool($, options);
		$(pathTool).on('svge.addElement', onAddElement);
		var polygonTool = new PolygonTool($, options);
		$(polygonTool).on('svge.addElement', onAddElement);
		var imageTool = new ImageTool($, options);
		$(imageTool).on('svge.addElement', onAddElement);
		var textTool = new TextTool($, options);
		$(textTool).on('svge.addElement', onAddElement);

		$(deleteAction).on('svge.deleteSelection', function() {
			selectTool.deleteSelection();
			if (currentTool == selectTool)
				selectTool.activate();
		});

		addToolbarGroup($toolbar, [ selectTool, toFrontAction, toBackAction, deleteAction, clearAction ]);
		addToolbarGroup($toolbar, [ rectangleTool, lineTool, circleTool, pathTool, polygonTool, imageTool, textTool ]);
		addToolbarGroup($toolbar, [ new ColorAction($, options), new StrokeAction($, options) ]);
		addToolbarGroup($toolbar, [ new ImportAction($, options), new ExportAction($, options), new SaveAction($, options) ]);
		$this.before($toolbar);
	};

	var addToolbarGroup = function($toolbar, tools) {

		var $group = $(toolbarGroupTemplate);
		for (tool in tools) {
			$group.append(buildButton(tools[tool]));
		}
		$toolbar.append($group);
	};

	var buildButton = function(tool) {
		var $button = $(buttonTemplate);

		if (tool.cls) {
			$button.addClass(tool.cls);
		}

		if (tool.title)
			$button.attr({
				title : tool.title
			});

		if (tool.text)
			$button.text(tool.text);

		if (tool.icon) {
			$button.append($(imgTemplate).attr('src', tool.icon).attr('alt', tool.title));
		}

		$button.on('click', function(e) {

			if (tool instanceof Tool) {
				if (currentTool) {
					currentTool.desactivate();
				}
				currentTool = tool;
			}

			tool.activate();
		});

		return $button;
	};

	var onAddElement = function(e, element) {
		if (element) {
			element.mousedown(selectTool.onSelect);
			element.dblclick(selectTool.onDblClick);
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

	};

})(jQuery);