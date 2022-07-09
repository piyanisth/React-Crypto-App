import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CoinChart from './CoinChart';
import { CoinAPI } from './api';
import "./CoinPage.css"
function CoinPage() {

  const [coin, setCoin] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getCoin = async () => {
      try {
        const response = await axios.get(CoinAPI(id));
        const data = response.data
        setCoin(data)
        console.log("gotCoin",data)
      }
      catch (error){
        alert("Could not fetch the Coin api data")
        console.log("Coin ERROR", error)
      }
    }
    getCoin()
  },[id])

  let maxSupply 
  let fullyDilutedValuation

  if(coin?.market_data?.max_supply){
     maxSupply = coin?.market_data?.max_supply?.toLocaleString()
    }
    else {
     maxSupply = "N/A"
    }

  if(coin?.market_data?.fully_diluted_valuation?.usd){
     fullyDilutedValuation = coin?.market_data?.fully_diluted_valuation?.usd?.toLocaleString()
    }
    else {
     fullyDilutedValuation = "N/A"
    }
  
  console.log('coin', coin)
  
  if(!coin.id){
    return <div>Loading...</div>
  }
    
  return (
    <div className='coinPage'>     
      <div className='info-significant'>
        <div className='rank'>Rank #{coin?.market_cap_rank}</div> 
        <div className='name'>
          <img src={coin?.image.small} alt="" width={60} height={60} />  
          <h1>{coin?.name}</h1>
          <h1>({coin?.symbol.toUpperCase()})</h1>
        </div> 
        <div className='price-datas'>
          <h1>${coin?.market_data?.current_price?.usd?.toLocaleString()}</h1>
          <h2>{coin?.market_data?.price_change_percentage_24h?.toFixed(2)}%</h2>
        </div>
        <div className='coin-dailyRange'>
          <div>24h Max <br /><strong>${coin?.market_data?.high_24h?.usd?.toLocaleString()}</strong></div>
          <div>24h Min <br /> <strong>${coin?.market_data?.low_24h?.usd?.toLocaleString()}</strong></div>
        </div>
      </div> 
      {/* <div>ATH: ${coin.market_data.market_cap.usd.toLocaleString()}</div> */}
        <table className='data-table'>
          <tbody>
            <tr className='row'><td>Market Cap</td><td>${coin?.market_data?.market_cap?.usd?.toLocaleString()}</td></tr><hr />
            <tr className='row'><td>24h Volume</td><td>${coin?.market_data?.total_volume?.usd?.toLocaleString()}</td></tr><hr />
            <tr className='row'><td>Fully Diluted Valuation</td><td>${fullyDilutedValuation}</td></tr><hr />
          </tbody>
        </table>
        <table className='data-table'>
          <tbody>
            <tr className='row'><td>Circulating Supply</td><td>{coin?.market_data?.circulating_supply?.toLocaleString()}</td></tr><hr />
            <tr className='row'><td>Total Supply</td><td>{coin?.market_data?.total_supply?.toLocaleString()}</td></tr><hr />
            <tr className='row'><td>Max Supply</td><td>{maxSupply}</td></tr><hr />
          </tbody>
        </table>
      <div className='coin-chart'><CoinChart coin={coin}></CoinChart></div>
    </div>
  )
}
export default CoinPage