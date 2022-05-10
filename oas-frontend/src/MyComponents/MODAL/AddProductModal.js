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

export default function AddProductModal(props) {

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

    const [name,setName] = React.useState();
    const [basePrice,setBasePrice] = React.useState();
    const [productImage,setProductImage] = React.useState();
    const [startingDate,setStartingDate] = React.useState();
    const [endingDate,setEndingDate] = React.useState();
    

    //sending product information to server
    const addProduct = () => {
        const formData = new FormData();
        formData.append('name',name);
        formData.append('basePrice',basePrice);
        formData.append('productImage',productImage);
        formData.append('startingDate',startingDate);
        formData.append('endingDate',endingDate);
        fetch("http://localhost:8000/product/addproduct/"+localStorage.getItem('user'),{
            method: 'POST',
            body: formData,
        })
        .then((result) => {
            result.json().then((resp)=>{
                if(resp.error != null)
                    console.log("Error!!");
                else{
                    console.warn(resp);
                    props.fetchProducts("I am Callledddddd");
                }   
                                
            })
        })
    }

    if (!props.open) return null

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div id="add-myModal" className="moda" role="dialog">
                <animated.div style={animation} >
                    <div ref={modalRef} onClick={closeModal}>   {/* to close the modal by clicking outside the modal */}
                        <div className="modal-dialog">

                            {/* <!-- Modal content--> */}
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Product</h4>
                                    <button type="button" className="close" onClick={props.onClose}>&times;</button>
                                </div>
                                <div className="modal-body">
                                        <div className="form-group">
                                            Product Image: <input type="file" className="form-control-file" name="productImage" onChange={(e)=>{setProductImage(e.target.files[0])}} required /><br />
                                            Product Name: <input className="form-control" type="text" name="name" onChange={(e)=>{setName(e.target.value)}}
                                                placeholder="Enter Product Name" /><br />
                                            Base Price: <input className="form-control" type="number" name="basePrice"
                                                placeholder="Enter Base Price" onChange={(e)=>{setBasePrice(e.target.value)}} /><br />
                                            Starting Auction Time: <input type="text" name="startingDate" onChange={(e)=>{setStartingDate(e.target.value)}} /><br /><br />
                                            Ending Auction Time: <input type="text" name="endingDate" onChange={(e)=>{setEndingDate(e.target.value)}}/>
                                        </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit"  onClick={()=>{props.onClose();addProduct();props.fetchProducts();}} className="bt">Add</button>
                                    <button type="button" className="bt" onClick={props.onClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </animated.div>
            </div>
        </>,
        document.getElementById('addModal')
    )
}
