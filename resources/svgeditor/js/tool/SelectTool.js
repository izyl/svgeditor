var SelectTool = Tool.extend(function($, context) {
	this._super($, context);

	// privates
	var KEYCODE_ESCAPE = 27;
	var $popover = $('<div></div>');
	$popover.popover({
		'title' : function() {
			return '<h4>' + ToolbarConfig.PROPERTIES_DIALOG.TITLE + '</h4>';
		},
		'html' : true,
		'content' : ToolbarConfig.PROPERTIES_DIALOG.CONTENT
	});

	$('body').append($popover);
	var me = this;
	$(document).keydown(function(e) {
		if (KEYCODE_ESCAPE == e.keyCode) {
			me.clearSelection();
		}
	});

	// Example rectangle de selection : http://jsfiddle.net/ELBVG/2/
	
	/*
	 * var R = Raphael(0,0, 500, 500);



var mat = R.rect(0, 0, R.width, R.height);
mat.attr("stroke", "#000");
mat.attr("fill", "#fff");
mat.attr("opacity", "0");

var circle = R.circle(50, 40, 10);
circle.attr("fill", "#f00");
var rect = R.rect(100, 50, 100,100);
rect.attr("fill", "#f00");


var box;
var selections = R.set();

var start = function(x, y, event) {
    var bnds = event.target.getBoundingClientRect();

    var mx = event.clientX - bnds.left;
    var my = event.clientY - bnds.top;

    var fx = mx / bnds.width * mat.attrs.width;
    var fy = my / bnds.height * mat.attrs.height;

    fx = Number(fx).toPrecision(3);
    fy = Number(fy).toPrecision(3);

    box = R.rect(fx, fy, 0, 0).attr("stroke", "#9999FF");

}, move = function(dx, dy, event) {
    var xoffset = 0, yoffset = 0;
    if (dx < 0) {
        xoffset = dx;
        dx = -1 * dx;
    }
    if (dy < 0) {
        yoffset = dy;
        dy = -1 * dy;
    }
    box.transform("T" + xoffset + "," + yoffset);
    box.attr("width", dx);
    box.attr("height", dy);
}, up = function() {

    var bounds = box.getBBox();

    box.remove();

    reset();

    R.forEach(function(el) {

        var mybounds = el.getBBox();

        if (mybounds.x >= bounds.x && mybounds.x <= bounds.x2
                || mybounds.x2 >= bounds.x && mybounds.x2 <= bounds.x2) {
            if (mybounds.y >= bounds.y && mybounds.y <= bounds.y2
                    || mybounds.y2 >= bounds.y && mybounds.y2 <= bounds.y2) {
                selections.push(el);
            }
        }
    });

    if (selections.length > 0) {
        var sft = R.freeTransform(selections);
        sft.setOpts({
            drag : 'self',
            draw : 'bbox',
            rotate : false,
            scale : false
        }, function(sft, events) {
            if (events.indexOf('drag end') !== -1) {
                sft.apply();

                selections.forEach(function(entry) {
                    //var abc = R.freeTransform(entry);

                    //abc.apply();
                    //abc.updateHandles();

                });

                sft.unplug();

            }

        });

    }

};

function reset() {
    if (typeof sft !== 'undefined') {

        sft.unplug();
    }
    selections = R.set();
}

mat.drag(move, start, up);
mat.click(function(e) {
    reset();
});
	 * */
	
	var selection = context.paper.set();
	var freetransform;

	function isElementSelected(element) {
		var found = false;
		selection.forEach(function(elem) {
			if (elem.id == element.id) {
				found = true;
				return false;
			}
		});

		return found;
	}

	function select(element) {
		if (!isElementSelected(element)) {
			selection.push(element);

			if (freetransform) {
				freetransform.unplug();
			}

			freetransform = context.paper.freeTransform(selection, {
				keepRatio : true,
				draw : [ 'bbox', 'circle' ]
			});
			freetransform.apply();
		}
	}

	// public
	return {

		title : ToolbarConfig.SELECT_TOOL.TITLE,
		icon : ToolbarConfig.SELECT_TOOL.ICON,

		toFront : function() {
			selection.forEach(function(elem) {
				elem.toFront();
			});
		},

		toBack : function() {
			selection.forEach(function(elem) {
				elem.toBack();
			});
		},

		clearSelection : function() {
			if (freetransform) {
				freetransform.unplug();
			}
			selection.clear();
		},

		deleteSelection : function() {
			selection.forEach(function(element) {
				element.remove();
			});
			if (freetransform) {
				freetransform.unplug();
			}
			selection.clear();
		},

		onMouseDown : function(e) {
			var element = context.paper.getElementByPoint(e.pageX, e.pageY);
			if (!element) {
				me.clearSelection();
				$popover.popover('hide');
			}
		},

		onSelect : function(e) {
			if (me.active) {
				select(this);
				e.stopPropagation();
			}
		},

		desactivate : function() {
			me._super();
			me.clearSelection();
		},

		onDblClick : function(e) {

			if (!me.active) {
				return;
			}
			console.log('dbl');
			var element = this;

			$popover.css('position', 'absolute');
			var bbox = this.getBBox();
			$popover.css('left', context.$canvas.offset().left + bbox.x2);
			$popover.css('top', context.$canvas.offset().top + bbox.y2 - (bbox.height / 2));
			$popover.popover('show');

			$('#svg-element-close').on('click', function(e) {
				$popover.popover('hide');
			});

			$('#svg-element-stroke-color').val(element.attr('stroke')).on('change', function(e) {
				selection.attr('stroke', '#' + $(this).val());
			});
			$('#svg-element-stroke-width').on('change', function(e) {
				selection.attr('stroke-width', $(this).val());
			});
			$('#svg-element-stroke-opacity').on('change', function(e) {
				selection.attr('stroke-opacity', $(this).val() + '%');
			});
			$('#svg-element-fill-color').on('change', function(e) {
				selection.attr('fill', '#' + $(this).val());
			});
			$('#svg-element-fill-opacity').on('change', function(e) {
				selection.attr('fill-opacity', $(this).val() + '%');
			});
			$('#svg-element-up').on('click', function(e) {
				selection.toFront();
			});

			$('#svg-element-down').on('click', function(e) {
				selection.toBack();
			});
		}
	};
});
