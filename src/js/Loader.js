import React from 'react';
import TweenLite, { Bounce } from 'gsap/TweenMax'

class Loader extends React.Component {

  constructor(props){
    super(props);
    // reference to the DOM node
    this.myElement = null;
    // reference to the animation
    this.myTween = null;
  }

  componentDidMount() {
    this.myTween = TweenLite.to(this.myElement, 2, 
      {
        repeat: -1,
        top: '80%',
        ease: Bounce.easeOut
      });
  }

  render() {
    return (
      this.props.percentLoaded ? "" :

      <div className="loader" ref={div => this.myElement = div}>
        {/* <img src="assets/img/basketball.png" alt="Basketball icon" className="loader__image"/> */}
        Object Loading...
      </div>
    )
  }
};

export default Loader;