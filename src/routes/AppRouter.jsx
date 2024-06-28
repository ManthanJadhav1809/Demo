// src/routes/AppRouter.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Home from '../components/Home';
import PropertyDetails from '../components/PropertyDetails';
import AuthWrapper from '../components/AuthWrapper';
import AddProperty from '../components/AddProperty';

const AppRouter = ({ user, setUser }) => (
    <AuthWrapper user={user}>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/" element={<Home user={user} />} />
            <Route path="/property/:id" element={<PropertyDetails user={user} />} />
            <Route path="/add-property/:propertyId?" element={<AddProperty user={user} />} />
        </Routes>
    </AuthWrapper>
);

export default AppRouter;
