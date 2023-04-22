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
                src='https://www.urbanavenues.in/wp-content/uploads/2022/08/Small-logo.jpg' />
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