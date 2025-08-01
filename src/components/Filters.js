import React from "react";

export default function Filters({ data, onFilterChange }) {

   const getUniqueValues = (key) => {
    return [...new Set(data.map((item) => item[key]).filter(Boolean))];
  };
  console.log(getUniqueValues)
  return (
      <div className="container">
        <h5 className="text-bold mt-3">Filters</h5>
        <div className="mt-5">
          <select
            className="form-select "
            style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
            onChange={(e) => onFilterChange("end_year", e.target.value)}
          >
            <option value="">End Year</option>
            {getUniqueValues("end_year").sort().map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5">
          <select
            className="form-select form-select-sm small"
            onChange={(e) => onFilterChange("sector", e.target.value)}
          >
            <option value="">Sector</option>
            {getUniqueValues("sector").map((sector, i) => (
              <option key={i} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5">
          <select
            className="form-select"
            onChange={(e) => onFilterChange("topic", e.target.value)}
          >
            <option value="">Topic</option>
            {getUniqueValues("topic").map((topic, i) => (
              <option key={i} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5">
          <select
            className="form-select"
            onChange={(e) => onFilterChange("region", e.target.value)}
          >
            <option value="">Region</option>
            {getUniqueValues("region").map((region, i) => (
              <option key={i} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5">
          <select
            className="form-select"
            onChange={(e) => onFilterChange("country", e.target.value)}
          >
            <option value="">Country</option>
            {getUniqueValues("country").map((country, i) => (
              <option key={i} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

  );
}
