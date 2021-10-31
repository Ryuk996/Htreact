import Items from "./Items";
import "./contentZ.css"
import React, { useEffect, useState } from "react"
import axios from "axios";
import env from "./settings";
import { useHistory } from "react-router";
import {showErrMsg, showSuccessMsg} from './Notifications/Notification'


export default function Dashboard(props) {
  const token = window.localStorage.getItem("firstlogin");
  const initialState = {
    err: '',
    success: ''
}
const [user, setUser] = useState(initialState)
const { err, success} = user
  const history = useHistory();
  const [filesList, setFilesList] = useState([]);
  const [filteredfiles, setFilteredfiles] = useState([]);

  useEffect(async () => {
    try {
      let file = await axios.get(`${env.api}/file/getfile`,{headers: {Authorization: token}})
      setFilesList(file.data)
      console.log(file.data)
      if(file.data==''){
        setUser({...user, err: "No files present", success: ''})
        }
      

    } catch (error) {
      alert("*kindly Login to ACCESS FILES");
      console.log(error)
    }

  }, [])
  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="TitleZ">File Drive</h1>
      </div>
      <div className="container">
        <div className="FileContentZ">
        <br></br>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        <br></br>
          <Items filesList={filesList}></Items>
        </div>
      </div>
    </>
  );
}
