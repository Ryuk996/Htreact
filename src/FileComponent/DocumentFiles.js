import Items from "../Items";
import React, { useEffect, useState } from "react"
import axios from "axios";
import env from "../settings"
import { useHistory } from "react-router";
import { showErrMsg, showSuccessMsg } from '../Notifications/Notification'


export default function DocumentFiles(props) {
  const token = window.localStorage.getItem("firstlogin");
  const history = useHistory();
  const initialState = {
    err: '',
    success: ''
  }
  const [user, setUser] = useState(initialState)
  const { err, success } = user
  const [docfilesList, setDocFilesList] = useState([]);
  const [filteredfiles, setFilteredfiles] = useState([]);

  useEffect(async () => {
    try {
      let file = await axios.get(`${env.api}/file/getdoc`, { headers: { Authorization: token } })
      setDocFilesList(file.data)
      console.log(file.data)
      if (file.data == '') {
        setUser({ ...user, err: "No files present", success: '' })
      }



    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })

    }

  }, [])

  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="TitleZ">Documents</h1>
        <div></div>

      </div>
      <div className="container">
        <div className="FileContentZ">
          <br></br>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <br></br>
          <Items filesList={docfilesList}></Items>
        </div>
      </div>
    </>
  );
}
