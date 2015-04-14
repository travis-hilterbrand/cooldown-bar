var generateGuid = function() {
  // rfc4122 version 4 compliant
  // see http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  // http://www.broofa.com/2008/09/javascript-uuid-function/
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

var data = [
  {image:'spell_nature_riptide.jpg',cooldown:1},
  {image:'spell_shaman_earthquake.jpg',cooldown:2},
  {image:'spell_shaman_unleashweapon_flame.jpg',cooldown:3}
];

var CooldownBarButton = React.createClass({
  getInitialState: function() {
    return {
      enabled: true,
      timeUntilReady: 0
    };
  },
  onClick: function(e) {
    this.setState({
      enabled: !this.state.enabled,
      timeUntilReady: this.props.data.cooldown
    });
    this.timer = setInterval(_.bind(this.onCooldown, this), 1000);
  },
  onCooldown: function() {
    this.state.timeUntilReady--;
    if (this.state.timeUntilReady <= 0) {
      this.state.enabled = true;
      clearInterval(this.timer);
    }
    this.setState(this.state);
  },
  render: function() {
    var className = 'cooldown-bar-button ';
    if (this.state.enabled === false) {
      className += 'disabled';
    }
    var style= {backgroundImage: 'url(../images/' + this.props.data.image + ')'};
    return (
      <div className={className} style={style} onClick={this.onClick}>
        <div className="mask"></div>
        <div className="text">{this.state.timeUntilReady}</div>
      </div>
    );
  }
});

var CooldownBar = React.createClass({
  render: function() {
    var self = this;
    var buttons = this.props.data.map(function(button) {
      return(
        <CooldownBarButton key={generateGuid()} data={button}></CooldownBarButton>
      );
    });
    return (
      <div>
        {buttons}
      </div>
    );
  }
});

React.render(
  <CooldownBar data={data}/>,
  document.getElementById('cooldown-bar')
);
