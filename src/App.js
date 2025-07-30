import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import { fetchData } from './utils/api';
import InsightCard from './components/InsightCard';
import Filters from './components/Filters';
import Header from './components/Header';

function App() {
  const [data, setData] = useState([])
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(()=>{
    fetchData().then((res)=>{
      setData(res);setFiltered(res)})
  },[])

  const handleFilterChange =(key, value)=>{
    console.log(key, "Key", value, "Value")
    const updated ={...filters,[key]:value}
    setFilters(updated);
    let temp = data

    Object.entries(updated).forEach(([k,v])=>{
      if(v){
        temp = temp.filter((item)=>item[k]?.toLowerCase() === v.toLowerCase())
      }
    })
    setFiltered(temp)
  }
  
  return (
    <div className="dashboard container my-4">
      <Header/>
      <Filters data={data} onFilterChange={handleFilterChange}/>
        <div className="card-container row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
        {filtered.map((item) => (
          <div className="col" key={item._id}>
            <InsightCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
