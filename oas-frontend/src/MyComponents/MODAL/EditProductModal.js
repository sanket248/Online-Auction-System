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

export default function EditProductModal(props) {

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

    const [name,setName] = React.useState(props.product.name);
    const [basePrice,setBasePrice] = React.useState(props.product.basePrice);
    const [productImage,setProductImage] = React.useState(props.product.productImage);
    const [startingDate,setStartingDate] = React.useState(props.product.startingDate);
    const [endingDate,setEndingDate] = React.useState(props.product.endingDate);

    const editProduct = () => {
        const formData = new FormData();
        formData.append('name',name);
        formData.append('basePrice',basePrice);
        formData.append('productImage',productImage);
        formData.append('startingDate',startingDate);
        formData.append('endingDate',endingDate);
        fetch("http://localhost:8000/product/editproduct/"+props.product._id,{
            method: 'PUT',
            body: formData,
        })
        .then((result) => {
            result.json().then((resp)=>{
                console.warn(resp);
                props.fetchProducts();
            })
            
        })
    }

    if (!props.open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div id="edit-myModal" className="moda" role="dialog">
                <animated.div style={animation} >
                    <div ref={modalRef} onClick={closeModal}>   {/* to close the modal by clicking outside the modal */}
                        <div className="modal-dialog">
                            {/* <!-- Modal content--> */}
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Product</h4>
                                    <button type="button" className="close" onClick={props.onClose}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            Product Image: <input type="file" className="form-control-file" onChange={(e)=>{setProductImage(e.target.files[0])}} required /><br />
                                            Product Name: <input className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} type="text"
                                                placeholder="Enter Product Name"  /><br />
                                            Base Price: <input className="form-control" type="number" value={basePrice}
                                                placeholder="Enter Base Price"  onChange={(e)=>{setBasePrice(e.target.value)}} /><br />
                                            Starting Auction Date: <input className="form-control" value={startingDate.split("T")[0]} type="text" placeholder="yyyy-mm-dd" onChange={(e)=>{setStartingDate(e.target.value)}} /><br /><br />
                                            Ending Auction Date: <input className="form-control" value={endingDate.split("T")[0]} type="text" placeholder="yyyy-mm-dd" onChange={(e)=>{setEndingDate(e.target.value)}}/>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="bt" onClick={()=>{props.onClose();editProduct()}}>Edit</button>
                                    <button type="button" className="bt" onClick={props.onClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </animated.div>
            </div >
        </>,
        document.getElementById('editModal')
    )
}
