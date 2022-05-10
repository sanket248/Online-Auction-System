import './CSS/Navbar.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.css'; 
import 'react-bootstrap';
import Modal from './MODAL/ChangeProfileModal';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';


function Navbar(props) {

    const [show, setShow]=React.useState(false);   //to open CHNAGE PROFILE and LOGOUT box
    const [showModal, setShowModal] = React.useState(false)    //to show CHANGE PROFILE modal

    function logout() {
        localStorage.clear();
        props.changeIsLoggedIn();
    }

    const [user, setUser] = React.useState([])
    function fetchUser(){
        const url = 'http://localhost:8000/user/getuser/'+localStorage.getItem('user');
        fetch(url).then(response => response.json())
            .then(response => {
                if (response.error != null)
                    console.log("No User is Fetched !!")
                else{
                    setUser(response)
                    console.warn(user)
                    console.log("hiiiiiiiiiiiiiiiiiiihreardgarsdg")
                }
            })
    }
    useEffect(() => {
        fetchUser()
    },[])

    return (
        
        <div className="Navbar" id="nav" >
            <div >
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                </link>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css">
                </link>
            </div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-black py-0 px-0"
                style={{position: "fixed", z: "1", width: "100%", height:"55px"}} >
                <Link to="/"className="navbar-brand" style={{fontFamily: "snap itc"}}>BidIt</Link>
                <span className="v-line"></span>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" >
                        <li className="nav-item" > <Link to="/" className="nav-link" >Home</Link> </li>
                        <li className="nav-item"> <Link to="/home/auctions" className="nav-link" >Auctions</Link> </li>
                        <li className="nav-item" style={{width:"121px"}}> <Link to="/home/myproducts" className="nav-link">My Products</Link> </li>
                        <li className="nav-item" style={{width:"95px"}}> <Link to="/home/mybids" className="nav-link">My Bids</Link> </li>
                        <li className="nav-item" style={{width:"98px"}}> <Link to="/home/aboutus" className="nav-link" >About Us</Link> </li>
                        </ul>
                        <ul className="userLogin" >
                        {
                            props.isLoggedIn ?
                            <li className="nav-item dropdown " >
                                <button class="nav-link dropdown-toggle"  id="navbardrop" type="button" style={{color:"white"}} onClick={()=>setShow(!show)} >User</button>
                                <div className={"dropdown-men"} style={ show?{display:"block"}:{display:"none"}}   >
                                    <button className="bt w-100 drop-item" type="button" onClick={()=>{ setShowModal(true); setShow(false) }} >Change Profile</button>
                                    <button onClick={logout}  className="drop-item">Logout</button>
                                </div>
                            </li>
                            :
                            <Link type="button" className="userLogin nav-link login glyphicon glyphicon-log-in" style={{color:"white",width:"150px"}} to="/login" ><b><u>Login Here</u></b></Link>
                        }
                            
                    </ul>
                </div>
            </nav>
            
            {/* calling Modal component */}
            <Modal open = {showModal}  onClose={() => setShowModal(false)} user={user} > </Modal>

        </div>
    );  
}

export default Navbar;
