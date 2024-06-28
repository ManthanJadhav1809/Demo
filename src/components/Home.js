import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import mjRentifyLogo from "./mjrentifylogo.png";
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import FilterComponent from './FilterComponent';
import '../styles/home.css';

const Home = ({ user }) => {
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({ place: '', area: '', rent: '', flatSize: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let q = collection(db, 'properties');
            const querySnapshot = await getDocs(q);
            let data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Apply filters
            if (filters.place) {
                data = data.filter(property => property.place.toLowerCase().includes(filters.place.toLowerCase()));
            }
            if (filters.area) {
                data = data.filter(property => property.area.toLowerCase().includes(filters.area.toLowerCase()));
            }
            if (filters.flatSize) {
                data = data.filter(property => property.flatSize === filters.flatSize);
            }
            if (filters.rent) {
                const rentRange = filters.rent.split('-');
                if (rentRange.length === 1) {
                    if (filters.rent.startsWith('<')) {
                        data = data.filter(property => property.rent < parseInt(rentRange[0].substring(1)));
                    } else if (filters.rent.startsWith('>')) {
                        data = data.filter(property => property.rent > parseInt(rentRange[0].substring(1)));
                    }
                } else {
                    data = data.filter(property => property.rent >= parseInt(rentRange[0]) && property.rent <= parseInt(rentRange[1]));
                }
            }
            setProperties(data);
        };
        fetchData();
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleGetInfo = (user, propertyId) => {
        // if (user) {
            navigate(`/property/${propertyId}`);
        // } else {
            // alert("Login to get more info");
        // }
        // console.log("user "+user)
    };
    
    return (
        <div className="home">
            <header className="home-header">
                <div><img src={mjRentifyLogo} alt="MJ Rentify Logo" className="home-logo" /></div>
                <div>
                    <h1>Welcome to MJ Rentify</h1>
                    <p>Your one-stop solution for finding the perfect rental property.</p>
                </div>
            </header>
            <FilterComponent filters={filters} handleChange={handleChange} />
            <div className="property-list">
                {properties.length === 0 ? (
                    <p className="no-data">Data not found</p>
                ) : (
                    properties.map(property => (
                        <div className="property-item" key={property.id}>
                            {property.imageUrl && <img src={property.imageUrl} alt="Property" className="property-image" />}
                            <h2>Place: {property.place}</h2>
                            <p>Address: {property.area}</p>
                            <p>{property.flatSize} Rooms</p>
                            <p>Rs. {property.rent} Rent</p>
                            <button className="more-info-button" onClick={() => handleGetInfo(user, property.id)}>Get More Info</button>
                        </div>
                    ))
                )}
            </div>
            <footer className="home-footer">
                <p>&copy; 2023 MJ Rentify. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
