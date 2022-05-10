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

export default function DeleteBidModal(props) {

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

    const deleteBid = () => {
        fetch("http://localhost:8000/bid/deletebid/"+props.bid._id,{
            method: 'DELETE'
        })
        .then((result) => {
            result.json().then((resp)=>{
                console.warn(resp);
                props.fetchBids();
            })
        })
    }

    if (!props.open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div id="delete-myModal" className="moda" role="dialog" ref={modalRef} onClick={closeModal}>
                <animated.div style={animation} >
                    
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Delete Bid</h4>
                                    <button type="button" className="close" onClick={props.onClose}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    Are you sure to delete <b><u>{props.bid.productId.name}? </u></b>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="bt" onClick={()=>{deleteBid();props.onClose()}}>Delete</button>
                                    <button type="button" className="bt" onClick={props.onClose}>Close</button>
                                </div>
                            </div>
                        </div>
                </animated.div>
            </div>
        </>,
        document.getElementById('deleteBid')
    )
}
