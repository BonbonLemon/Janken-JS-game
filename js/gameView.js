(function () {
  if (typeof Janken === "undefined") {
    window.Janken = {};
  }

  var GameView = Janken.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
  };

  GameView.prototype.bindKeyHandlers = function () {
    document.onkeydown = function (e) {
      if (e.which === 32) {
        this.game.weapons[0].fire();
      }
    }.bind(this);
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();

    setInterval(function () {
      this.game.cards.forEach(function (card) {
        this.ctx.clearRect(card.pos[0], card.pos[1], 100, 100);
        card.move();
        card.draw(this.ctx);
      }.bind(this));

      this.game.weapons.forEach(function (weapon) {
        this.ctx.clearRect(weapon.pos[0], weapon.pos[1], 100, 100);
        weapon.move();
        weapon.draw(this.ctx);
      }.bind(this));
    }.bind(this), 8);
  };
})();
