import React, { Component } from 'react';

import { connect } from 'react-redux';
import { types } from './redux';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
      const {
          request, requestTextUpdated,
          quote, appState, reqText, spellingErrors, correctedQuote
      } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" style={
              appState === 'loading' ?
              {animationDuration: '1s', animationDirection: 'reverse'} :
              {}} />
          <h1 className="App-title">Welcome to React sagas!</h1>
        </header>
        <p className="App-intro">
          {quote.length > 0 ? quote : `We're ready for Yoda senpai to speak`}
        </p>
        <div>
        <input type="text" value={reqText} onChange={(e) => requestTextUpdated(e.target.value)}/>
        <button onClick={() => request({reqText})}>Request him now!</button>
        </div>
        {spellingErrors > 0 ? <div>
            Did you mean: {correctedQuote}
        </div> : false}
      </div>
    );
  }
}

export default connect(
    state => ({...state}),
    (dispatch) => ({
        request({reqText, ...params}) {
            dispatch({type: types.request, text: reqText, ...params})
        },
        requestTextUpdated(text) { dispatch({type: types.textUpdate, text})}
    })
)(App);
