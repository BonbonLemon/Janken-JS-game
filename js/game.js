(function () {
  if (typeof Janken === "undefined") {
    window.Janken = {};
  }

  var Game = Janken.Game = function () {
    this.cards = [];
    this.weapons = [];

    this.addCards();
    this.addWeapons();
  };

  Game.prototype.add = function (object) {
    if (object instanceof Janken.Card) {
      this.cards.push(object);
    } else if (object instanceof Janken.Weapon) {
      this.weapons.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addCards = function () {
    var x = 0;
    var intervalID = setInterval(function () {
      this.add(new Janken.Card());

      if (++x === 10) {
        window.clearInterval(intervalID);
      }
    }.bind(this), 200);
  };

  Game.prototype.addWeapons = function () {
    this.add(new Janken.Weapon([450, 700]));
  };
})();
