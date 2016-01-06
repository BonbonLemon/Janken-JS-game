(function () {
  if (typeof Janken === "undefined") {
    window.Janken = {};
  }

  var Util = Janken.Util = {};


  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();
