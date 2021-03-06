(function () {
  if (typeof Janken === "undefined") {
    window.Janken = {};
  }

  var Weapon = Janken.Weapon = function (pos, game, posId) {
    this.startPos = pos.slice(0);
    this.pos = pos;
    this.dir = [0, -1];
    this.gesture = this.randomGesture();
    this.isFired = false;
    this.game = game;
    this.posId = posId;
    this.collision = true;
    this.bounceDir = [0, 0];
    this.fireSound = new Audio("./assets/sounds/pewpew.wav");
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
    var imageObj = new Image();
    switch (this.gesture) {
      case "ROCK":
        ctx.fillStyle = "#00ffff";
        imageObj.src = './assets/images/rock.png';
        break;
      case "PAPER":
        ctx.fillStyle = "#33ff33";
        imageObj.src = './assets/images/paper.png';
        break;
      case "SCISSORS":
        ctx.fillStyle = "#ff3333";
        imageObj.src = './assets/images/scissors.png';
        break;
    }
    ctx.fill();
    ctx.drawImage(imageObj, this.pos[0] + 25, this.pos[1] - 75);
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] + 100, this.pos[1]);
    ctx.lineTo(this.pos[0] + 50, this.pos[1] - 100);
    ctx.lineTo(this.pos[0], this.pos[1]);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  };

  Weapon.prototype.move = function () {
    if (this.pos[1] < -200) {
      this.game.remove(this);
      this.game.addWeapon(this.startPos, this.posId);
    }

    if (this.isFired) {
      this.pos[0] += this.dir[0] * 15;
      this.pos[1] += this.dir[1] * 15;
    }
  };

  Weapon.prototype.fire = function () {
    if (this.collision && !this.isFired) {
      if (!isMuted) {
        this.fireSound.play();
      }
      this.isFired = true;
    }
  };
})();
