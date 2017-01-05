(function () {
  if (typeof Janken === "undefined") {
    window.Janken = {};
  }

  var Game = Janken.Game = function () {
    this.cards = [];
    this.weapons = [];
    this.cardFlipSound = new Audio("./assets/sounds/card_flip.wav");
  };

  Game.prototype.start = function () {
    this.addCards();
    this.addWeapons();
  };

  Game.prototype.add = function (object, posId) {
    if (object instanceof Janken.Card) {
      this.cards.push(object);
    } else if (object instanceof Janken.Weapon) {
      this.weapons[posId] = object;
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addCards = function () {
    var x = 0;
    var intervalID = setInterval(function () {
      this.add(new Janken.Card(this));

      if (!isMuted) {
        this.cardFlipSound.currentTime = 0;
        this.cardFlipSound.play();
      }

      if (++x === 10) {
        window.clearInterval(intervalID);
      }
    }.bind(this), 300);
  };

  Game.prototype.addWeapons = function () {
    this.addWeapon([100, 700], 0);
    this.addWeapon([450, 700], 1);
    this.addWeapon([800, 700], 2);
  };

  Game.prototype.addWeapon = function (pos, posId) {
    this.add(new Janken.Weapon(pos, this, posId), posId);
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Janken.Card) {
      this.cards.splice(this.cards.indexOf(object), 1);
    } else if (object instanceof Janken.Weapon) {
      this.weapons[this.weapons.indexOf(object)] = null;
    } else {
      throw "wtf?";
    }
  };
})();
