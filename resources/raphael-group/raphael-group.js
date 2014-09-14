Raphael.fn.group = function(canvas, items) {

	var r = this;

	function Group(canvas, items) {
		var set = r.set(items);
		var group = r.raphael.vml ? document.createElement("group") : document.createElementNS("http://www.w3.org/2000/svg", "g");
		canvas.append(group);
	}
	return Group(canvas, items);
};