import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarController, BarElement } from "chart.js";
ChartJS.register(BarController, BarElement);

const RegionsData = (data) => {
  const regionCount = data.reduce((acc, curr) => {
    acc[curr.region] = (acc[curr.region] || 0) + 1;
    return acc;
  }, {});
  const regions = Object.keys(regionCount);
  const regionValue = Object.values(regionCount);
  const regionDataset = {
    labels: [...regions],
    datasets: [
      {
        data: [...regionValue],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  return regionDataset;
};

const TopicData = (data) => {
  const topicCount = data.reduce((acc, curr) => {
    acc[curr.topic] = (acc[curr.topic] || 0) + 1;
    return acc;
  }, {});
  const topics = Object.keys(topicCount);
  const topicValue = Object.values(topicCount);
  const topicDatasets = {
    labels: topics.map((val) => val),
    datasets: [
      {
        data: topicValue.map((val) => val),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  return topicDatasets;
};

export default function PieCharts({ data }) {
  return (
    <>
      <div className="row">
        <div className="col-md-6 col-lg-5 d-flex align-items-center justify-content-center shadow m-4">
          <div className="w-100 p-5"  style={{ height: "400px" }}>
            <h5 className="text-center fw-bold">Topic Distribution</h5>
            <Pie data={TopicData(data)}  options={{responsive:true,maintainAspectRatio: false}}/>
          </div>
        </div>
           <div className="col-md-5 d-flex align-items-center justify-content-center shadow m-4">
          <div className="w-100 p-5"  style={{ height: "400px" }}>
             <h5 className="text-center fw-bold">Region Distribution</h5>
            <Pie data={RegionsData(data)} options={{responsive:true,maintainAspectRatio: false}} />
          </div>
        </div>
        <div className="col d-flex align-items-center justify-content-center shadow m-4">
          <div className="w-100 p-5"  style={{ height: "400px" }}>
            <h5 className="text-center fw-bold">Region-wise Count</h5>
            <Bar data={RegionsData(data)} options={{responsive:true,maintainAspectRatio: false}} />
          </div>
        </div>
     
      </div>
    </>
  );
}
