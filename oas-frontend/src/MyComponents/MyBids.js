import React from 'react'
import ProductBox from './ProductBox'
import Navbar from './Navbar';
import Footer from './Footer';
import '../MyComponents/CSS/MyBids.css'
import BidModal from './MODAL/BidModal';
import { useEffect, useRef } from 'react';
import EditBidModal from './MODAL/EditBidModal';
import DeleteBidModal from './MODAL/DeleteBidModal';
import './CSS/ProductBox.css';


export default function MyBids(props) {

    const [editShowModal, setEditShowModal] = React.useState(false)
    const [deleteShowModal, setDeleteShowModal] = React.useState(false)
    const [bidData, setBidData] = React.useState()

    const editEvent = (product) => {
        setEditShowModal(true);
        setBidData(product);
    }

    const deleteEvent = (product) => {
        setDeleteShowModal(true);
        setBidData(product);
    }

    const [bids, setBids] = React.useState([])
    const [msg, setMsg] = React.useState()

    function fetchBids(){
        const url = 'http://localhost:8000/bid/allbid/'+localStorage.getItem('user');
        fetch(url).then(response => response.json())
            .then(response => {
                if (response.error != null)
                    setMsg("No Bid is Added !!")
                else
                    setBids(response)
            })
    }
    useEffect(() => {
        fetchBids();
    }, [])

    const bidList = bids.map((bid) =>
        <>        
            <tr style={{ textAlign: "center" }}>
                <td className="py-1"> <img style={{ width: "auto", height: "50px" }} src={"http://localhost:8000/" + bid.productId.productImage} /> </td>
                <td style={{ textAlign: "left" }}> {bid.productId.name} </td>
                <td>&#8377; {bid.productId.maxBid}</td>
                <td>&#8377; {bid.price}</td>
                <td>
                    <button className="bt" style={{backgroundColor:"gray",color:"black"}} onClick={() => { editEvent(bid) }} >Edit</button>{' '}
                    <button className="bt" style={{backgroundColor:"gray",color:"black"}} onClick={() => { deleteEvent(bid) }}>Delete</button>
                </td>
            </tr>
            <EditBidModal open={editShowModal} onClose={() => setEditShowModal(false)} key={bid._id.toString()} bid={bidData} fetchBids={fetchBids}> </EditBidModal>
            <DeleteBidModal open={deleteShowModal} onClose={() => setDeleteShowModal(false)} key={bid._id.toString()} bid={bidData} fetchBids={fetchBids}> </DeleteBidModal>
        </>
    );

    return (
        <div>
            <Navbar changeIsLoggedIn={props.changeIsLoggedIn} isLoggedIn={props.isLoggedIn} user={props.user} /><br /><br />
            {
                props.isLoggedIn ?
                    <>
                        <div className="padding" >
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card" style={{ background: "transparent" }}>
                                    <div className="card-body" >
                                        <div className="table-responsive" >
                                            <table className="table table-striped" >
                                                <thead>
                                                    <tr className="title" style={{ textAlign: "center", fontFamily: "Cooper" }}>
                                                        <th> Product </th>
                                                        <th style={{ textAlign: "left" }}> Name </th>
                                                        <th> Max Bid </th>
                                                        <th> Your Bid </th>
                                                        <th> Update </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        msg != null ?
                                                        <h2 className="message" style={{ color: "white" }}>{msg} </h2>
                                                        :
                                                        <>{bidList}</>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div style={{ marginTop: "120px" }}>
                        <p className="box"><br /><br/> <br/><br/><center>LOGIN<br /><br/> to participate in Auction<br/><br/></center></p>
                    </div>
            }
            <div style={{ marginTop: "260px" }}>
                <Footer />
            </div>
        </div>
    )
}
