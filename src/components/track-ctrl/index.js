import React, {Component} from "react"
// import {Link} from "react-router"
import style from "./style.css"

class TrackCtrl extends Component {

  constructor(props) {
    super(props);
    this.handleTrackCtrlDown = this.handleTrackCtrlDown.bind(this);
    this.handleTrackCtrlUp = this.handleTrackCtrlUp.bind(this);
    this.state = {
      active: false
    }
  }

  handleTrackCtrlDown() {
    this.setState({
      active: true
    });
  }

  handleTrackCtrlUp() {
    this.setState({
      active: false
    });
  }


  render() {
    return (
      <li className={style.trackCtrl} id={style["trackCtrl" + this.props.trackIndex]} onMouseDown={this.handleTrackCtrlDown}
          onMouseUp={this.handleTrackCtrlUp}>
        {this.props.trackIndex}
      </li>
    )
  }
}

export default TrackCtrl
