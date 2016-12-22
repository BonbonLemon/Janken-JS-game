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

    this.winSound = new Audio("./assets/sounds/correct.wav");
    this.winSound.volume = 0.7;
    this.tieSound = new Audio("./assets/sounds/tie.wav");
    this.loseSound = new Audio("./assets/sounds/lose.wav");
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

  GameView.prototype.showMainMenu = function () {
    // var $menu = $('<div>');
    // $menu.attr('id', 'menu');
    // var $title = $('<h2>');
    // $title.html('Janken (Ro Sham Bo)');
    // $title.attr('id', 'title');
    // $menu.append($title);
    //
    // $('body').append($menu);
    debugger;
  };

  GameView.prototype.bindTutorial1 = function () {
    document.onkeydown = function (e) {
      if (e.which === 32) {
        document.onkeydown = null;
        var h2 = document.getElementsByTagName('h2')[0];
        h2.remove();
        var tutorialImage1 = new Image();
        tutorialImage1.src = './assets/images/tutorial1.png';
        tutorialImage1.onload = function () {
          this.ctx.drawImage(tutorialImage1, 0 , 0);
        }.bind(this);
        this.bindTutorial2();
      }
    }.bind(this);
  };

  GameView.prototype.bindTutorial2 = function () {
    document.onkeydown = function (e) {
      if (e.which === 32) {
        document.onkeydown = null;
        var tutorialImage1 = new Image();
        tutorialImage1.src = './assets/images/tutorial2.png';
        tutorialImage1.onload = function () {
          this.ctx.drawImage(tutorialImage1, 0 , 0);
        }.bind(this);
        this.bindTutorial3();
      }
    }.bind(this);
  };

  GameView.prototype.bindTutorial3 = function () {
    document.onkeydown = function (e) {
      if (e.which === 32) {
        document.onkeydown = null;
        var tutorialImage1 = new Image();
        tutorialImage1.src = './assets/images/tutorial3.png';
        tutorialImage1.onload = function () {
          this.ctx.drawImage(tutorialImage1, 0 , 0);
        }.bind(this);
        this.bindTutorial4();
      }
    }.bind(this);
  };

  GameView.prototype.bindTutorial4 = function () {
    document.onkeydown = function (e) {
      if (e.which === 32) {
        document.onkeydown = null;
        var tutorialImage1 = new Image();
        tutorialImage1.src = './assets/images/tutorial4.png';
        tutorialImage1.onload = function () {
          this.ctx.drawImage(tutorialImage1, 0 , 0);
        }.bind(this);
        this.bindRestart();
      }
    }.bind(this);
  };

  GameView.prototype.bindRestart = function () {
    document.onkeydown = function (e) {
      if (e.which === 32) {
        document.onkeydown = null;
        try {
          var game_over = document.getElementById('game-over');
          game_over.remove();
        } catch (err) {}
        this.game = new Janken.Game();
        this.start();
      }
    }.bind(this);
  };

  GameView.prototype.drawScore = function () {
    this.ctx.clearRect(650, 150, 150, 100);
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText("Score: " + this.score, 640, 250);

    this.ctx.beginPath();
    this.ctx.rect(630, 205, 130, 70);
    this.ctx.strokeStyle = "#660066";
    this.ctx.lineWidth = 6;
    this.ctx.stroke();
    this.ctx.closePath();
  };

  GameView.prototype.drawLives = function () {
    this.ctx.clearRect(450, 150, 150, 100);
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(this.lives, 510, 250);

    this.ctx.beginPath();
    this.ctx.moveTo(450, 265);
    this.ctx.lineTo(450 + 50, 265);
    this.ctx.lineTo(450 + 25, 265 - 50);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.rect(440, 205, 100, 70);
    this.ctx.strokeStyle = "#660066";
    this.ctx.lineWidth = 6;
    this.ctx.stroke();
    this.ctx.closePath();
  };

  GameView.prototype.drawTime = function () {
    this.ctx.clearRect(250, 150, 150, 100);
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(this.timeLeft, 300, 250);

    var imageObj = new Image();
    imageObj.src = './assets/images/timer.png';
    this.ctx.drawImage(imageObj, 250, 215);

    this.ctx.beginPath();
    this.ctx.rect(240, 205, 100, 70);
    this.ctx.strokeStyle = "#660066";
    this.ctx.lineWidth = 6;
    this.ctx.stroke();
    this.ctx.closePath();
  };

  GameView.prototype.drawBoard = function () {
    this.ctx.beginPath();
    this.ctx.rect(85, 35, 830, 430);
    this.ctx.strokeStyle = "#da499c";
    this.ctx.lineWidth = 6;
    this.ctx.stroke();

    this.ctx.rect(215, 165, 570, 170);
    this.ctx.stroke();

    this.ctx.closePath();
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

  GameView.prototype.gameOver = function () {
    window.clearInterval(this.startIntervalId);
    window.clearInterval(this.timerIntervalId);
    document.onkeydown = null;

    var h2 = document.createElement('h2');
    h2.id = "game-over";
    var p1 = document.createElement('p');
    p1.innerHTML = "GAME OVER";
    var p2 = document.createElement('p');
    p2.innerHTML = 'Press "space" to restart';
    h2.appendChild(p1);
    h2.appendChild(p2);
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(h2);
    this.bindRestart();
  };

  GameView.prototype.start = function () {
    this.ctx.clearRect(0, 0, 1000, 800);
    this.selectedId = 1;
    this.timeLeft = 30;
    this.score = 0;
    this.lives = 5;
    this.game.start();
    this.bindKeyHandlers();
    this.startTimer();

    if (!this.music) {
      this.music = new Audio("./assets/sounds/music.wav");
      this.music.volume = 0.7;
      this.music.loop = true;
      this.music.play();
    }

    this.startIntervalId = setInterval(function () {
      this.displaySelected();
      this.drawScore();
      this.drawTime();
      this.drawLives();
      this.drawBoard();

      if (this.timeLeft <= 0 || this.lives <= 0) {
        this.gameOver();
      }

      this.game.weapons.forEach(function (weapon) {
        if (weapon) {
          this.ctx.beginPath();
          this.ctx.moveTo(weapon.pos[0] - 3, weapon.pos[1] + 2);
          this.ctx.lineTo(weapon.pos[0] + 103, weapon.pos[1] + 2);
          this.ctx.lineTo(weapon.pos[0] + 50, weapon.pos[1] - 104);
          this.ctx.fillStyle = "#ffff4d";
          this.ctx.fill();
          this.ctx.closePath();

          weapon.move();
          weapon.draw(this.ctx);
        }
      }.bind(this));

      this.game.cards.forEach(function (card) {
        this.ctx.clearRect(card.pos[0] - 1, card.pos[1] - 1, 102, 102);
        card.move();
        card.draw(this.ctx);
      }.bind(this));

      this.game.weapons.forEach(function (weapon) {
        if (weapon) {
          if (weapon.isFired && weapon.collision) {
            this.game.cards.forEach(function (card) {
              if (card.collision && card.isCollideWith(weapon)) {
                this.handleCollision(weapon, card);
              }
            }.bind(this));
          }
        }
      }.bind(this));
    }.bind(this), 12);
  };

  GameView.prototype.startTimer = function () {
    this.timerIntervalId = setInterval(function () {
      this.timeLeft--;
    }.bind(this), 1000);
  };

  GameView.prototype.handleCollision = function (weapon, card) {
    cardVal = GESTURES[card.gesture];
    weaponVal = GESTURES[weapon.gesture];
    if (cardVal === weaponVal) { // NOTE: Tie
      this.tieSound.currentTime = 0.13;
      this.tieSound.play();

      card.dir = [0, 0];
      weapon.dir = [0, 0];
      card.collision = false;
      weapon.collision = false;
      this.flashIntervalId = setInterval(function () {
        card.show = !card.show;
      }.bind(this), 100);

      setTimeout(function () {
        window.clearInterval(this.flashIntervalId);
        this.game.remove(card);
        this.game.remove(weapon);
        this.clearAreas(weapon, card);
        this.isNoCards();
      }.bind(this), 500);
    } else if (((cardVal + 1) % 3) === weaponVal) { // NOTE: Win
      this.winSound.currentTime = 0;
      this.winSound.play();

      this.score++;

      card.dir = card.bounceDir;
      card.collision = false;
      weapon.dir = [0, 0];
      weapon.collision = false;

      setTimeout(function () {
        this.game.remove(card);
        this.game.remove(weapon);
        this.clearAreas(weapon, card);
        this.isNoCards();
      }.bind(this), 500);
    } else { // NOTE: Lose
      this.loseSound.currentTime = 0;
      this.loseSound.play();

      this.lives--;

      weapon.dir = weapon.bounceDir;
      weapon.collision = false;
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
    this.ctx.clearRect(weapon.pos[0] - 1, weapon.pos[1] - 100, 103, 121);
    if (card) {this.ctx.clearRect(card.pos[0] - 1, card.pos[1] - 1, 102, 102);}
  };
})();
