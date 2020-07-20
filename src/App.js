import React,{useState,useEffect} from 'react';
import './App.css';
import Search from "./search";
import Data from "./context"
import ShowBox from "./showBox"
import {Line} from "react-chartjs-2"
import Moment from "moment"

function App() {

  let global = useState("worldwide");
  console.log(global[0])
  let [chartData,setChartData] = useState({})
  let [bodyData,setBodyData] = useState({});
  let [chartOption,setChartOption] = useState({});

  const settingDataForChart = (body) =>{
    var timeFormat = 'MM/DD/YY';
    setChartData({
    
      // The data for our dataset
      
          datasets: [{
              label: 'Total Cases',
              backgroundColor: 'rgba(204, 16, 52, 0.5)',
              borderColor: '#CC1034',
              data: body
          }]
      
    })

    setChartOption({
      
     
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            intersect: false
        },
        scales:     {
            xAxes: [{
                type: "time",
                time: {
                    format: timeFormat,
                }
            }],
            yAxes: [{
                gridLines: {
                    display:false
                }
            }]
        
    }
    })
}

  useEffect(()=>{
    // settingDataForChart();
    let body = [{}]
    if(global[0] == "worldwide"){
      fetch("https://corona.lmao.ninja/v2/historical/all?lastdays=120").then((response)=>{
        return response.json();
      }).then((data)=>{
      
        for(let date in data.cases){
          let b = {
            x: date,
            y:data.cases[date]
          }
          body.push(b);
        }
        settingDataForChart(body);
      })
    }else if(global[0] == ""){
      let body = [{}]
      fetch("https://corona.lmao.ninja/v2/historical/all?lastdays=120").then((response)=>{
        return response.json();
      }).then((data)=>{
      
        for(let date in data.cases){
          let b = {
            x: date,
            y:data.cases[date]
          }
          body.push(b);
        }
        settingDataForChart(body);
      })
    }else{
      let countryName = global[0].toString();
      let url = "https://corona.lmao.ninja/v2/historical/"+countryName+"?lastdays=120";
      console.log(url,"this is url");
      let body = [{}]
      fetch(url).then((response)=>{
        return response.json();
      }).then((data)=>{
        data = data.timeline;
        for(let date in data.cases){
          let b = {
            x: date,
            y:data.cases[date]
          }
          body.push(b);
        }
        settingDataForChart(body);
      })
    }

  },[global[0]])
  
  
  
  
  return (
    <Data.Provider value={global}>
    <div className="App">
      <div>
        <Search />
       <ShowBox />
       <div className="chartShow">
         <Line data={chartData} options={chartOption} width={100} height={30} />
       </div>
      </div>
      
    </div>
    </Data.Provider>
  );
 
}

export default App;
