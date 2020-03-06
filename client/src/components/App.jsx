import React from 'react';
import io from 'socket.io-client';
import Calculator from './Calculator';
import '../css/App.css';

const socket = io('http://localhost:5000');

class App extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="app">
        <h1>Tian's Log Calculator</h1>
        <Calculator />
      </div>
    )
  }
}

export default App;