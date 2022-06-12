import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './components/home';
import Blog from './components/blog';
import Post from './components/blog/post';
import Nav from './components/nav';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './styles/_index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Router(props) {
    const { children } = props;

    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
}
Router.propTypes = {
  children: PropTypes.node,
};

const App = () => {
  const [showNav, setShowNav] = useState(true);

  return (
    //<React.StrictMode>
      <div>
        <Router>
          { showNav && <Nav/> }
          <Routes>
            <Route path='/' element={<Home setShowNav={setShowNav}/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/blog/:slug' element={<Post/>}/>
            <Route path='/photography' element={<Blog/>}/>
            <Route path='/photography/:slug' element={<Post/>}/>
          </Routes>
        </Router>
      </div>
    //</React.StrictMode>
  );
};

root.render(<App/>);

reportWebVitals();
