(function($) {

	var $this;

	/** private varialbes/methods */
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
	// var glow = {
	// width : 10,
	// fill : false,
	// opacity : 0.5,
	// offsetx : 0,
	// offsety : 0,
	// color : '#000'
	// };
	var selectedTool;

	var methods = {
		init : function(options) {
			return this.each(function() {
				$this = $(this);
				var settings = $this.data('svgeditor');

				if (typeof (settings) == 'undefined') {

					var defaults = {
						propertyName : 'value',
						onSomeEvent : function() {
						}
					};

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

	var buildUi = function($this) {
		initCanvas($this);
		initToolbar($this);
	};

	var initCanvas = function($this) {
		$this.append($canvas);
		paper = Raphael($canvas.get(0), $canvas.width(), $canvas.height());
		$(window).on('resize', function(e) {
			paper.setSize($canvas.width(), $canvas.height());
		});
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
		};
		addToolbarGroup($toolbar, [ new SelectTool($, options), new GroupTool($, options), new DeleteAction($, options), new ClearAction($, options) ]);
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
			if (selectedTool) {
				selectedTool.desactivate();
			}
			selectedTool = btn;
			selectedTool.activate();
		});

		return $button;
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