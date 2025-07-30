import React from 'react'

export default function Filters({data, onFilterChange}) {

console.log(data)
  return (
    <div>
        <div className='row'>
        <div className="col">
          <select className="form-select" onChange={(e) => onFilterChange("end_year", e.target.value)}>
            <option value="">End Year</option>
            {data.map((year,i) => (
              <option key={i} value={year.end_year}>{year.end_year}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <select className="form-select" onChange={(e) => onFilterChange("sector", e.target.value)}>
            <option value="">Sector</option>
            {data.map((d,i) => (
              <option key={i} value={d.sector}>{d.sector}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <select className="form-select" onChange={(e) => onFilterChange("topic", e.target.value)}>
            <option value="">Topic</option>
            {data.map((d,i) => (
              <option key={i} value={d.topic}>{d.topic}</option>
            ))}
          </select>
        </div>
         <div className="col">
          <select className="form-select" onChange={(e) => onFilterChange("region", e.target.value)}>
            <option value="">Region</option>
            {data.map((d,i) => (
              <option key={i} value={d.region}>{d.region}</option>
            ))}
          </select>
        </div>
         <div className="col">
          <select className="form-select" onChange={(e) => onFilterChange("country", e.target.value)}>
            <option value="">Country</option>
            {data.map((d,i) => (
              <option key={i} value={d.country}>{d.country}</option>
            ))}
          </select>
        </div>
        </div>
    </div>
  )
}
