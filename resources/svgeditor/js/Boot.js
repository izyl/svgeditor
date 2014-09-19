var Boot = {
	onReady : function() {

		$("#svgeditor").svgeditor({
			initGrid : true
		});

		var secret = 'klkslashslash';
		var typed = "";
		$("body").keypress(function(e) {

			var tmpSecret = typed + String.fromCharCode(e.charCode);
			if (secret.indexOf(tmpSecret) == 0) {
				typed = tmpSecret;
			} else {
				typed = '';
			}

			if (typed.indexOf(secret) == 0) {
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
