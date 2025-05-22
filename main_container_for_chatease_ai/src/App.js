import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer';
import Feedback from './components/Feedback/Feedback';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> ChatEase AI
            </div>
            <div>
              <button className="btn">Settings</button>
            </div>
          </div>
        </div>
      </nav>

      <MainContainer />
      <Feedback />
    </div>
  );
}

export default App;