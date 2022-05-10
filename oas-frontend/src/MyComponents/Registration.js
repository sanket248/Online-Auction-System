import React from 'react'
import { Link } from 'react-router-dom';
import './CSS/Navbar.css';
import './CSS/Form.css';

const alertFun = ()=>{
    alert("Please Log in to get access to Home page");
}

export default function Registration() {

    const [msg, setMsg] = React.useState("");
    const [name,setName] = React.useState();
    const [email,setEmail] = React.useState();
    const [phone,setPhone] = React.useState();
    const [password,setPassword] = React.useState();
    const [address,setAddress] = React.useState();

    function saveUser() {
        let userData = {name, email, phone, password, address}
        fetch("http://localhost:8000/user/signup",{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        })
        .then((result) => {
            result.json().then((resp)=>{
                console.warn(resp);
                if(resp.error == null)
                    setMsg(resp.message);
                else
                    setMsg(resp.error.message);
            })
            
        })
        
    }

    return (
        <>
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            </div>
            <div>
                <nav className="navbar navbar-inverse navbar-expand-sm navbar-dark bg-black py-0 px-0" style={{ position: "fixed", zIndex: "1", width: "100%" }}>
                    <div className="container-fluid">
                        <ul className="navbar-header">
                        <a onClick={alertFun} className="navbar-brand" style={{ fontFamily: "snap itc" }}>BidIt</a>
                        </ul>
                        <ul  className="nav navbar-nav" style={{marginRight:"10px"}}>
                            <li><Link to="/registration" ><span  className="glyphicon glyphicon-user right"></span> Sign Up</Link></li>
                            <li><Link to="/login"><span className="glyphicon glyphicon-log-in "></span> Login</Link></li>
                        </ul>
                    </div>
                </nav>
                <br/><br/><br/>
                <center><div style={{color:"white", color:"white"}}><u><h2>{msg}</h2></u></div></center>
                
                <div className="form-popup" id="myForm">
                    <div className="form-container">
                        <h1 style={{ textAlign: "center" }}>Registration</h1>

                        Name
                        <input type="text" placeholder="Enter Full Name" name="name" onChange={(e)=>{setName(e.target.value)}} required />

                        <div>Email</div>
                        <input type="email" placeholder="Enter Email" name="email" onChange={(e)=>{setEmail(e.target.value)}} required />

                        <div>Mobile no.</div>
                        <input type="number" placeholder="Enter Mobile Number" name="phone" onChange={(e)=>{setPhone(e.target.value)}} required />

                        <div>Address</div>
                        <input type="text" placeholder="Enter Address" name="address" onChange={(e)=>{setAddress(e.target.value)}} required />

                        <div>Password</div>
                        <input type="password" placeholder="Enter Password" name="password" onChange={(e)=>{setPassword(e.target.value)}} required />

                        <button type="submit" className="btn" onClick={saveUser}>REGISTER</button>
                        <b style={{ fontSize: "medium" }}>EXISTING USER ?</b>&nbsp;<b><Link style={{ color: "rgb(231, 235, 11)", fontSize: "medium" }}
                            to="/login">LOGIN</Link></b>
                    </div>
                </div>
            </div>
        </>
    )
}
