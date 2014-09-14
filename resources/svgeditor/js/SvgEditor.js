(function($) {

	/** private varialbes/methods */
	var $this;
	var $settings;

	var $canvas = $(ToolbarConfig.TEMPLATE_CANVAS);
	var toolbarTemplate = ToolbarConfig.TEMPLATE_TOOLBAR;
	var toolbarGroupTemplate = ToolbarConfig.TEMPLATE_TOOLBARGROUP;
	var buttonTemplate = ToolbarConfig.TEMPLATE_BUTTON;
	var imgTemplate = ToolbarConfig.TEMPLATE_IMG;
	var $alert = $(ToolbarConfig.TEMPLATE_ALERT);
	var $modal = $(ToolbarConfig.TEMPLATE_MODAL);

	var paper;

	var stroke = ToolbarConfig.stroke;
	var fill = ToolbarConfig.fill;
	var currentTool;

	var selectTool;
	var clearAction;
	var deleteAction;

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
			var path = paper.path(vpath).attr(ToolbarConfig.grid);
			path.mousedown(function(e) {
				e.stopImmediatePropagation();
				if (currentTool)
					currentTool.onMouseDown(e);
				if (selectTool)
					selectTool.clearSelection();
			});
		}
		// horizontal lines
		for (var y = ($canvas.offset().top % ToolbarConfig.gridCellSize); y < $canvas.height(); y += ToolbarConfig.gridCellSize) {
			var hpath = "M 0 " + y + " l " + $canvas.width() + " 0 z";
			var path = paper.path(hpath).attr(ToolbarConfig.grid);
			path.mousedown(function(e) {
				e.stopImmediatePropagation();
				if (currentTool)
					currentTool.onMouseDown(e);
				if (selectTool)
					selectTool.clearSelection();
			});
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
			editor : this
		};
		selectTool = new SelectTool($, options);
		clearAction = new ClearAction($, options);
		deleteAction = new DeleteAction($, options);

		addToolbarGroup($toolbar, [ selectTool, deleteAction, clearAction ]);
		addToolbarGroup($toolbar, [ new RectangleTool($, options), new LineTool($, options), new CircleTool($, options), new PathTool($, options),
				new PolygonTool($, options), new ImageTool($, options), new TextTool($, options) ]);
		addToolbarGroup($toolbar, [ new ColorAction($, options), new StrokeAction($, options) ]);
		addToolbarGroup($toolbar, [ new ImportAction($, options), new ExportAction($, options), new SaveAction($, options) ]);
		$this.before($toolbar);
	};

	var addToolbarGroup = function($toolbar, btns) {

		var $group = $(toolbarGroupTemplate);
		for (btn in btns) {
			$group.append(buildButton(btns[btn]));
		}
		$toolbar.append($group);
	};

	var buildButton = function(btn) {
		var $button = $(buttonTemplate);

		if (btn.cls) {
			$button.addClass(btn.cls);
		}

		if (btn.title)
			$button.attr({
				title : btn.title
			});

		if (btn.text)
			$button.text(btn.text);

		if (btn.icon) {
			$button.append($(imgTemplate).attr('src', btn.icon).attr('alt', btn.title));
		}

		$button.on('click', function(e) {
			if (currentTool) {
				currentTool.desactivate();
			}
			currentTool = btn;
			currentTool.activate();
			selectTool.clearSelection();
		});

		$(btn).on('svge.addElement', onAddElement);
		$(btn).on('svge.clearPaper', initGrid);
		$(btn).on('svge.deleteSelection', function() {
			selectTool.deleteSelection();
			selectTool.activate();
		});

		return $button;
	};

	var onAddElement = function(e, element) {
		if (element) {
			// les elements doivent ils ecouter leurs
			// propres clicks ? ou bien on calcule l'élément lorsqu'on clique sur le canvas
			// element.mousedown(selectTool.onMouseDown);
			element.drag(selectTool.onMove, $.emptyFn, selectTool.onEnd);
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