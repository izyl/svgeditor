var Boot = {
	onReady : function() {

		$("#svgeditor").svgeditor({
			initGrid : true
		});

		var secret = 'klkslashslash';
		var typed = "";
		$(document)
				.keypress(
						function(e) {

							var tmpSecret = typed + String.fromCharCode(e.charCode);
							if (secret.indexOf(tmpSecret) == 0) {
								typed = tmpSecret;
							} else {
								typed = '';
							}

							if (typed.indexOf(secret) == 0) {
								$('body')
										.before(
												'<div id="zumb" ><img src="resources/svgeditor/img/zumbi.svg" alt="bouuuuuuhouuuu"/><h1><strong>bouuuuuuhouuuuhouuuuu!! RUNNNNN !</strong></h1></div>');
								$('#zumb').css('position', 'absolute').css('z-index', '9999').css('left', '10%').css('top', '10%').hide().fadeIn(5000);

							}
						});
	}
};

$(document).ready(Boot.onReady);

// k : 107
// l : 108
// / : 47
