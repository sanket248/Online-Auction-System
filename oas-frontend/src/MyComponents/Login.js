import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import './CSS/Navbar.css';
import './CSS/Form.css';

export default function Login(props) {
    const [email,setEmail] = React.useState();
    const [password,setPassword] = React.useState();
    const [msg, setMsg] = React.useState();
    const [user, setUser] = React.useState();



    function loginUser() {
        let userData = {email, password}
        fetch("http://localhost:8000/user/login",{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        })
        .then((result) => {
            result.json().then((resp)=>{
                if(resp.error != null)
                    setMsg(resp.error.message);
                else{
                    setUser(resp);
                    console.log(resp)
                    props.getUser(resp);
                    localStorage.setItem('user',resp._id)
                    // props.changeIsLoggedIn()
                }                 
            })
            
        })
    }

    if(user != null)
        return <><Redirect to="/"></Redirect></>

    return (
        <>
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            </div>
            <div>
                <nav className="navbar navbar-inverse navbar-expand-sm navbar-dark bg-black py-0 px-0" style={{ position: "fixed", zIndex: "1", width: "100%" }}>
                    <div className="container-fluid">
                        <ul className="navbar-header">
                            <Link to="/" className="navbar-brand" style={{ fontFamily: "snap itc" }}>BidIt</Link>
                        </ul>
                        <ul  className="nav navbar-nav" style={{marginRight:"10px"}}>
                            <li><Link to="/registration" ><span  className="glyphicon glyphicon-user right"></span> Sign Up</Link></li>
                            <li><Link to="/login"><span className="glyphicon glyphicon-log-in "></span> Login</Link></li>
                        </ul>
                    </div>
                </nav>
                <br/><br/>
                <center><div style={{color:"white", color:"white"}}><u><h2>{msg}</h2></u></div></center>
                
                <div className="form-popup" id="myForm">
                    <div className="form-container">
                        <h1 style={{textAlign: "center", opacity: "1"}}>Login</h1>

                        <div>Email</div>
                        <input type="email" placeholder="Enter Email" name="email" onChange={(e) => {setEmail(e.target.value)}} required />

                        <div>Password</div>
                        <input type="password" placeholder="Enter Password" name="password" onChange={(e) => {setPassword(e.target.value)}} required />

                        <button type="submit" className="btn" onClick={loginUser}>LOGIN</button>
                        <b style={{fontSize: "medium"}}>NEW USER?</b>&nbsp; <b><Link to="/registration" style={{color: "rgb(231, 235, 11)", fontSize: "medium"}}
                            >SIGNUP</Link></b>
                    </div>
                </div>
            </div>
        </>
    )
}
