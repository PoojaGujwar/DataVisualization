import {Chart as ChartJS, Tooltip, ArcElement, Legend,CategoryScale, LinearScale, PointElement, LineElement,RadialLinearScale} from "chart.js"
import {Doughnut, Line, PolarArea} from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale,PointElement, LineElement, RadialLinearScale);
export default function ChartsDashboard({data}){

 const chartData ={
  labels:data.length,
  datasets:[{
    label:"Year Dataset",
    data: data.map((val)=>val.intensity),
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset:4,
    radius:"50%"
  }]
 }
 const lineChart = {
  labels: data.map((val)=>val.topic),
  datasets: [{
    label: 'My First Dataset',
    data: data.map((val)=>val.intensity || 0),
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
const calculateTopic = data?.reduce((acc,curr)=>{
  acc[curr.topic] = (acc[curr.topic] ||0)+1
  return acc
},{})


const colors = [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
    ]
const topicData ={
  labels: Object.keys(calculateTopic),
  datasets:[{
    data:Object.values(calculateTopic),
    backgroundColor: Object.keys(calculateTopic).map((_,i)=>colors[i]),
    radius:'50%',
    borderWidth:5
  }],

}

  return (
    <div className="row m-0 p-0" >
      <div className="col-md-5">
        <Doughnut data={chartData}/>
      </div>
      <div className="col">
        <Line data={lineChart}/>
      </div>
      <div className="col-md-5">
        <PolarArea data={topicData}/>
      </div>
    </div>
  )
}

