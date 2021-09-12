import React from 'react'
import {useState} from 'react'
import env from "./settings"
import "./login.css";
import "./App.css";
import axios from 'axios';
import {useHistory} from "react-router-dom"
function Login() {

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory()
    let handleSubmit = async(e) => {
        e.preventDefault()
        console.log({userName,password})
        try {
            let loginData= await axios.post(`${env.api}/login`,{userName,password})
            console.log(loginData)
            window.localStorage.setItem("app_token",loginData.data.token)

            // alert(loginData.data.message)
            history.push("/drive")
        } catch (error) {
            console.log(error)
        }
        // await axios.post(`${env.api}/register`,{userName,password})
        
    }
    return (
        <>
        {/* <h1>login</h1> */}
        <body class="text-center">
            <main class="form-signin">
                <form onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                    <img class="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
    
                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={userName} onChange={e =>setUsername(e.target.value)} />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} />
                        <label for="floatingPassword">Password</label>
                    </div>
    
                    <div class="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <input class="w-100 btn btn-lg btn-primary" type="submit" value="Login "/>
                    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        </body>
    </>
    )
}

export default Login
