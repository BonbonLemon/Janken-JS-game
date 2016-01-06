(function () {
  if (typeof Janken === "undefined") {
    window.Janken = {};
  }

  var Weapon = Janken.Weapon = function (pos) {
    this.pos = pos;
    this.dir = [0, -1];
    this.gesture = this.randomGesture();
    this.isFired = false;
  };

  Weapon.prototype.randomGesture = function () {
    var gestures = [
      'ROCK',
      'PAPER',
      'SCISSORS'
    ];

    var gesture = gestures[Math.floor(Math.random() * gestures.length)];
    return gesture;
  };

  Weapon.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] + 100, this.pos[1]);
    ctx.lineTo(this.pos[0] + 50, this.pos[1] - 100);
    switch (this.gesture) {
      case "ROCK":
        ctx.fillStyle = "#00ffff";
        break;
      case "PAPER":
        ctx.fillStyle = "#33ff33";
        break;
      case "SCISSORS":
        ctx.fillStyle = "#ff3333";
        break;
    }
    ctx.fill();
  };

  Weapon.prototype.move = function () {
    if (this.isFired) {
      this.pos[1] -= 10;
    }
  };

  Weapon.prototype.fire = function () {
    this.isFired = true;
  };
})();
