import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useEffect, useState } from "react";
import { fetchData } from "./utils/api";
import InsightCard from "./components/InsightCard";
import Filters from "./components/Filters";
import Header from "./components/Header";
import ChartsDashboard from "./components/ChartsDashboard";

function App() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchData().then((res) => {
      setData(res);
      setFiltered(res);
    });
  }, []);

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    let temp = data;

    Object.entries(updated).forEach(([k, v]) => {
      if (v) {
        temp = temp.filter(
          (item) => item[k]?.toLowerCase() === v.toLowerCase()
        );
      }
    });
    setFiltered(temp);
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="row">
        <div className="col-lg-2 bg-light">
          <Filters data={data} onFilterChange={handleFilterChange}/>
        </div>
        <div className="col-lg-9">
          {filtered.length > 0 && <ChartsDashboard data={filtered} />}
        </div>
      </div>
    </div>
  );
}

export default App;
