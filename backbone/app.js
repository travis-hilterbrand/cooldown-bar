var Marionette = Backbone.Marionette;
Marionette.Renderer.render = function(template, data) {
  var html = $(template).html();
  template = Handlebars.compile(html);
  return template(data);
};

var CooldownButton = Backbone.Model.extend({
  defaults: {
    image: '',
    cooldown: 0,
    enabled: true,
    timeUntilReady: 0
  }
});
var CooldownButtonCollection = Backbone.Collection.extend({
  model: CooldownButton
});

var CooldownBarItemView = Marionette.ItemView.extend({
  template: '#cooldown-bar-item-template',

  events: {
    'click .cooldown-bar-button': 'onClick'
  },
  onClick: function(e) {
    if (this.model.get('enabled')) {
      this.model.set('timeUntilReady', this.model.get('cooldown'));
      this.model.set('enabled', false);
      this.timer = setInterval(_.bind(this.onCooldown, this), 1000);
    }
    this.render();
  },
  onCooldown: function() {
    this.model.set('timeUntilReady', this.model.get('timeUntilReady') - 1);
    if (this.model.get('timeUntilReady') <= 0) {
      this.model.set('enabled', true);
      clearInterval(this.timer);
    }
    this.render();
  }
});
var CooldownBarView = Marionette.CompositeView.extend({
  template: '#cooldown-bar-template',
  childView: CooldownBarItemView,
  attachHtml: function(cv, iv) {
    cv.$('.cooldown-bar').append(iv.el);
  }
});

$(document).ready(function() {
  var collection = new CooldownButtonCollection([
    {image:'spell_nature_riptide.jpg',cooldown:1},
    {image:'spell_shaman_earthquake.jpg',cooldown:2},
    {image:'spell_shaman_unleashweapon_flame.jpg',cooldown:3},
  ]);

  var view = new CooldownBarView({collection:collection});
  view.render();
  $('#content').append(view.el);
});
