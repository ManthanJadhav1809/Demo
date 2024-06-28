import React from 'react';
import Navbar from './Navbar';
// import '../styles/layout.css';

const Layout = ({ user, onLogout, children }) => {
    return (
        <div>
            <Navbar user={user} onLogout={onLogout} />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
