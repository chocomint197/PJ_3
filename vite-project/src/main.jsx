import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './Components/Homepage/Homepage.jsx';
import Detail from './Components/Detail/Detail.jsx';
import Login from './Components/Users/Login.jsx';
import Register from './Components/Users/Register.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>
  },
  {
    path: "/title/:id",
    element: <Detail/>
  },
  {
    path: "/user/login",
    element: <Login/>
  },
  {
    path: "/user/register",
    element: <Register/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
)
