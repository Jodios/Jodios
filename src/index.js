import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Blog from './blog';
import NotFound from './notFound';
import Navigation from './navigation/navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Post from './post';
import './firebase';


const client = new ApolloClient({
  uri: 'https://api-us-west-2.graphcms.com/v2/cl3nsb6j5481m01xi8zyq9t7l/master',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    element: <><Navigation /><Outlet /></>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:slug",
        element: <Post />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },

    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
