import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () =>
{
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () =>
    {
        //console.warn("log out");
        localStorage.clear();
        navigate("/signup");
    }
    return (
        <div>
            <img
                alt='UA Logo'
                className="logo"
                src='https://scontent.fdel21-1.fna.fbcdn.net/v/t39.30808-1/291207394_402128965268456_2487719165515053027_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=c6021c&_nc_ohc=XgwMuyHU6CoAX-XjsiI&_nc_ht=scontent.fdel21-1.fna&oh=00_AfCjDaRjBR1MrXQ7n90P3NC8jzc8OwFd6HZ5B_AjxFHNEg&oe=64417967' />
            {
                auth ?
                    <ul className="nav-ul">
                        <li><Link to="/" >Products</Link></li>
                        <li><Link to="/add" >Add Products</Link></li>
                        <li><Link to="/update" >Update Products</Link></li>
                        <li><Link to="/profile" >Profile</Link></li>
                        <li><Link onClick={logout} to="/signup" >Logout ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li><Link to="/signup" >Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }



            {/* <ul className="nav-ul">
                <li><Link to="/" >Products</Link></li>
                <li><Link to="/add" >Add Products</Link></li>
                <li><Link to="/update" >Update Products</Link></li>
                {/* <li><Link to="/logout" >Logout</Link></li> 
            <li><Link to="/profile" >Profile</Link></li> */}
            {/* <li>
                    {auth ? <Link onClick={logout} to="/signup" >Logout</Link> : <Link to="/signup" >Sign Up</Link>}
                </li>
                <li><Link to="/login">Login</Link></li> */}
            {/*  {
                    auth ? <li><Link onClick={logout} to="/signup" >Logout</Link></li>
                        : <><li><Link to="/signup" >Sign Up</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                } 
            </ul> */}
        </div >
    );
}
export default Nav;