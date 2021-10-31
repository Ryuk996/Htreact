import React, { useContext } from "react"
import axios from 'axios';
import env from "./settings"
import Searchcontext from "./Searchcontext";
import "./button.css"
import { useState, useEffect } from 'react'
// import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, useHistory, Route, Switch, Link } from "react-router-dom";

export default function Topbar() {
    const token = window.localStorage.getItem("firstlogin");
    // console.log(token)
    const history = useHistory()
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success } = user
    const [profName, setProfName] = useState([])
    const [search, setSearch] = useState("")
    const [searchedFiles, setSearchedfiles] = useState([])
    const [onsearch, setONSearch] = useState(false)


    useEffect(async () => {
        try {
            let profile = await axios.get(`${env.api}/user/getuser`,
                { headers: { Authorization: token } })
            setProfName([...profile.data])
            console.log(profile.data)

        } catch (error) {
            alert("*kindly replace directory with your file diectory to fetch data");
            console.log(error)
        }

    }, [])

    let handleSearch = async (e) => {
        // e.preventDefault()
        try {
            history.push("/sfiles")
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }

    }
    let toLogin = async () => {
        try {
            window.location.href = "/";
        } catch (error) {
            console.log(error)
        }
    }

    let handlelogout = async (e) => {
        // e.preventDefault()

        try {
            let logout = await axios.get(`${env.api}/user/logout`)
            window.localStorage.removeItem('firstlogin')
            setUser({ ...user, err: '', success: logout.data.msg })
            window.location.href = "/";
            // history.push('/')
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
            window.location.href = "/";
        }

    }

    return (
        <>

            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 fixed-top shadow">


                <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

                <div class="button" onClick={() => handleSearch()}>
                    Search files
                    < i class="fa fa-search"></i>
                </div>


                <ul class="navbar-nav ml-auto">

                    <li class="nav-item dropdown no-arrow mx-1">
                        <a class="nav-link dropdown-toggle" onClick={() => toLogin()} id="alertsDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-sign-in-alt"></i>
                            {/* <i class="fas fa-bell fa-fw"></i> */}

                            <span className="LoginIconZ">Login</span>
                        </a>


                    </li>


                    <li class="nav-item dropdown no-arrow mx-1">
                        <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-envelope fa-fw"></i>

                            <span class="badge badge-danger badge-counter">7</span>
                        </a>


                    </li>

                    <div class="topbar-divider d-none d-sm-block"></div>


                    <li class="dropdown" >
                        {profName.map((user) => {
                            return <a class="link " id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" key={user._id}>
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{user.firstName}</span>
                                <img class="profile-pic"
                                    src={user.profilePic} />
                            </a>

                        })}
                        <div class="dropdown-itemd">
                            <Link to="/uploadPic">
                                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-200"></i>
                                Profile
                            </Link>
                            <a onClick={() => handlelogout()}>
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>

                    </li>

                </ul>

            </nav>

        </>
    )
}

