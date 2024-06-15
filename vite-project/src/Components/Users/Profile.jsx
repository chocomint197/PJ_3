import React, { useEffect, useState } from 'react'
import '../../App.css'
import Navbar from '../Homepage/Navbar'
import Navbarheader from '../Homepage/Navbarheader'
import { NavLink, useParams } from 'react-router-dom';
// import './Usercontrol.css'
import axios from 'axios'
export default function Profile() {
    const [selectedTab, setSelectedTab] = useState('Info');

    const handleItemClick = (itemName) => {
      setSelectedTab(itemName);
    
  };
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('token'); 

const axiosInstance = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get(`https://pj-3-ug2p.onrender.com/api/v1/users/profile/${id}`)
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.log('Error fetching', error)
        }
    };
    fetchUserData()
  }, [id]);
  return (
    <div className="flex flex-grow text-color">
        <Navbar/>
        <div className="flex flex-col flex-grow">
            <Navbarheader/>
            <div className="h-[var(--navbar-height)]"></div>
        </div>
      
        <div className=" flex-grow" style={{background: 'rgb(25, 26, 28)'}}>
        
        <div className="layout-container page has-gradient px-4" style={{ height: 'auto', position: 'relative'}}>
                <div className="absolute top-0 left-0 w-full h-[640px] blur-xl filter-xl" style={{background: `radial-gradient(circle at top, rgb(var(--md-background) / 0.8), rgb(var(--md-background)) 75%), no-repeat top 35% center / 100% url(https://mangadex.org/img/group-banner.png)`}}></div>
                <div className="banner-container">
                    <div className="banner-image" style={{backgroundImage: 'url(https://mangadex.org/img/group-banner.png)', width: 'calc(100% - 256px)'}}></div>
                    <div className="banner-shade"></div>
                </div>
                <div className="clear-banner"></div>
                <div className="self-end" style={{gridArea: 'art', zIndex: 3}}>
                    <img src="https://mangadex.org/img/avatar.png" alt="Avatar" className="profile"/>
                </div>
                <div className="relative" style={{gridArea : 'button'}}>

                </div>
                {user && user.data && (
                <div className="min-w-0 ml-2" style={{gridArea: 'content'}}>
                    <div className="font-bold text-4xl mt-2 mb-6 flex items-center relative z-[3]" >
                        <div className="break-all">{user.data.userName}</div>
                    </div>
                    <div className="overflow-x-auto fill-width tabs mb-6">
                        <div className="select__tabs">
                            <NavLink to={`/user/profile/${id}`} className={`select__tab ${selectedTab === 'Info' ? 'active' : ''}`} onClick={() => handleItemClick('Info')}>Info</NavLink>
                            <NavLink to={`/user/profile/${id}/uploads`} className={`select__tab ${selectedTab === 'Uploads' ? 'active' : ''}`} onClick={() => handleItemClick('Uploads')}>Uploads</NavLink>
                        </div>
                    </div>
                    <div>
                        <div className="mb-6 relative z-[3]>">
                            <dt className="mb-2 font-bold">User ID</dt>

                            <dd>{user.data._id} </dd>
                        </div>
                        <div className="mb-6 relative z-[3]>">
                            <dt className="mb-2 fonht-bold">Roles</dt>
                            <dd className="flex gap-2 my-2 flex-wrap">

                            {user.data.role.map((role, index) => (
                          <div key={index} className="role-tag independent">
                            {role}
                      </div>
                              ))}
                                </dd>
                        </div>
                        <div className="mb-6 relative z-[3]">
                            <dt className="mb-2 font-bold">Uploads</dt>
                            

                            <div className="grid gap-y-2" style={{fontSize:"15px"}}>{user.data.uploadedItems.length}</div>
                        </div>
                    </div>
                </div>
            )}
            </div>
            


        </div>
    </div>
  )
}
