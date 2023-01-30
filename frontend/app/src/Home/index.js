import React from 'react';
import './index.css'
import { Menu } from '../Menu';

export const Home = () => {
    return (
        <div className="App" id="outer-container">
          <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <div id="page-wrap">
            <h1>Shyftlab Assessment</h1>
          </div>
        </div>
      );
}