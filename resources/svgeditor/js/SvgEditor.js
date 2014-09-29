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

	// prevent firefox default drag behaviour
	$(document).on('dragstart', function(e) {
		e.preventDefault();
	});

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

	var initToolbar = function($this) {
		var $toolbar = $(toolbarTemplate);

		var context = {
			$canvas : $canvas,
			$alert : $alert,
			$modal : $modal,
			paper : paper,
			stroke : stroke,
			fill : fill
		};
		ToolManager.init($, context);
		var toolbar = $settings.toolbar;

		for (var i = 0; i < toolbar.length; i++) {
			var group = toolbar[i];
			addToolbarGroup($toolbar, group);
		}

		$this.before($toolbar);
	};

	var addToolbarGroup = function($toolbar, tools) {
		var $group = $(toolbarGroupTemplate);
		for (tool in tools) {
			$group.append(buildButton(ToolManager.getTool(tools[tool])));
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