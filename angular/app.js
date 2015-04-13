var App = angular.module('App', []);
App.controller('CooldownBarController', function($scope) {
  $scope.buttons = [
    {image:'spell_nature_riptide.jpg',cooldown:1,enabled:true},
    {image:'spell_shaman_earthquake.jpg',cooldown:2,enabled:true},
    {image:'spell_shaman_unleashweapon_flame.jpg',cooldown:3,enabled:true},
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
