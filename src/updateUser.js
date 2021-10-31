import React, { useEffect, useState } from "react"
import axios from "axios";
import { useHistory } from "react-router";
import env from "./settings"
import "./updateUser.css"
import {showErrMsg, showSuccessMsg} from './Notifications/Notification'
export default function UpdateUser(){

    const token = window.localStorage.getItem("firstlogin");
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    const [firstName, setFirstName]=useState(" ");
    const [userName, setUsername]=useState(" ");
    const [profilePic, setProfilePic]=useState(" ");
    const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmpassword] = useState("");
    const[isLoading,setLoading]=useState(false)
    const history = useHistory();

    useEffect(async()=>{
      try{
        let product = await axios.get(`${env.api}/user/getuserInfo`, {
                        headers: {Authorization: token}
                    })
      setUsername(product.data.userName)             
      setFirstName(product.data.firstName)
      setProfilePic(product.data.profilePic)
      console.log([product.data])
      }
      catch{
        console.log("error");
      }
    },[])

    const changeAvatar = async(e) => {
        e.preventDefault()
        setUser({...user, err: '' , success: ''})
        try {
            const file = e.target.files[0]
            
            if(!file) return setUser({...user, err: "No files were uploaded." , success: ''})
            console.log(file)
            if(file.size > 1024 * 1024)
                return setUser({...user, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setUser({...user, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post(`${env.api}/file/uploadProfpic`, formData, {
                headers: {'content-type': 'multipart/form-data'}
            })

            setLoading(false)
            setProfilePic(res.data.url)
            
        } catch (err) {
            setUser({...user, err: err.response.data.msg , success: ''})
        }
    }

    const updateInfor = () => {
        try {
             axios.put(`${env.api}/user/updateuser`, {
                firstName: firstName ? firstName : firstName,
                profilePic: profilePic ? profilePic : profilePic
            },{
                headers: {Authorization: token}
            })

            setUser({...user, err: '' , success: "Updated Success!"})
        } catch (err) {
            setUser({...user, err: err.response.data.msg , success: ''})
        }
    }
    const updatePassword = async () => {
        const isMatch = (password, confirmPassword) => {
            if(password === confirmPassword) return true
            return false
        }
        if(!isMatch(password, confirmPassword))
            return setUser({...user, err: "Password did not match.", success: ''})
            console.log({password,confirmPassword})
        try {
            let resetData = await axios.post(`${env.api}/user/resetpwd`,{password},
            {headers: {Authorization: token}})
            setUser({...user, err: '', success: resetData.data.msg})
        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const handleUpdate = () => {
        if(firstName || profilePic) updateInfor()
        if(password) updatePassword()
    }

    return(
        <div>
      
      <div className="container">
      <h1 class="TitleZ">Update Profile</h1>
      <div className="FileContentZ">
      
      <br></br>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        <br></br>
                    <div className="profilePicP">
                      { <img className="profilePic" src={ profilePic ? profilePic : profilePic} alt=""/> }
                     <img src="" alt=""/>
                     <span>
                         <i className="fas fa-camera"></i>
                         <input className="choosefile" type="file" firstName="file" id="file_up" accept="image/*" onChange={changeAvatar} />
                     </span> 
                 </div>
                 <div className="form-group">
                 <div  className="col-lg-6">
                <label>Name</label>
                <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} className="form-control"></input>
            </div>
                </div>
                <div className="form-group">
                 <div  className="col-lg-6">
                 <label htmlFor="email">Email</label>
                    <input type="email" firstName="email" id="email" value={userName} className="form-control"
                    placeholder="Your email address"  disabled />
            </div>
                </div>
                <div className="form-group">
                 <div  className="col-lg-6">
                 <label htmlFor="confirmPassword"> New Password</label>
                    <input type="password" firstName="confirmPassword" id="Password" className="form-control"
                    placeholder="New password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </div>
                </div>
                <div className="form-group">
                <div  className="col-lg-6">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input type="password" firstName="confirmPassword" id="confirmPassword" className="form-control"
                    placeholder="Confirm password" value={confirmPassword} onChange={(e) => {setConfirmpassword(e.target.value)}} />
            </div>
            
            </div>
            <button className="update" onClick={handleUpdate}>Update</button>
      </div>
    </div> 
    </div>
    )
}


