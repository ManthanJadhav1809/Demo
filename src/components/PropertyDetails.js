import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import '../styles/propertyDetails.css';

const PropertyDetails = ({ user }) => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            const docRef = doc(db, 'properties', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProperty(docSnap.data());
            } else {
                console.error("No such document!");
            }
        };

        fetchProperty();
    }, [id]);

    const handleGetInfo = () => {
        setVisible(true);
    };

    return property ? (
        <div className="property-details">
            {property.imageUrl && (
                <img src={property.imageUrl} alt='Property' className="property-image" />
            )}
            <h1>Place: {property.place}</h1>
            <p>Address: {property.area}</p>
            <p>Rent: {property.rent}</p>
            <p>Rooms: {property.flatSize}</p>
            <p>Nearby: {property.nearby}</p>
            <div className='btnContainer'>
              <button className='btnInterested' onClick={handleGetInfo}>I'm Interested</button>
              <button className='bacBtn' style={{color:"red !important" }}><Link to={"/"}>Back</Link></button>     
            </div>
            {visible && (
                <div className="seller-info">
                    <p>Seller Name: {property.sellerName}</p>
                    <p>Phone Number: {property.phoneNumber}</p>
                    <p>Contact Details: {property.contactDetails}</p>
                </div>
            )}
        </div>
    ) : (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    );
};

export default PropertyDetails;
