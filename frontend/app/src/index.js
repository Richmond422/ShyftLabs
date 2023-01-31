import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Home} from './Home'
import {Student} from './Student'
import {Course} from './Course';
import {Grade} from './Grade'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/students" element={<Student />} />
        <Route path="/courses" element={<Course/>} />
        <Route path="/grades" element={<Grade />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
