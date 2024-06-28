// src/components/Register.js
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phonenumber, setPnumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setrePassword] = useState('');
    const [role, setRole] = useState('buyer'); // default role is buyer
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors

        if (password !== repassword) {
            setError("Passwords do not match");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        if (!fname || !lname || !email || !password || !repassword) {
            setError("All fields are required");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password,);
            const user = userCredential.user;

            // Save user details to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: role,
                fname: fname,
                lname: lname,
            });

            alert('Registration Successful');
            navigate('/dashboard');
        } catch (error) {
            console.error("Error registering", error);
            setError(error.message);
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input type='text' placeholder='First name' value={fname} onChange={(e) => setFname(e.target.value)} />

                <label>Last Name</label>
                <input type='text' placeholder='Last name' value={lname} onChange={(e) => setLname(e.target.value)} />
                
                <label>Role  </label>
                <select onChange={(e) => setRole(e.target.value)} value={role}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <br></br>
                <br></br>
                <label>Email</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Phone Number</label>
                <input type='text' placeholder='Phone number' value={phonenumber} onChange={(e) => setPnumber(e.target.value)} />

                <label>Password</label>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label>Re-enter Password</label>
                <input type="password" placeholder="Re-enter Password" value={repassword} onChange={(e) => setrePassword(e.target.value)} />

                
                <br></br>
                {error && <span className="error-message" style={{ color: "red" }}>{error}</span>}

                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Register;
