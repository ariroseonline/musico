import React, {Component} from "react"
// import {Link} from "react-router"
import style from "./style.css"
import TrackCtrl from "../track-ctrl"
import Lion from "../lion"
// import Firebase from "firebase"

class Main extends Component {


  constructor(props) {
    super(props);
    this.step = this.step.bind(this);
    window.mouseVelocity = {}
    window.track1HeldAmount = 1
    window.track1Held = false
    window.track2HeldAmount = 1.1
    window.track2Held = false
    window.track3Held = false
  }
  //
  // componentDidMount() {
  //
  //     var firebaseConfig = {
  //       apiKey: 'AIzaSyCtMDY0Z5Bv69rLncGVRelPtkGVTypAwA0',
  //       authDomain: 'infinite-messages-5a1a0.firebaseapp.com',
  //       databaseURL: 'https://infinite-messages-5a1a0.firebaseio.com',
  //       storageBucket: 'infinite-messages-5a1a0.appspot.com',
  //       messagingSenderId: '810459238534'
  //     };
  //     Firebase.initializeApp(firebaseConfig);
  // }

  freeze() {
    // window.mouseVelocity = {x: Math.random() * (window.innerWidth * .4), y: Math.random() * (window.innerHeight * .4)} // base the initial mouse velocity off screensize
    window.freeze = true
  }

  unfreeze() {
    window.freeze = false
  }

  componentDidMount() {

    var lastMousePos = { x: window.innerWidth * .5, y: window.innerHeight * .5 } // assume the mouse starts at the center
    var breakability = .9; // decimal between 0-1, closer to 1 the further polygons push away from eachother


    document.addEventListener('keydown', function (event) {
      event.preventDefault();
      if (event.which === 52) {
        if(window.track3Held) {
          this.freeze();
          window.dispatchEvent(new Event('freezeFormation'));
        }

      }

      if(event.which === 51) {
        window.track3Held = true;
      }


      if(event.which === 50) {
        window.track1Held = true;
      }

      if(event.which === 49) {
        window.track2Held = true;
      }

    }.bind(this));


    document.addEventListener('keyup', function (event) {
      event.preventDefault();

      if(event.which === 51) {
        window.track3Held = false;
        this.unfreeze();
        window.dispatchEvent(new Event('unfreezeFormation'));
      }

      if(event.which === 50) {
        window.track1Held = false;
      }

      if(event.which === 49) {
        window.track2Held = false;
      }
    }.bind(this));

    setTimeout(function(){ // wait 4 seconds then start listening to mouse move
      document.body.onmousemove = function(e) {
        var mousePos = { x: e.screenX, y: e.screenY} // current mouse position
        // calculate moues velocity based on distance between frames, breakability, and window size
        window.mouseVelocity = { x: window.innerWidth * (mousePos.x - lastMousePos.x) / (window.innerWidth * (1-breakability)), y: window.innerHeight * (mousePos.y - lastMousePos.y) / (window.innerHeight * (1-breakability)) }

        lastMousePos = mousePos;
      }
    },4000);

    // get the party started
    window.requestAnimationFrame(this.step);

  }

  step(timestamp) {
    window.requestAnimationFrame(this.step); // keep the clock ticking
    // apply friction to mouse
    // window.mouseVelocity.x *= 0.86;
    // window.mouseVelocity.y *= 0.86;
    if(window.track1Held) {
      console.log('held')
      window.track1HeldAmount *= 1.15;
    } else if(window.freeze) {
      window.track1HeldAmount = 100
    } else {
      var newTrack1Amount = window.track1HeldAmount * 0.87;
      window.track1HeldAmount = Math.max(newTrack1Amount, 1.1);
    }

    if(window.track2Held) {
      window.track2HeldAmount *= 1.01;
    } else {
      var newTrack2Amount = window.track2HeldAmount * 0.95;
      window.track2HeldAmount = Math.max(newTrack2Amount, 1.1);
    }

    this.forceUpdate();
  }

  render() {
    return (
      <div className={style.root}>
        {/*<ul className={style.trackList}>*/}
          {/*<TrackCtrl trackIndex="0"/>*/}
          {/*<TrackCtrl trackIndex="1"/>*/}
          {/*<TrackCtrl trackIndex="2"/>*/}
          {/*<TrackCtrl trackIndex="3"/>*/}
        {/*</ul>*/}
        <Lion zoomAmount={window.track2HeldAmount} />
      </div>
    )
  }
}

export default Main
