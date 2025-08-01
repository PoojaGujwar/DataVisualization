import {
  Chart as ChartJS,
  Tooltip,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  PieController,BarController
} from "chart.js";
import { Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
import "./Chart.css";
import PieCharts from "./PieCharts";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,PieController
);
export default function ChartsDashboard({ data }) {
  const chartData = {
    labels: data.length,
    datasets: [
      {
        label: "Year Dataset",
        data: data.map((val) => val.intensity),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        radius: "70%",
      },
    ],
  };
  const lineChart = {
    labels: data.map((val) => val.topic),
    datasets: [
      {
        label: "My First Dataset",
        data: data.map((val) => val.intensity || 0),
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const calculateTopic = data?.reduce((acc, curr) => {
    acc[curr.topic] = (acc[curr.topic] || 0) + 1;
    return acc;
  }, {});

  const yearIntensityMap = data.reduce((acc, curr) => {
    let year = curr.start_year;
    let intensity = curr.intensity;
    if (year && intensity) {
      if (!acc[year]) {
        acc[year] = { total: 0, count: 0 };
      }
      acc[year].total += intensity;
      acc[year].count += 1;
    }
    return acc;
  }, {});
  const years = Object.keys(yearIntensityMap).sort((a, b) => a - b);
  const averageIntesity = years.map((year) => {
    const { total, count } = yearIntensityMap[year];
    return count ? total / count : 0;
  });
  console.log(averageIntesity, years);
  const yearAndIntensity = {
    labels: years,
    datasets: [
      {
        label: "My First Dataset",
        data: averageIntesity,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const colors = [
    "rgb(255, 99, 132)",
    "rgb(75, 192, 192)",
    "rgb(255, 205, 86)",
    "rgb(201, 203, 207)",
    "rgb(54, 162, 235)",
  ];
  const topicData = {
    labels: Object.keys(calculateTopic),
    datasets: [
      {
        data: Object.values(calculateTopic),
        backgroundColor: Object.keys(calculateTopic).map((_, i) => colors[i]),
        radius: "50%",
        borderWidth: 5,
      },
    ],
  };

  const regionYearMap = {};

  data.forEach((item) => {
    const year = item.start_year;
    const region = item.region;
    const likelihood = item.likelihood;

    if (year && region && likelihood) {
      if (!regionYearMap[region]) regionYearMap[region] = {};
      if (!regionYearMap[region][year])
        regionYearMap[region][year] = { total: 0, count: 0 };
      regionYearMap[region][year].total += likelihood;
      regionYearMap[region][year].count += 1;
    }
  });
  const topRegions = Object.keys(regionYearMap)
    .sort(
      (a, b) =>
        Object.keys(regionYearMap[b]).length -
        Object.keys(regionYearMap[a]).length
    )
    .slice(0, 4);

  const allYears = [...new Set(data.map((d) => d.start_year))]
    .filter(Boolean)
    .sort();

  const likelihoodDataset = topRegions.map((region, i) => ({
    label: region,
    data: allYears.map((year) => {
      const entry = regionYearMap[region][year];
      return entry ? entry.total / entry.count : null;
    }),
    borderColor: colors[i % colors.length],
    fill: false,
    tension: 0.2,
  }));

  const likelihoodByRegion = {
    labels: allYears,
    datasets: likelihoodDataset,
  };

  const topicYearMap = data.reduce((acc, curr) => {
    const topic = curr.topic;
    const year = curr.start_year;
    const relevance = curr.relevance;

    if (topic && year && relevance) {
      if (!acc[topic]) {
        acc[topic] = {};
      }
      if (!acc[topic][year]) {
        acc[topic][year] = { total: 0, count: 0 };
      }
      acc[topic][year].total += relevance;
      acc[topic][year].count += 1;
    }
    return acc;
  }, {});
  const topTopics = Object.keys(topicYearMap)
    .sort(
      (a, b) =>
        Object.keys(topicYearMap[b]).length -
        Object.keys(topicYearMap[a]).length
    )
    .slice(0, 4);
  const allYearsTopic = [...new Set(data.map((d) => d.start_year))]
    .filter(Boolean)
    .sort();

  const datasets = topTopics.map((topic, i) => ({
    label: topic,
    data: allYearsTopic.map((year) => {
      const entry = topicYearMap[topic][year];
      return entry ? (entry.total / entry.count).toFixed(2) : null;
    }),
    borderColor: colors[i % colors.length],
    fill: false,
    tension: 0.3,
    spanGaps: true,
  }));
  const relevanceTrendData = {
    labels: allYears,
    datasets,
  };

  console.log(topicYearMap);

  return (
    <div className="row">
      <div className="col-md-6 col-lg-5 col-sm-5 d-flex align-items-center justify-content-center shadow m-4">
        <div className="w-100 p-5"  style={{ height: "400px" }}>
          <h5 className="text-center fw-bold mt-3">Intensity Distribution</h5>
        <Doughnut data={chartData}  options={{ responsive: true, maintainAspectRatio: false }}/>
        </div>
      </div>
      <div className="col-md-5 col-sm-5 col-lg-5 d-flex align-items-center justify-content-center shadow m-4">
        <div className="w-100 p-5"  style={{ height: "400px" }}>
          <h5 className="text-center fw-bold">Intensity by Topic</h5>
          <Line data={lineChart} options={{responsive:true, maintainAspectRatio: false, }} />
          </div>
      </div>
      <div className="col-md-12 col-lg-12  d-flex align-items-center justify-content-center shadow m-4 ">
        <div className="w-100 p-5"  style={{ height: "400px" }}>
           <h5 className="text-center fw-bold ">Likelihood Trend by Region</h5>
            <Line
              data={likelihoodByRegion}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
        </div>
      </div>
      <div className="col-md-5 col-lg-5 col-sm-12  d-flex align-items-center justify-content-center shadow m-4">
      <div className="w-100 p-5"  style={{ height: "400px" }}>
        <h5 className="text-center fw-bold">Topic Frequency Distribution</h5>
        <PolarArea data={topicData}  options={{ responsive: true, maintainAspectRatio: false }}/>
      </div></div>
      <div className="col-md-5 col-lg-5 col-sm-12  d-flex align-items-center justify-content-center shadow m-4">
        <div className="w-100 p-5"  style={{ height: "400px" }}>
          <h5 className="text-center fw-bold">Average Intensity Over Years</h5>
            <Line
              data={yearAndIntensity}
              options={{ responsive: true, maintainAspectRatio: false }}
            />

        </div>
      </div>
      <div className="col-md-10 col-lg-10 d-flex align-items-center justify-content-center shadow m-4">
        <div className="w-100 p-5"  style={{ height: "400px" }}>
          <h5 className="text-center fw-bold">Relevance Trend by Topic</h5>
        <Line
          data={relevanceTrendData}
          options={{
            responsive: true,
             maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Relevance Trend by Topic" },
            },
            scales: {
              x: {
                title: { display: true, text: "Year" },
              },
              y: {
                title: { display: true, text: "Avg Relevance" },
                beginAtZero: true,
              },
            },
          }}
        />
      </div></div>
      <div>
        <PieCharts data ={data}/>
      </div>
    </div>
  );
}
