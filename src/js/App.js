import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation'
import BlackHole from './BlackHole';
import ObjectAnimation from './ObjectAnimation';
import Reveal from './Reveal';
import ScrollAnimation from './ScrollAnimation';

import '../scss/main.scss';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <main>
            <Switch>
              <Route path='/' exact component={Navigation}></Route>
              <Route path='/black-hole' component={BlackHole}></Route>
              <Route path='/object-animation' component={ObjectAnimation}></Route>
              <Route path='/reveal' component={Reveal}></Route>
              <Route path='/scroll-animation' component={ScrollAnimation}></Route>
            </Switch>
          </main>
        </Router>
      </div>
    )
  }
}

export default App;
