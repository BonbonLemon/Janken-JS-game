/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	// var canvas = document.getElementById("myCanvas");
	// var ctx = canvas.getContext("2d");
	//
	//
	// ctx.beginPath();
	// ctx.rect(20, 40, 50, 50);
	// ctx.fillStyle = "#FF0000";
	// ctx.fill();
	// ctx.closePath();
	//
	// ctx.beginPath();
	// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
	// ctx.fillStyle = "green";
	// ctx.fill();
	// ctx.closePath();
	//
	// ctx.beginPath();
	// ctx.rect(160, 10, 100, 40);
	// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	// ctx.stroke();
	// ctx.closePath();
	
	
	
	
	// var x = canvas.width/2;
	// var y = canvas.height-30;
	// var dx = 2;
	// var dy = -2;
	//
	// function drawBall() {
	//   ctx.beginPath();
	//   ctx.arc(x, y, 10, 0, Math.PI*2);
	//   ctx.fillStyle = "#0095DD";
	//   ctx.fill();
	//   ctx.closePath();
	// }
	//
	// function draw() {
	//   ctx.clearRect(0, 0, canvas.width, canvas.height);
	//   drawBall();
	//   x += dx;
	//   y += dy;
	// }
	
	(function () {
	  window.onkeydown = function (e) {
	    if ((e.keyCode == 32 || e.keyCode == 37 || e.keyCode == 39) && e.target == document.body) {
	      e.preventDefault();
	    }
	  }
	  var canvas = document.getElementById("myCanvas");
	  var ctx = canvas.getContext("2d");
	
	  var game = new Janken.Game();
	  new Janken.GameView(game, ctx).bindTutorial1();
	})();


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map