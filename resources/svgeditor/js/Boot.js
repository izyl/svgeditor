var Boot = {
	onReady : function() {

		$("#svgeditor").svgeditor({
			initGrid : true
		});

		var secret = '';
		$("body").keypress(function(e) {

			var tmpSecret = secret + String.fromCharCode(e.keyCode);

			if ("klk//".indexOf(tmpSecret) == 0) {
				secret = tmpSecret;
			} else {
				secret = '';
			}

			if (secret.indexOf("klk//") == 0) {
				$('body').before('<img id="zumb" src="resources/svgeditor/img/zumbi.svg" alt="bouuuuuuhouuuu"/>');
				$('#zumb').hide().fadeIn(5000).after('<h1><strong>bouuuuuuhouuuu</strong></h1>');

			}
		});
	}
};

$(document).ready(Boot.onReady);

// k : 107
// l : 108
// / : 47
