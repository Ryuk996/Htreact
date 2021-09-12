import "./App.css";
import "./login.css";
import React ,{useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import env from "./settings"

function Register() {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");
    const history = useHistory()
    let handleSubmit = async(e) => {
        e.preventDefault()
        console.log({firstName,userName,password,confirmPassword})
        try {
            await axios.post(`${env.api}/register`,{firstName,lastName,userName,password})
            history.push("/login")
        } catch (error) {
            console.log(error)
        }
        // await axios.post(`${env.api}/register`,{userName,password})
        
    }
    return (
        <>
        <body class="text-center">
        <main class="form-signin">
           
            <form onSubmit={(e) => {
                    handleSubmit(e);
                }}
                >
                <img class="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
                <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
                
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput"  placeholder="FirstName" value={firstName} onChange={e =>setFirstname(e.target.value)} />
                    <label for="floatingInput">First Name</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput"  placeholder="LastName" value={lastName} onChange={e =>setLastname(e.target.value)} />
                    <label for="floatingInput">Last Name</label>
                </div>
                <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput"  placeholder="name@example.com" value={userName} onChange={e =>setUsername(e.target.value)} />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password" 
                        value={password} onChange={e =>setPassword(e.target.value)}
                    />
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating">
                    <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={confirmPassword} onChange={e =>setConfirmpassword(e.target.value)}
                    />
                    <label for="floatingPassword">Confirm Password</label>
                </div>

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <input
                    class="w-100 btn btn-lg btn-primary"
                    type="submit"
                    value="Sign up"
                />
                <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
        </main>
    </body>
</>
    )
}

export default Register
