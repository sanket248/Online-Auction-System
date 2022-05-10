import React from 'react'
import {Route,Switch} from 'react-router-dom';
import Auctions from './MyComponents/Auctions';
import Aboutus from './MyComponents/Aboutus';
import MyProducts from './MyComponents/MyProducts';
import Home from './MyComponents/Home';
import Login from './MyComponents/Login';
import Registration from './MyComponents/Registration';
import MyBids from './MyComponents/MyBids';
import { useState,useEffect } from 'react';

export default function App2() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    function changeIsLoggedIn() {
        setIsLoggedIn(false)
    }

    

    const [user, setUser] = React.useState([])
    function getUser(user){
        setUser(user)
        console.log(user)
    }

    const [userdata, setUserdata] = React.useState([])
    // useEffect(() => {
    //     const url = 'http://localhost:8000/user/getuser/'+localStorage.getItem('user');
    //     fetch(url).then(response => response.json())
    //         .then(response => {
    //                 setUserdata(response)
    //                 console.log(response.name)
                
    //         })
    // }, [])

    useEffect(() => {
        if(localStorage.getItem('user') != null)
            setIsLoggedIn(true)
        else
            setIsLoggedIn(false)
    })

    return (
        <>
        <div>
            <Switch>
                <Route exact path="/" component={()=><Home changeIsLoggedIn={changeIsLoggedIn} isLoggedIn={isLoggedIn} user={user}/>} /> 
                <Route path="/home/auctions" component={()=><Auctions changeIsLoggedIn={changeIsLoggedIn} isLoggedIn={isLoggedIn} user={user}/>} />
                <Route path="/home/myproducts" component={()=><MyProducts changeIsLoggedIn={changeIsLoggedIn} isLoggedIn={isLoggedIn} user={user}/>} />
                <Route path="/home/aboutus" component={()=><Aboutus changeIsLoggedIn={changeIsLoggedIn} isLoggedIn={isLoggedIn} user={user}/>}/>
                <Route path="/home/mybids" component={()=><MyBids changeIsLoggedIn={changeIsLoggedIn} isLoggedIn={isLoggedIn} user={user}/>}/>
                <Route path="/login" component={()=><Login changeIsLoggedIn={changeIsLoggedIn} isLoggedIn={isLoggedIn} getUser={getUser} />} />
                <Route path="/registration" component={()=><Registration changeIsLoggedIn={changeIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
                {/* <Route component={Error} /> */}

            </Switch>            
       </div>
       </>
    )
}
