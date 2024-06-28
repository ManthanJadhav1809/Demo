import React from 'react';

const FilterComponent = ({ filters, handleChange }) => {
    return (
        <div className="filters">
            <input type="text" name="place" placeholder="Place" onChange={handleChange} value={filters.place} />
            <input type="text" name="area" placeholder="Area" onChange={handleChange} value={filters.area} />
            <select name="flatSize" onChange={handleChange} value={filters.flatSize}>
                <option value="">Flat size</option>
                <option value="1Bhk">1 BHK</option>
                <option value="2Bhk">2 BHK</option>
                <option value="3Bhk">3 BHK</option>
                <option value="4Bhk">4 BHK</option>
                <option value=">4Bhk">More than 4 BHK</option>
            </select>
            <select name="rent" onChange={handleChange} value={filters.rent}>
                <option value="">Rent</option>
                <option value="<5000">less than 5000</option>
                <option value="5000-10000">5000-10000</option>
                <option value="10000-15000">10000-15000</option>
                <option value="15000-20000">15000-20000</option>
                <option value=">20000">More than 20000</option>
            </select>
        </div>
    );
};

export default FilterComponent;
