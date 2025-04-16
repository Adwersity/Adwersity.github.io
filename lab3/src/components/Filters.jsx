import React from 'react';
import '../styles.css';
const Filters = ({ onFilterChange }) => {
  return (
    <div className="filters">
      <select className="filter-select" onChange={e => onFilterChange('type', e.target.value)}>
        <option value="">Усі типи</option>
        <option value="concert">Концерт</option>
        <option value="theatre">Театр</option>
        <option value="exhibition">Виставка</option>
      </select>
      <select className="filter-select" onChange={e => onFilterChange('sort', e.target.value)}>
        <option value="date">За датою</option>
        <option value="price">За ціною</option>
      </select>
    </div>
  );
};

export default Filters;
