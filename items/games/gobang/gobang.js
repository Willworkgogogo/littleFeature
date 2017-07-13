/**
* 五子棋
* by Willwang 2017-07-12
*/

window.onload = function() {

	// 棋盘
	var chess = document.getElementById("chessboard");
	var context = chess.getContext("2d");

	context.strokeStyle = "#BFBFBF";

	var logo = new Image();
	logo.src = "./bg.png";
	logo.onload = function() {
		context.drawImage(logo, 120, 140, 210, 110);
		drawChessboard();
	}
	function drawChessboard() {
		for (var i = 0; i < 15; i++) {
			context.moveTo(15 + i*30, 15);
			context.lineTo(15 + i*30, 435);
			context.stroke();
			context.moveTo(15, 15 + i*30);
			context.lineTo(435, 15 + i*30);
			context.stroke();
		}	
	}
}
