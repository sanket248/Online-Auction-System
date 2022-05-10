import './CSS/ProductBox.css';
import 'bootstrap/dist/css/bootstrap.css';
import './CSS/Navbar.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import BidModal from './MODAL/BidModal';
import EditProductModal from './MODAL/EditProductModal';
import DeleteProductModal from './MODAL/DeleteProductModal';
import Login from './Login';
import CountDownTimer from './CountDownTimer';

const alertFun = () => {
    <Login />
    alert("Please Log in to access Auctions!!");
}

function ProductBox(props) {

    const [bidShowModal, setBidShowModal] = React.useState(false)    //to show CHANGE PROFILE modal

    const [editShowModal, setEditShowModal] = React.useState(false)
    const [deleteShowModal, setDeleteShowModal] = React.useState(false)

    const time = { days: 2, hours: 1, minutes: 20, seconds: 40 }

    return (
        <>
            <div className="ProductBox" >
                <div style={{ width: "80%", height: "40%", marginBottom: "30px" }}>
                    <div className="card" style={{ backgroundColor: "rgb(86, 90, 90)", color: "white" }}>
                        <img className="res card-img-top"
                            src={"http://localhost:8000/" + props.value.productImage} />

                        <div className="card-body">
                            <h5><span style={{ color: "black" }}>Name : </span><b>{props.value.name}</b> </h5>
                            <div className="d-flex flex-row my-2">
                                <div>
                                    <span style={{ color: "black" }}>Base Price : </span> &#8377;{props.value.basePrice}<br />
                                    <span style={{ color: "black" }}>Maximum Bid : </span> &#8377;{props.value.maxBid}
                                </div>
                            </div>


                            {
                                props.isMyProduct ?
                                    <>
                                        <button className="bt" onClick={props.isLoggedIn ? () => { setEditShowModal(true) } : alertFun}>Edit</button>{' '}&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button className="bt" onClick={props.isLoggedIn ? () => { setDeleteShowModal(true) } : alertFun}>Delete</button>
                                    </>
                                    :
                                    props.upcoming ?
                                        <>
                                            <span style={{ color: "black" }}>Starting Date : </span>{(props.value.startingDate.split("T"))[0]}
                                        </>
                                        :
                                        <>
                                            <CountDownTimer endingDate={props.value.endingDate} />
                                            <button className="bt w-100" onClick={props.isLoggedIn ? () => { setBidShowModal(true) } : alertFun} >Bid</button>
                                        </>
                            }
                        </div>

                    </div>
                </div>
                <BidModal open={bidShowModal} onClose={() => setBidShowModal(false)} product={props.value} fetchLiveProducts={props.fetchLiveProducts}> </BidModal>

                <EditProductModal open={editShowModal} onClose={() => setEditShowModal(false)} product={props.value} fetchProducts={props.fetchProducts}> </EditProductModal>
                <DeleteProductModal open={deleteShowModal} onClose={() => setDeleteShowModal(false)} product={props.value} fetchProducts={props.fetchProducts}> </DeleteProductModal>
            </div>

        </>
    );
}

export default ProductBox;




