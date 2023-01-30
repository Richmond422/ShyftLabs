import React from 'react';
import { slide as SlideMenu } from 'react-burger-menu';
import './index.css';

export const Menu = () => {
    return (
        <SlideMenu>
          <a className="menu-item" href="/">
            Home
          </a>
          <a className="menu-item" href="/students">
            Students
          </a>
          <a className="menu-item" href="/courses">
            Courses
          </a>
          <a className="menu-item" href="/grades">
            Grades
          </a>
        </SlideMenu>
    );
}