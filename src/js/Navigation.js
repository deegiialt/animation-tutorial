import React from 'react';
import { Link } from 'react-router-dom'

const Navigation = () => {
  return(
    <div className="navigation">
      <ul>
        <li><Link className="navigation__link" to="/black-hole">Black Hole</Link></li>
        <li><Link className="navigation__link" to="/object-animation">Object Animation</Link></li>
      </ul>
    </div>
  )
};

export default Navigation;