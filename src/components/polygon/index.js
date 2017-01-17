import React, {Component} from "react"
import style from "./style.css"

class Polygon extends Component {

  constructor(props) {
    super(props)
    this.handleFreezeFormation = this.handleFreezeFormation.bind(this);
    this.state = {
      origFill: this.props.fill, // store the original fill color
      origPoints: this.props.points, // store the original positions that the polygon should be attracted to
      darkAmnt: 0, // a number we will continue to increment and that then take the Math.sin() value of
      colorVelocity: this.randomRange(0.04, 0.13), // how quickly to change the colors
      colorReach: this.randomRange(8, 40), // how much the hue should be aloud to shift
      transform: 'translate(0 0)', // transform amount, initially nothing. used to move the pieces
      movable: true, // whether or not the polygon is movable
      movability: { x: this.randomRange(0.86, 1.5), y: this.randomRange(0.86, 1.5) }, // how "movable" each polygon is
      polarity: {x : Math.random() <= .5, y: Math.random() <= .5 } // mouse polarity (which way to go when the mouse is moved)
    }
  }

  componentDidMount() {
    window.addEventListener('freezeFormation', this.handleFreezeFormation, false);
  }

  componentWillUnmount() {
    window.removeEventListener('freezeFormation',  this.handleFreezeFormation, false);
  }

  handleFreezeFormation() {
    this.setState({
      polarity: {x : Math.random() <= .5, y: Math.random() <= .5 },
      movability: { x: this.randomRange(0.86, 1.5), y: this.randomRange(0.86, 1.5) }
    })
  }

  randomRange(min,max) {
    return min + (Math.random() * max-min);
  }

  render() {

    // some otherwise unnecessary pointer variables to make things more legible
    var destColor = this.state.origFill;
    var colorVelocity = this.state.colorVelocity;
    var colorReach = this.state.colorReach;
    var movable = this.state.movable;
    var polarity = this.state.polarity;
    var movability = this.state.movability;

    // increment the darken amount. this number keeps getting bigger forever, but we take the sin of it so it fluctuates gradually between -1 and 1
    this.state.darkAmnt += colorVelocity;

    // calculate the destination color
    destColor = LightenDarkenColor(destColor, (Math.sin(this.state.darkAmnt) * colorReach));

    // let React do its thing
    return <polygon fill={destColor} transform={getTransform(movable, movability, polarity.x, polarity.y)}
                    points={this.state.origPoints}></polygon>;

    function getTransform(movable, movability, polarX, polarY) {
      if (!movable) return ('translate(0,0)');
      // var x = window.mouseVelocity.x || 0;
      // var y = window.mouseVelocity.y || 0;

      var x = window.track1HeldAmount;
      var y = window.track1HeldAmount;
      if (polarX) x = 0 - x;
      if (polarY) y = 0 - y;


      x *= movability.x;
      y *= movability.y;

      return ('translate(' + x + ' ' + y + ')');
    }

    function LightenDarkenColor(col, amt) { //https://css-tricks.com/snippets/javascript/lighten-darken-color/
      var usePound = false;

      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }

      var num = parseInt(col, 16);

      var r = (num >> 16) + amt;

      if (r > 255) r = 255;
      else if (r < 0) r = 0;

      var b = ((num >> 8) & 0x00FF) + amt;

      if (b > 255) b = 255;
      else if (b < 0) b = 0;

      var g = (num & 0x0000FF) + amt;

      if (g > 255) g = 255;
      else if (g < 0) g = 0;

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
  }

}

export default Polygon
