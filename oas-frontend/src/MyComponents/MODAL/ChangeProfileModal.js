import '../CSS/Navbar.css';
import React, { useRef,useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import ReactDom from 'react-dom';


const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}

export default function ChangeProfileModal(props) {

    // following is for modal animation
    const animation = useSpring({
        config: {
            duration: 300
        },
        opacity: props.open ? 1 : 0,
        transform: props.open ? 'tarnslateY(0%)' : 'translateY(-100%)'
    })

    const modalRef = useRef();
    const closeModal = e => {
        if (modalRef.current === e.target) {
            props.onClose();
        }
    }


    const [name,setName] = React.useState(props.user.name);
    const [password,setPassword] = React.useState(props.user.password);
    const [phone,setPhone] = React.useState(props.user.phone);
    const [address,setAddress] = React.useState(props.user.address);

    const editUser = () => {
        let data = {name,password,phone,address}
        fetch("http://localhost:8000/user/edit/"+localStorage.getItem('user'),{
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then((result) => {
            result.json().then((resp)=>{
                console.warn(resp);
                // console.log(props.bid._id);
            })
            
        })
    }

    

    if (!props.open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div id="profile-Modal" className="moda" role="dialog" >

                <animated.div style={animation} >
                    <div ref={modalRef} onClick={closeModal}>   {/* to close the modal by clicking outside the modal */}
                        <div className="modal-dialog">

                            {/* <!-- Modal content--> */}

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Change Profile</h4>
                                    <button type="button" className="close" onClick={props.onClose}>&times;</button>
                                </div>

                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            Name: <input className="form-control" type="text" placeholder="Enter your Name" value={name} onChange={(e)=>{setName(e.target.value)}} required/><br></br>
                                            Password: <input className="form-control" type="text" placeholder="Enter your new Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/><br></br>
                                            Mob. No.: <input className="form-control" type="number" placeholder="Enter your mobile no." value={phone} onChange={(e)=>{setPhone(e.target.value)}} required/><br></br>
                                            Address: <input className="form-control" type="text" placeholder="Enter your address" value={address} onChange={(e)=>{setAddress(e.target.value)}} required/><br></br>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="bt" onClick={()=>{props.onClose();editUser()}}>Confirm</button>
                                    <button type="button" className="bt" onClick={props.onClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </animated.div>
            </div>
        </>,
        document.getElementById('changeProfileModal')
    )
}
