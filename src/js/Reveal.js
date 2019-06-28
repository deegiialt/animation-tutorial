import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import { TimelineLite } from 'gsap';
// import CustomEase from '../../functions/easing/CustomEase.min';

class Reveal extends Component {
  constructor (props) {
    super(props);

    this.target = null;
  }

  state = {
    revealed: false
  };

  // Determine whether the element should begin transition to be displayed.
  setRevealed = (position) => {
    if (position === 'above') {
      this.setState({
        revealed: true
      });
    } else {
      this.setState({
        revealed: (position === 'inside' ? true : false)
      });
    }
  }

  setScrollableAncestor () {
    if (typeof document !== `undefined`) {
      return window;
    }
    return null;
  }

  // General animation: Move element/section up and fade in visibility.
  handleGeneralReveal = ({ currentPosition }) => {
    this.setRevealed(currentPosition);

    const {
      target
    } = this;

    // const {
    //   delay
    // } = this.props;
    // const delay = 0.2;

    const duration = 1.5;

    const {
      revealed
    } = this.state;

    const tl = new TimelineLite();
    tl.from(target, duration, {
      scale: (revealed === true ? 2 : 1),
    })
    .from(target, duration, {
      x: (revealed === true ? 80 : 0),
    })
  };

  render () {
    return (
      <div className='reveal__container'>
        <Waypoint scrollableAncestor={this.setScrollableAncestor()} onEnter={this.handleGeneralReveal} onLeave={this.handleGeneralReveal} bottomOffset='0'>
          <div className={`reveal__item`} ref={(node) => { this.target = node; }}>
            Animate on Scroll
          </div>
        </Waypoint>
      </div>
    );
  }
}

export default Reveal;
