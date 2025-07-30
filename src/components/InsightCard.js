import React from 'react';

export default function InsightCard({ item }) {
  return (
    <div className="card">
      <h3>{item.title}</h3>
      <p><strong>Topic:</strong> {item.topic}</p>
      <p><strong>Sector:</strong> {item.sector}</p>
      <p><strong>Country:</strong> {item.country}</p>
      <p><strong>Region:</strong> {item.region}</p>
      <p><strong>Start Year:</strong> {item.start_year}</p>
      <p><strong>End Year:</strong> {item.end_year}</p>
      <p><strong>Intensity:</strong> {item.intensity}</p>
      <p><strong>Likelihood:</strong> {item.likelihood}</p>
      <p><strong>Relevance:</strong> {item.relevance}</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer">Read More</a>
    </div>
  );
}
