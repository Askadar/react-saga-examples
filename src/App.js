import React, { Component } from 'react';

import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
      const {test} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React sagas!</h1>
        </header>
        <p className="App-intro">
          {`We're ${'not yet ready'} for Yoga senpai to speak`}
        </p>
        <button onClick={() => test(123,231)}>Request him now!</button>
      </div>
    );
  }
}

export default connect(state => ({...state}), (dispatch) => ({test(a) { dispatch({type:'QuoteFetchRequest@Saga', a})}}))(App);
