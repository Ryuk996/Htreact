import React from 'react'

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { useState } from 'react'
import "./login.css";
import "./App.css";
import axios from 'axios';
import env from "./settings"
import Sidebar from "./sidebar"
import Topbar from "./topbar"
import Dashboard from './dashboard';
import CreateFile from './Createfile';
import Searchfiles from './Searchfiles';
import { SearchProvider } from './Searchcontext';
import DocumentFiles from './FileComponent/DocumentFiles';
import Mediafiles from './FileComponent/MediaFiles';
import ImageFiles from './FileComponent/ImageFile';
import UpdateUser from './updateUser';

function Drive() {
    let history = useHistory()
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user
   
    return (
        <>
        <Router>
        <div>
          <div id="wrapper">
            <Sidebar></Sidebar>
            <div id="content-wrapper" class="d-flex flex-column">
              <div id="content">
                <Topbar></Topbar>
                <div class="container-fluid">
                  <Switch>
                    <Route path="/filedrive" component={Dashboard} exact={true} />
                    <Route path="/create-file" component={CreateFile} exact={true} />
                    <Route path="/sfiles" component={Searchfiles} exact={true} />
                    <Route path="/docfiles" component={DocumentFiles} exact={true} />
                    <Route path="/mediafiles" component={Mediafiles} exact={true} />
                    <Route path="/imgfiles" component={ImageFiles} exact={true} />
                    <Route path="/uploadPic" component={UpdateUser} exact={true} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
      </>
     
    )
        
}

export default Drive
