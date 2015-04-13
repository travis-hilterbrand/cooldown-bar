function CooldownButton(image, cooldown) {
  this.image = image;
  this.cooldown = cooldown;
  this.enabled = true;
  this.timeUntilReady = 0;
}

var App = angular.module('App', []);
App.controller('CooldownBarController', function($scope) {
  $scope.buttons = [
    new CooldownButton('spell_nature_riptide.jpg',1),
    new CooldownButton('spell_shaman_earthquake.jpg',2),
    new CooldownButton('spell_shaman_unleashweapon_flame.jpg',3)
  ];
  $scope.onClick = function(button) {
    if (button.enabled) {
      button.timeUntilReady = button.cooldown;
      button.enabled = false;
      button.timer = setInterval(_.partial($scope.onCooldown, button), 1000);
    }
  };
  $scope.onCooldown = function(button) {
    button.timeUntilReady--;
    if (button.timeUntilReady <= 0) {
      button.enabled = true;
      clearInterval(button.timer);
    }
    $scope.$apply();
  };
});
