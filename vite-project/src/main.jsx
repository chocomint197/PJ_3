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
import UserList from './Components/Users/UserList.jsx';
import CreateGroup from './Components/Group/CreateGroup.jsx';
import ChapterUpload from './Components/Upload/ChapterUpload.jsx';
import Chapter from './Components/Detail/Chapter.jsx';
import Searchpage from './Components/Homepage/Searchpage.jsx';

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
    path: "/user/profile/:id",
    element: <Profile/>
  },
  {
    path:'/user/list',
    element: <UserList/>
  },
  {
    path:'/user/profile/:id/uploads',
    element:<Profileuploads/>
  },
  {
    path:'/groups',
    element: <Groups/>
  },
  {
    path:'/group/profile/:id',
    element: <Groupprofile/>
  },
  {
    path: '/group/:id/titles',
    element: <Grouptitle/>
  },
  {
    path: '/group/:id/members',
    element: <Groupmembers/>
  },
  {
    path: '/create/group',
    element: <CreateGroup/>
  },
  {
    path: '/create/title',
    element: <Uploadmanga/>
  },
  {
    path: '/title/upload/:id',
    element: <ChapterUpload/>
  },
  {
    path: '/title/:mangaId/chapter/:chapterId',
    element: <Chapter/>
  },
  {
    path :'/titles',
    element: <Searchpage/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
)
