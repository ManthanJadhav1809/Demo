import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Navbar = ({ user, onLogout }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user && user.uid) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setUserInfo(userDoc.data());
                    } else {
                        console.log("No such user!");
                    }
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            }
        };
        fetchUserInfo();
    }, [user]);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">MJ Rentify</Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        {userInfo && <div>{userInfo.fname} {userInfo.lname}{`(${userInfo.role})`}</div>}
                        <Link to="/dashboard">Dashboard</Link>
                        {userInfo && userInfo.role === 'seller' && (
                            <Link to="/add-property">Add Property</Link>
                        )}
                        <button onClick={onLogout} className="logout-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
