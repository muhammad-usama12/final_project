import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TextField from "../components/Registration/TextField";
 
const EditProfile = () => {
 
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
 
 function onChange(e) {
   setUser({ ...user, [e.target.id]: e.target.value  })
 }
 
 function submitForm(e) {
   e.preventDefault();
   const payload = { bio: user.bio, username: user.username }
   axios.put(`http://localhost:3001/api/users/${user.id}`,
   payload
   )
   .then(res => {
     console.log("user data posted", res.data)
   })
 }
 
 return (
   <div>Profile
     <div>{user.id}</div>
     <div>{user.username}</div>
     <img src={user.icon_url} />
     <form onSubmit={submitForm}>
     <input onChange={onChange} name="username" value={user.username} id="username" />
     <input onChange={onChange} name="bio" value={user.bio} id="bio" />
     <button type="submit">Edit profile</button>
     </form>
   </div>
 
 )
}
 
export default EditProfile
