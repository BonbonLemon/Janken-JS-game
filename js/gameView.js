(function () {
  if (typeof Janken === "undefined") {
    window.Janken = {};
  }

  var GameView = Janken.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.selectedId = 1;
    this.timeLeft = 30;
    this.score = 0;
    this.lives = 5;
  };

  GESTURES = {
    "ROCK": 0,
    "PAPER": 1,
    "SCISSORS": 2
  };

  GameView.prototype.bindKeyHandlers = function () {
    document.onkeydown = function (e) {
      if (e.which === 32) {
        this.game.weapons[this.selectedId].fire();
      } else if (e.which === 37) {
        if (this.selectedId > 0) {
          this.clearSelectorArea();
          this.selectedId--;
        }
      } else if (e.which === 39) {
        if (this.selectedId < 2) {
          this.clearSelectorArea();
          this.selectedId++;
        }
      }
    }.bind(this);
  };

  GameView.prototype.drawScore = function () {
    this.ctx.clearRect(650, 200, 150, 100);
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Score: " + this.score, 650, 300);
  };

  GameView.prototype.drawLives = function () {
    this.ctx.clearRect(450, 200, 150, 100);
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Lives: " + this.lives, 450, 300);
  };

  GameView.prototype.drawTime = function () {
    this.ctx.clearRect(250, 200, 150, 100);
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Time: " + this.timeLeft, 250, 300);
  };

  GameView.prototype.clearSelectorArea = function () {
    this.ctx.clearRect(0, 580, 1000, 140);
  };

  GameView.prototype.displaySelected = function () {
    var loc;

    switch (this.selectedId) {
      case 0:
        loc = [90, 590];
        break;
      case 1:
        loc = [440, 590];
        break;
      case 2:
        loc = [790, 590];
        break;
    }

    this.ctx.beginPath();
    this.ctx.rect(loc[0], loc[1], 120, 120);
    this.ctx.strokeStyle = "#000099";
    this.ctx.lineWidth = 10;
    this.ctx.stroke();
    this.ctx.closePath();
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.startTimer();

    this.startIntervalId = setInterval(function () {
      this.displaySelected();
      this.drawScore();
      this.drawTime();
      this.drawLives();

      if (this.timeLeft <= 0 || this.lives <= 0) {
        window.clearInterval(this.startIntervalId);
        document.onkeydown = null;
      }

      this.game.weapons.forEach(function (weapon) {
        if (weapon) {
          this.ctx.clearRect(weapon.pos[0], weapon.pos[1] - 20, 100, 20);
          weapon.move();
          weapon.draw(this.ctx);
        }
      }.bind(this));

      this.game.cards.forEach(function (card) {
        this.ctx.clearRect(card.pos[0], card.pos[1], 100, 100);
        card.move();
        card.draw(this.ctx);
      }.bind(this));

      this.game.weapons.forEach(function (weapon) {
        if (weapon) {
          if (weapon.isFired) {
            this.game.cards.forEach(function (card) {
              if (card.isCollideWith(weapon)) {
                this.handleCollision(weapon, card);
              }
            }.bind(this));
          }
        }
      }.bind(this));
    }.bind(this), 15);
  };

  GameView.prototype.startTimer = function () {
    var timerId = setInterval(function () {
      this.timeLeft--;
    }.bind(this), 1000);
  };

  GameView.prototype.handleCollision = function (weapon, card) {
    cardVal = GESTURES[card.gesture];
    weaponVal = GESTURES[weapon.gesture];
    if (cardVal === weaponVal) {
      this.game.remove(card);
      this.game.remove(weapon);
      this.clearAreas(weapon, card);
      this.isNoCards();
      console.log("tie");
    } else if (((cardVal + 1) % 3) === weaponVal) {
      this.score++;
      this.game.remove(card);
      this.game.remove(weapon);
      this.clearAreas(weapon, card);
      this.isNoCards();
      console.log("win");
    } else {
      this.lives--;
      this.game.remove(weapon);
      this.clearAreas(weapon);
      console.log("lose");
    }

    setTimeout(function () {
      this.game.addWeapon(weapon.startPos, weapon.posId);
    }.bind(this), 500);
  };

  GameView.prototype.isNoCards = function () {
    if (this.game.cards.length === 0) {
      this.timeLeft += 10;
      this.game.addCards();
    }
  };

  GameView.prototype.clearAreas = function (weapon, card) {
    this.ctx.clearRect(weapon.pos[0], weapon.pos[1] - 100, 100, 120);
    if (card) {this.ctx.clearRect(card.pos[0], card.pos[1], 100, 100);}
  };
})();
