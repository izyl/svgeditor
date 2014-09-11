(function(){
  CClass = function(){};
  CClass.create = function(constructor) {
    var k = this;
    c = function() {
      this._super = k;
      var pubs = constructor.apply(this, arguments), self = this;
      for (key in pubs) (function(fn, sfn) {
        self[key] = typeof fn != "function" || typeof sfn != "function" ? fn :
          function() { this._super = sfn; return fn.apply(this, arguments); };
      })(pubs[key], self[key]);
    }; 
    c.prototype = new this;
    c.prototype.constructor = c;
    c.extend = this.extend || this.create;
    return c;
  };
})();