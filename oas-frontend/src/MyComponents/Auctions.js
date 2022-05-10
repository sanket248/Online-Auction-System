import './CSS/ProductBox.css';
import './CSS/Auctions.css';
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductBox from './ProductBox';

export default function Auctions(props) {

    const [upcoming, setUpcoming] = React.useState(false)    //to show CHANGE PROFILE modal   
    const [noUpcomingMsg, setNoUpcomingMsg] = React.useState()
    const [noLiveMsg, setNoLiveMsg] = React.useState()

    function fetchLiveProducts() {
        const url = 'http://localhost:8000/product/live';
        fetch(url).then(response => response.json())
            .then(response => {
                if (response.error != null)
                    setNoLiveMsg("No Live Product !!")
                else
                    setLiveProducts(response)
            })
    }

    //fetching data from API for live products
    const [liveProducts, setLiveProducts] = React.useState([])
    useEffect(() => {
        fetchLiveProducts();
    }, [])

    const LiveProductList = liveProducts.map((product) =>
        <ProductBox isLoggedIn={props.isLoggedIn} key={product._id.toString()} value={product} fetchLiveProducts={fetchLiveProducts} />
    );

    //fetching data from API for upcoming products
    const [upcomingProducts, setUpcomingProducts] = React.useState([])
    useEffect(() => {
        const url = 'http://localhost:8000/product/upcoming';
        fetch(url).then(response => response.json())
            .then(response => {
                if (response.error != null)
                    setNoUpcomingMsg("No Upcoming Product !!")
                else
                    setUpcomingProducts(response)
            })
    }, [])

    const UpcomingProductList = upcomingProducts.map((product) =>
        <ProductBox isLoggedIn={props.isLoggedIn} key={product._id.toString()} value={product} upcoming={true} />
    );

    return (
        <>
            <Navbar changeIsLoggedIn={props.changeIsLoggedIn} isLoggedIn={props.isLoggedIn} user={props.user} /><br /><br />


            <input type="checkbox" id="switch" />
            <div className="content">
                <label for="switch" onClick={() => { setUpcoming(!upcoming) }}>
                    <div className="toggle"></div>
                    <div className="names" >
                        <p className="text" > Live </p>
                        <p className="text" > Upcoming </p>
                    </div>
                </label>
            </div>
            <br />

            {
                <>
                    <div style={{ marginTop: "120px", marginLeft: "70px" }} > {upcoming ?
                        <>
                            {
                                noUpcomingMsg != null ?
                                    <h2 style={{ textAlign: "center", color: "white" }}>{noUpcomingMsg}<br /><br /><br /><br /><br /><br /><br /><br /> </h2>
                                    :
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr 1fr"
                                    }}>
                                        {UpcomingProductList}
                                    </div>
                            }


                        </>
                        :
                        <>
                            {
                                noLiveMsg != null ?
                                    <h2 style={{ textAlign: "center", color: "white" }}>{noLiveMsg}<br /><br /><br /><br /><br /><br /><br /><br /> </h2>
                                    :
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr 1fr"
                                    }}>
                                        {LiveProductList}
                                    </div>
                            }


                        </>

                    }
                        <br />
                    </div>
                    <Footer />
                </>

            }

        </>
    )
}
