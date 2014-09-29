// As an example we will apply svgeditor on the html element with id : svgeditor
// We will create the editor with all tools and actions.
// Each array of tools/actions is a toolbar group.
var Boot = {
	onReady : function() {
	
		$("#svgeditor").svgeditor(
				{
					toolbar : [ [ 'selectTool', 'toFrontAction', 'toBackAction', 'deleteAction', 'clearAction' ],
							[ 'rectangleTool', 'lineTool', 'circleTool', 'pathTool', 'polygonTool', 'imageTool', 'textTool' ],
							[ 'gridAction', 'colorAction', 'strokeAction' ], [ 'importAction', 'exportAction', 'saveAction' ] ],
							
					importImage : function(){
						// add your method here, 
					}
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
												'<div id="zumb" ><img src="resources/svgeditor/img/svg.svg" alt="bouuuuuuhouuuu"/><h1><strong>bouuuuuuhouuuuhouuuuu!! RUNNNNN !</strong></h1></div>');
								$('#zumb').css('position', 'absolute').css('z-index', '9999').css('left', '10%').css('top', '10%').hide().fadeIn(5000);

							}
						});
	}
};

$(document).ready(Boot.onReady);