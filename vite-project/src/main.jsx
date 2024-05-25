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
import Profile from './Components/Users/Profile.jsx';
import Profileuploads from './Components/Users/Profileuploads.jsx';
import Groups from './Components/Group/Group nav/Groups.jsx';
import Groupprofile from './Components/Group/Group profile/Groupprofile.jsx';
import Grouptitle from './Components/Group/Group profile/Grouptitle.jsx';
import Groupmembers from './Components/Group/Group profile/Groupmembers.jsx';
import Uploadmanga from './Components/Upload/Uploadmanga.jsx';
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
  },
  {
    path: "/user/profile",
    element: <Profile/>
  },
  {
    path:'/user/profileuploads',
    element:<Profileuploads/>
  },
  {
    path:'/groups',
    element: <Groups/>
  },
  {
    path:'/group/profile',
    element: <Groupprofile/>
  },
  {
    path: '/group/titles',
    element: <Grouptitle/>
  },
  {
    path: '/group/members',
    element: <Groupmembers/>
  },
  {
    path: '/create/title',
    element: <Uploadmanga/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
)
