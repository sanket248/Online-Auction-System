import '../CSS/Navbar.css';
import React, { useRef } from "react";
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

export default function EditBidModal(props) {

    // following is modal animation
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

    const [price,setPrice] = React.useState();

    const editBid = () => {
        let data = {price}
        fetch("http://localhost:8000/bid/editbid/"+props.bid._id,{
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
                console.log(props.bid._id);
                props.fetchBids();
            })
            
        })
    }


    if (!props.open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div id="myModal" className="moda" role="dialog">
                <animated.div style={animation} >
                    <div ref={modalRef} onClick={closeModal}>   {/* to close the modal by clicking outside the modal */}
                        <div className="modal-dialog">

                            {/* <!-- Modal content--> */}
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">{props.bid.productId.name}</h4>
                                    <button type="button" className="close" onClick={props.onClose}>&times;</button>
                                </div>

                                <div className="modal-body">
                                    <center><img className="card-img-top" style={{ width: "250px", height: "200px" }}
                                        src={"http://localhost:8000/"+props.bid.productId.productImage}></img>
                                    </center>
                                    <h5 style={{ display: "inline" }}>Your Bid Price:</h5>
                                    <h6 style={{ display: "inline", color: "rgb(255, 0, 0)" }}>&#8377;{props.bid.price}</h6>
                                    <br />
                                    <h5 style={{ display: "inline" }}>Maximum Bid:</h5>
                                    <h6 style={{ display: "inline", color: "rgb(255, 0, 0)" }}>&#8377;{props.bid.productId.maxBid}</h6>
                                    <br />
                                    <h5>New Bid price:</h5>
                                    <div className="md-form">
                                        <input type="number" className="form-control" onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter your New Bid price" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="bt" onClick={()=>{editBid();props.onClose()}}>Update</button>
                                    <button type="button" className="bt" onClick={props.onClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </animated.div>
            </div>
        </>,
        document.getElementById('editBid')
    )
}
