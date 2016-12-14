(function () {
  if (typeof window.Janken === "undefined" ) {
    window.Janken = {};
  }

  var Card = Janken.Card = function (game) {
    this.pos = [100, 50];
    this.dir = [0, 1];
    this.gesture = this.randomGesture();
    this.game = game;
  }

  Card.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 100, 100);
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
    ctx.drawImage(imageObj, this.pos[0] + 23, this.pos[1] + 15);
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 100, 100);
    ctx.stroke();
    ctx.closePath();
  };

  Card.prototype.move = function () {
    switch (this.pos.toString()) {
      case "100,50":
        this.dir = [0, 1];
        break;
      case "100,350":
        this.dir = [1, 0];
        break;
      case "800,350":
        this.dir = [0, -1];
        break;
      case "800,50":
        this.dir = [-1, 0];
        break;
    }
    this.pos[0] += this.dir[0] * 5;
    this.pos[1] += this.dir[1] * 5;
  };

  Card.prototype.randomGesture = function () {
    var gestures = [
      'ROCK',
      'PAPER',
      'SCISSORS'
    ];

    var gesture = gestures[Math.floor(Math.random() * gestures.length)];
    return gesture;
  };

  Card.prototype.isCollideWith = function (weapon) {
    var cardLeftEdge = [this.pos[0], this.pos[1] + 100];
    var cardRightEdge = [this.pos[0] + 100, this.pos[1] + 100];

    var weaponLeftEdge = weapon.pos;
    var weaponRightEdge = [weapon.pos[0] + 100, weapon.pos[1]];
    var weaponTopEdge = [weapon.pos[0] + 50, weapon.pos[1] - 100];

    return (isLeftCollide(cardLeftEdge, weaponTopEdge, weaponRightEdge) ||
            isRightCollide(cardRightEdge, weaponTopEdge, weaponLeftEdge) ||
            isFrontCollide(cardLeftEdge, cardRightEdge, weaponTopEdge));
  };

  var isLeftCollide = function (cardLeftEdge, weaponTopEdge, weaponRightEdge) {
    if (cardLeftEdge[0] >= weaponTopEdge[0] && cardLeftEdge[0] <= weaponRightEdge[0] &&
        cardLeftEdge[1] >= weaponTopEdge[1] && cardLeftEdge[1] <= weaponRightEdge[1]) {
      return (((cardLeftEdge[1] - weaponTopEdge[1]) * 1.0 / (cardLeftEdge[0] - weaponTopEdge[0])) >= 2);
    } else {
      return false;
    }
  };

  var isRightCollide = function (cardRightEdge, weaponTopEdge, weaponLeftEdge) {
    if (cardRightEdge[0] >= weaponLeftEdge[0] && cardRightEdge[0] <= weaponTopEdge[0] &&
        cardRightEdge[1] >= weaponTopEdge[1] && cardRightEdge[1] <= weaponLeftEdge[1]) {
      return (((cardRightEdge[1] - weaponTopEdge[1]) * 1.0 / (weaponTopEdge[0] - cardRightEdge[0])) >= 2)
    } else {
      return false;
    }
  };

  var isFrontCollide = function (cardLeftEdge, cardRightEdge, weaponTopEdge) {
    return (weaponTopEdge[0] >= cardLeftEdge[0] && weaponTopEdge[0] <= cardRightEdge[0] &&
            weaponTopEdge[1] <= cardLeftEdge[1] && weaponTopEdge[1] >= cardLeftEdge[1] - 100);
  };
})();
