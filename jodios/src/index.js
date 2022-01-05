import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

class TTT extends React.Component {
  render(){
    return(
      <div>SORRY... UNDER CONSTRUCTION</div>
    )
  }
}

class TESTINGROUTE extends React.Component {
  render(){
    return(
      <div>IN TESTING YAY :)</div>
    )
  }
}

class App extends React.Component {

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<TTT/>} />
          <Route path="/test" element={<TESTINGROUTE/>} />
        </Routes>
      </Router>
    )
  }


}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
