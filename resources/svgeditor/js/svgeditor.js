(function($) {

	var $this;

	/** private varialbes/methods */
	var canvasTemplate = '<div class="panel panel-default canvas"></div>';
	var toolbarTemplate = '<div class="btn-toolbar" role="toolbar"></div>';
	var toolbarGroupTemplate = '<div class="btn-group"></div>)';
	var buttonTemplate = '<a class="btn btn-default"  data-toggle="tooltip" data-placement="left" data-toggle="confirmation" type="button" ></a>';
	// j'utilise des img car les icones graphiques que je veux ne sont pas dans les Glyphicons de bootstrap : http://getbootstrap.com/components/#glyphicons
	var imgTemplate = '<img class="media-object">';
	var modalTemplate = '<div class="modal fade">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header waning">'
			+ '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
			+ '<h4 class="modal-title">Modal title</h4>' + '</div>' + '<div class="modal-body">' + '<p>One fine body&hellip;</p>' + '</div>'
			+ '<div class="modal-footer">' + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
			+ '<button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>' + '</div>' + '</div>' + '</div>' + '</div>';
	var $alert = $('<div class="alert alert-info"> <a class="close" href="#" data-dismiss="alert">&times;</a> <span class="contentspan"></span></div>');
	var $modal = $(modalTemplate);
	var $canvas = $(canvasTemplate);

	var paper;

	var stroke = {
		width : 1,
		opacity : .50,
		color : '#000'
	};
	var fill = {
		color : '#ccc',
		opacity : .90
	};
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
		addToolbarGroup($toolbar, [ new SelectTool(), new GroupTool(), new DeleteAction(), new ClearAction() ]);
		addToolbarGroup($toolbar, [ new RectangleTool(), new LineTool(), new CircleTool(), new PathTool(), new PolygonTool(), new ImageTool(), new TextTool() ]);
		addToolbarGroup($toolbar, [ new ColorAction(), new StrokeAction() ]);
		addToolbarGroup($toolbar, [ new ImportAction(), new ExportAction(), new SaveAction() ]);
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
		
		btn.init({
			$canvas : $canvas,
			$alert : $alert,
			$modal : $modal,
			paper : paper,
			stroke : stroke,
			fill : fill,
		});

		if (btn.cls) {
			$button.addClass(btn.cls);
		}

		if (btn.title)
			$button.attr({
				title : btn.title
			});

		if (btn.text)
			$button.text(btn.text);

		if (btn.icon)
			$button.append($(imgTemplate).attr('src', btn.icon).attr('alt', btn.title));

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