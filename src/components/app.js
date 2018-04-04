import React, { Component } from 'react';
import BirthdayForm from './birthdayForm';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Birthday Countdown</h1>
          <div className="header__skew">
            <div className="header__subskew">
            
              <BirthdayForm />
            </div> 
          </div>
  
        </header>
        
      </div>
    );
  }
}
