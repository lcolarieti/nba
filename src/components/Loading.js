import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../app.scss';

const mapStateToProps = state => {

  return {
    ready: state.ready
  };
};

class Loading extends Component {

  render() {
    let style = {display: !this.props.ready ? 'block' : 'none'};
    return (
      <div id="loading" style={style}>
        <div className="boxes">
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Loading);
