import React from 'react'
import ProductBox from './ProductBox'
import Navbar from './Navbar';
import Footer from './Footer';
import AddProductModal from './MODAL/AddProductModal';
import Login from './Login';
import './CSS/MyProduct.css';
import { useEffect } from 'react';

const alertFun = () => {
    <Login />
    alert("Please Log in to access Auctions!!");
}

export default function MyProducts(props) {
    const [addModal, setAddModal] = React.useState(false)

    //fetching data from API
    const [products, setProducts] = React.useState([])
    const [msg, setMsg] = React.useState()

    function fetchProducts(e) {
        const url = 'http://localhost:8000/product/getall/' + localStorage.getItem('user');
        fetch(url).then(response => response.json())
            .then(response => {
                if (response.error != null)
                    setMsg("No Product is Added !!")
                else{
                    setProducts(response)
                    console.log(e)
                }
            })
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    const productList = products.map((product) =>
        <ProductBox isLoggedIn={props.isLoggedIn} key={product._id.toString()} value={product} isMyProduct={true} fetchProducts={fetchProducts} />
    );

    return (
        <div>
            <Navbar changeIsLoggedIn={props.changeIsLoggedIn} isLoggedIn={props.isLoggedIn} user={props.user} /><br /><br />
            <button className="bt buttonBox" onClick={props.isLoggedIn ? () => { setAddModal(true) } : alertFun}>Add Product</button>
            <AddProductModal open={addModal} onClose={() => setAddModal(false)} fetchProducts={fetchProducts}> </AddProductModal>

            {
                props.isLoggedIn ?
                    <>
                        {
                            msg != null ?
                                <h2 style={{ textAlign: "center", color: "white", marginTop: "200px" }}>{msg} <br/><br/><br/><br/><br/><br/></h2>
                                :
                                <>
                                    <section className="products" style={{ marginTop: "100px", marginLeft:"60px" }}>
                                        <div className="container-fluid">
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }} >
                                                {productList}
                                            </div>
                                        </div>
                                    </section>

                                </>

                        }
                        <br />
                        <Footer />
                    </>
                    :
                    <div style={{ marginTop: "120px" }}>
                        <p className="box"><br/><br/><center>LOGIN<br /><br/> and get access<br /><br/> to Add Your Own Product <br /><br/>in Auction product list<br/><br/></center></p>

                        <div style={{ marginTop: "60px" }}>
                            <Footer />
                        </div>
                    </div>

            }



        </div>
    )
}
