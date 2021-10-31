import Items from "./Items";
import React, { useEffect, useState,useContext } from "react"
import axios from "axios";
import env from "./settings";
import { useHistory } from "react-router";
import "./searchbar.css"

import {showErrMsg, showSuccessMsg} from './Notifications/Notification'


export default function Searchfiles(props) {
  const token = window.localStorage.getItem("firstlogin");
  const history = useHistory();
  const initialState = {
    err: '',
    success: ''
  }
  const [user, setUser] = useState(initialState)
  const { err, success} = user
  const [search,setSearch] = useState("")
  const [searchedFiles,setSearchedfiles] = useState([])

  let handleSubmit = async(e) => {
    e.preventDefault()
    setUser({user, err: '', success: ''})
    
    try {
        let searchData = await axios.post(`${env.api}/file/search`,{search}, {
          headers: {Authorization: token}
      })
        setSearchedfiles(searchData.data)
        if(searchData.data==''){
        setUser({...user, err: "No results found", success: ''})
        }
        
    } catch (err) {
        err.response.data.msg &&
        setUser({...user, err:err.response.data.msg , success: ''})
    }
   
    
}

  return (
    <>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="TitleZ">Search Files</h1>
                    
      </div>
      <div className="container">
      <div className="FileContentZ">
      {/* <div></div> */}
        <br></br>
        <div>
          <form onSubmit={(e) => { handleSubmit(e); }}>
            <div class="search-container">
              <input type="text" name="search" placeholder="Search..." value={search} onChange={e =>setSearch(e.target.value)} class="search-input"/>
                  <button type="submit"  class="search-btn">
                    <i class="fas fa-search"></i>      
                  </button>
            </div>
          </form>
        </div>
        {/* <div className="FileContentZ"> */}
      <br></br>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        <br></br>
        <Items filesList={searchedFiles}></Items>
      </div>
      </div>
    </>
  );
}
