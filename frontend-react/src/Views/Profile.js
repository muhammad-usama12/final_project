
import React, { useEffect, useState } from 'react'
import axios from 'axios';

 
const Profile = () => {
 
 const [user, setUser] = useState({})
 useEffect(() => {
   const userId = localStorage.getItem('teeboUser');
   if (!userId) {
     // redirect to login
   }
   axios.get(`http://localhost:3001/api/users/${userId}`)
   .then(res => {
     console.log("userid response", userId, res)
     setUser(res.data)
   })
 
 },[])
 
 return (
   <div>Profile
     <div>{user.id}</div>
     <div>{user.username}</div>
     <img src={user.icon_url} />
   </div>
 
 )
}
 
export default Profile
