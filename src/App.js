import React, { Component } from 'react';
import "./styles/base.css"
import Payment from "./Payment/dumbComponents/index"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Payment />
      </div>
    );
  }
}

export default App;
