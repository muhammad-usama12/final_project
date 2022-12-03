import React, { useEffect, useState } from 'react'
import { storage } from "../firebase/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'

import Header from '../components/Header';
import Spacing from '../components/Spacing';
import Button from '../components/Button'
 
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
    setUser({ ...user, [e.target.id]: e.target.value})
  }

  
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewSelectedImage, setPreviewSelectedImage] = useState(null)
  
  function submitForm(e) {
    console.log("attempt submit")
    e.preventDefault();

    if (selectedImage !== null) {
      const imageRef = ref(storage, `images/${selectedImage.name}`);
      uploadBytes(imageRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setSelectedImage(url);
          console.log("upload success", url);
          return url;
        })
          .then((url) => {
            console.log("url after upload", url)
            const payload = { icon_url: url }
            console.log("profile update success payload", payload)
            axios.put(`http://localhost:3001/api/users/${user.id}`, payload)
          })
          .catch((err) => console.log("submit failed: ", err.message))
      })
    }
    
    const payload = { bio: user.bio, username: user.username }
    console.log("profile update success payload", payload)
    axios.put(`http://localhost:3001/api/users/${user.id}`, payload)
  }
 
  return (
    //  <div>Profile
    //    <div>{user.id}</div>
    //    <div>{user.username}</div>
    //    <img src={user.icon_url} />
    //    <form onSubmit={submitForm}>
    //    <input onChange={onChange} name="username" value={user.username} id="username" />
    //    <input onChange={onChange} name="bio" value={user.bio} id="bio" />
    //    <button type="submit">Edit profile</button>
    //    </form>
    //  </div>
    <>
      <Header />
      <Spacing />
      <section className="edit-profile">
        <div className="profile-header">
          <label className="upload-image">
            <input
              type="file"
              name="myImage"
              id="icon_url"
              onChange={(e) => {
                if (e.target.files.length !== 0) {
                  setPreviewSelectedImage(URL.createObjectURL(e.target.files[0]));
                  setSelectedImage(e.target.files[0]);
                }
              }}
            />
            <img
              className="profile-display-picture"
              src={previewSelectedImage ? previewSelectedImage : user.icon_url}
              alt="profile"
            ></img>
            <p id="change-photo">Change Photo</p>
            <i className="fa-solid fa-circle-user"></i>
          </label>
          
          <form>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="who are you king"
              value={user.username}
              onChange={onChange}
            />
            <textarea
              name="bio"
              type="text"
              id="bio"
              placeholder="tell me about yourself"
              value={user.bio}
              onChange={onChange}
            />
          </form>
        </div>
        {/* {error !== "" && <p className="error">{error}</p>}
        <div className="edit-profile-categories">
          {categories}
        </div> */}
        <div className="edit-button">
          <Button confirm message="Save" onClick={submitForm}/>
        </div>
      </section>
    </>
  )
}
 
export default EditProfile

              // onChange={(event) => {
              //   if (event.target.files.length !== 0) {
              //     setSelectedImage(event.target.files[0]);
              //     setPreviewSelectedImage(
              //       URL.createObjectURL(event.target.files[0])
              //     );
              //   }
              // }}