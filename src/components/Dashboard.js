// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = ({ user }) => {
    const [properties, setProperties] = useState([]);
    const [interestedPropertyId, setInterestedPropertyId] = useState(null);
    const [sellerName, setSellerName] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user && user.uid) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setSellerName(userDoc.data());
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

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'properties'));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProperties(data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };
        fetchData();
    }, [user, navigate]);

    const fetchProperties = async () => {
        const querySnapshot = await getDocs(collection(db, 'properties'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProperties(data);
    };

    const handleEdit = (propertyId) => {
        navigate(`/add-property/${propertyId}`);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'properties', id));
            alert('Property deleted');
            fetchProperties();
        } catch (error) {
            console.error("Error deleting property", error);
        }
    };

    const handleInterested = (property) => {
        setInterestedPropertyId(property.id);
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="property-list">
                {properties.map(property => (
                    <div className="property-item" key={property.id}>
                        <p>Place: {property.place}</p>
                        <p>Area: {property.area}</p>
                        <p>Flat Size: {property.flatSize}</p>
                        <p>Nearby: {property.nearby}</p>
                        <p>Rent: {property.rent}</p>
                        {property.imageUrl && <img src={property.imageUrl} alt="Property" className="property-image" />}
                        <p>Seller Name: {property.sellerName}</p>
                        {user && sellerName.role === 'seller' && user.uid === property.userId && (
                            <>
                                <button onClick={() => handleEdit(property.id)}>Edit</button>
                                <button onClick={() => handleDelete(property.id)}>Delete</button>
                            </>
                        )}
                        {(user && (sellerName.role === 'buyer' || sellerName.role === "")) && (
                            <>
                                <button onClick={() => handleInterested(property)}>I'm Interested</button>
                                {interestedPropertyId === property.id && (
                                    <div>
                                        <p>Seller Name: {property.sellerName}</p>
                                        <p>Phone Number: {property.phoneNumber}</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
