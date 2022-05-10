import '../CSS/Navbar.css';
import React, { useRef } from "react";
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import ReactDom from 'react-dom';
import ProductBox from '../ProductBox';

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}

export default function BidModal(props) {

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

    const[price,setPrice] = React.useState();
    function addBid() {
        let bidData = {price}
        fetch("http://localhost:8000/bid/addbid/"+localStorage.getItem('user')+"/"+props.product._id,{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(bidData)
        })
        .then((result) => {
            result.json().then((resp)=>{
                console.warn(resp);
                props.fetchLiveProducts();
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
                                    <h4 className="modal-title">{props.product.name}</h4>
                                    <button type="button" className="close" onClick={props.onClose}>&times;</button>
                                </div>

                                <div className="modal-body">
                                    <center><img className="card-img-top" style={{ width: "250px", height: "200px" }}
                                        src={"http://localhost:8000/"+props.product.productImage}></img>
                                    </center>
                                    <h5 style={{ display: "inline" }}>Base Price:</h5>
                                    <h6 style={{ display: "inline", color: "rgb(255, 0, 0)" }}>&#8377;{props.product.basePrice}</h6>
                                    <br />
                                    <h5 style={{ display: "inline" }}>Maximum Bid:</h5>
                                    <h6 style={{ display: "inline", color: "rgb(255, 0, 0)" }}>&#8377;{props.product.maxBid}</h6>
                                    <br />
                                    <h5>Bid price:</h5>
                                    <div className="md-form">
                                        <input type="number" className="form-control" placeholder="Enter your Bid price" onChange={(e)=>{setPrice(e.target.value)}} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="bt" onClick={()=>{props.onClose();addBid()}}>Place a bid</button>
                                    <button type="button" className="bt" onClick={props.onClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </animated.div>
            </div>
        </>,
        document.getElementById('bidModal')
    )
}
