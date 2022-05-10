import React, { Component } from 'react'
import './CSS/Home.css';
import Navbar from './Navbar';
import Footer from './Footer';
import h1 from '../Images/home1.jpg';
import h2 from '../Images/home2.jpg';
import h3 from '../Images/home3.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';


export default function Home(props) { 

    return (
        <div >

            <Navbar changeIsLoggedIn={props.changeIsLoggedIn} isLoggedIn={props.isLoggedIn} user={props.user}/><br/><br/>

            <Carousel style={{marginTop:"4px"}} controls={false} fade={true} pause={false}>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100 image"
                        src={h1}
                        alt="First slide"
                    />
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100 image"
                        src={h2}
                        alt="Second slide"
                    />
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100 image"
                        src={h3}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <Footer />
        </div>
    )
}


