function CooldownButton(image, cooldown) {
  this.image = image;
  this.cooldown = cooldown;
  this.enabled = ko.observable(true);
  this.timeUntilReady = ko.observable();
  this.imageCss = ko.observable('url(../images/' + this.image + ')');

  this.onClick = function() {
    if (this.enabled()) {
      this.timeUntilReady(this.cooldown);
      this.enabled(false);
      this.timer = setInterval(this.onCooldown, 1000);
    }
  };
  this.onCooldown = _.bind(function() {
    this.timeUntilReady(this.timeUntilReady() - 1);
    if (this.timeUntilReady() <= 0) {
      this.enabled(true);
      clearInterval(this.timer);
    }
  }, this);
}
function CooldownBarViewModel() {
  this.buttonTemplate = $('#cooldown-bar-button').html();
  this.buttons = ko.observableArray([
    new CooldownButton('spell_nature_riptide.jpg', 1),
    new CooldownButton('spell_shaman_earthquake.jpg', 2),
    new CooldownButton('spell_shaman_unleashweapon_flame.jpg', 3)
  ]);
}
function TestViewModel() {
  this.numberOfClicks = ko.observable(0);

  this.onClick = function() {
    this.numberOfClicks(this.numberOfClicks() + 1);
  };
}

$(document).ready(function() {
  var viewModel = new CooldownBarViewModel();
  ko.applyBindings(viewModel, $('.cooldown-bar').get(0));

  ko.applyBindings(new TestViewModel(), document.getElementById('test'));
});
