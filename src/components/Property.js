// src/components/Property.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const Property = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

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

    return property ? (
        <div>
            <h1>{property.place}</h1>
            <p>{property.area}</p>
            <p>{property.bedrooms} Bedrooms</p>
            <p>{property.bathrooms} Bathrooms</p>
            <p>Nearby: {property.nearby}</p>
            <button onClick={() => alert("Interested!")}>I'm Interested</button>
        </div>
    ) : (
        <div className="loader-container">
    <div className="loader"></div>
      </div>

    );
};

export default Property;
