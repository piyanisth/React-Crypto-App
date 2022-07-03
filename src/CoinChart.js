import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Line } from '@ant-design/plots';
import { CoinChartAPI } from './api';
function CoinChart({coin}) {

  const [historicalData, setHistoricalData] = useState([]);

  const {id} = useParams()

  const getHistoricalData = async (coin) => {
    if(coin.id){
      try {
        const response = await axios.get(CoinChartAPI(id));
        const data = response.data;
        setHistoricalData(data.prices.map((p) => ({timestamp: new Date(p[0]).toLocaleString(), price: p[1] })));
      } 
      catch (error){
        alert("Could not fetch the Chart api data")
        console.log("Chart api ERROR", error)
      }
    }
  }
  useEffect(() => {
    getHistoricalData(coin)
  },[coin])
  
  const config = {
    data: historicalData,
    padding: 'auto',
    xField: 'timestamp',
    yField: 'price',
    width: 1400,
    height: 700,
    autoFix: true,    
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    meta: {
      price: {
        formatter: (price) => '$' + price.toFixed(0),
        min: 20000
      }
    },
    animation: {
      // Configuration of the first animation
      enter: {
        animation: 'wave-in', 
        duration: 5000, 
      },
    }
  };

  return <Line {...config} />;
}

export default CoinChart