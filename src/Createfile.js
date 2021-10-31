import { useState,useEffect,fragment } from 'react'
import axios from 'axios'
import env from "./settings"
import './createfile.css'
import {showErrMsg, showSuccessMsg} from './Notifications/Notification'
import {ProgressBar} from "react-bootstrap";

//import './App.css'


function App() {
  const token = window.localStorage.getItem("firstlogin");
  const initialState = {
    err: '',
    success: ''
}
  const [user, setUser] = useState(initialState)
  const { err, success} = user
  const [level, setLevel] = useState(0);
  const [file, setFile] = useState([])
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const [isLoadings, setLoadings] = useState(true)
  
 

  async function postImage({ image, description }) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    const result = await axios.post(`${env.api}/file/upload`,formData,{ 
      headers: { Authorization: token  },
      onUploadProgress: (progressEvent) => {
      const {loaded, total} = progressEvent;
      let percent = Math.floor( (loaded * 100) / total )
      // setLevel( percent )
      if( percent <= 100 ){
        setLevel( percent )
      }  
    }} )
    setLevel(level)
    setFile([""])
    return result.data
    
  }

  const submit = async (e) => {
    e.preventDefault()
    const isFile = (file) => {
      if(file !=='' || undefined) return true
      return false
    }
    if(!isFile(file))
          return setUser({...user, err: "File not chosen/Choose a valid file", success: ''})
          // if(isFile(file.size > 5120 * 5120))
          //       return setUser({...user, err: "Size too large." , success: ''})
     
    try {
      const result = await postImage({ image: file, description })
      setImages([result.image, ...images])
     
      return setUser({...user, err: "", success: "File upload complete"})
    } catch (err) {
      err.response.data.msg &&
      setUser({...user, err:err.response.data.msg , success: ''})
    }

  }

  const fileSelected = event => {
    const files = event.target.files[0]
    setFile(files)
    console.log(files)
    setUser({...user, err: "", success: ''})
  }
  
  
  return (
    <>
    <div classNameName="container">
      <div className="FileContentZ">
      <form onSubmit={submit}>
        <input className="choosefile" onChange={fileSelected} type="file" accept="image/*"></input>
        <br></br>
        <br></br>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <br></br> 
         <ProgressBar now={level} value={level} active label={`${level}%`} /> 
        <br></br>
        <label>FileDescription</label>
        <div></div>
        <input  className="desc" value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <div><button className="upload" type="submit">Upload</button></div>
      </form>
      
      </div>
    </div>
    </>
    
  );
}


export default App;

            ////////////////////////############################################/////////////////////////////////
