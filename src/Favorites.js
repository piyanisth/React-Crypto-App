import React,{useState, useEffect} from 'react'
import { Table } from "antd";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";

function Favorites({search, handleSearch, selectedRows, setSelectedRows}) {

  const [alreadySelectedRows, setAlreadySelectedRows] = useState("Bitcoin");

  const columns = [
    {
      title: "#",
      dataIndex: "market_cap_rank",
      key: "rank",
      sorter: (a,b) => a.market_cap_rank - b.market_cap_rank,
    },
    {
      title: "",
      dataIndex:  "image",
      key: "image",
      render: (coin) => {
        return <img src={coin} alt="" width="50px" height="50px" padding="0px"/>
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      size: "large",
      sorter: (a,b) => {
        return a.name.localeCompare(b.name);
      },
      render: (text, coin) => {
        return <Link to={`/coin/${coin.id}`}>{text}</Link>
      }
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (text) => {
        return <span>{text.toUpperCase()}</span>
      }
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "current_price",
      sorter: (a,b) => a.current_price - b.current_price,
      render: (coin) => {
        return <span>${coin.toLocaleString()}</span>
      }
    },
    {
      title: "24h",
      dataIndex: "price_change_percentage_24h",
      key: "price_change_percentage_24h",
      sorter: (a,b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
      render: (number) => {
        if(number > 0){
          return <span style={{color: "green"}}>{number.toFixed(2)}%</span>
        }
        else{
          return <span style={{color: "red"}}>{number.toFixed(2)}%</span>
        }
      }
    },
    {
      title: "Volume",
      dataIndex: "total_volume",
      key: "total_volume",
      sorter: (a,b) => a.total_volume - b.total_volume,
      render: (volume) => {
        return <span>${volume.toLocaleString()}</span>
      }
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
      sorter: (a, b) => a.market_cap - b.market_cap,
      render: (coin) => {
        return <span>${coin.toLocaleString()}</span>
      }
    },
  ];

  let filteredCoins = []

  for(const coin of selectedRows) {
    let symbol = coin.symbol.toLowerCase();
    let name = coin.name.toLowerCase();
    if(symbol.match(search.toLowerCase()) || name.match(search.toLowerCase())) {
      filteredCoins.push(coin)
    }
  }

  useEffect(() => {
    window.localStorage.getItem("favorites") ? setSelectedRows(JSON.parse(window.localStorage.getItem("favorites"))) : setSelectedRows([])
  }, []);

  return (
    <div>
       <form className='form'>
          <input type="text" placeholder="Search a Favorite Coin" value={search} onChange={handleSearch}/>
        </form>
        <Table 
          columns={columns}
          dataSource={filteredCoins}
          rowKey="id"  
          rowSelection={{
            defaultSelectedRowKeys: alreadySelectedRows,
            onChange: (keys) => {
              setAlreadySelectedRows(keys)
            },
            hideSelectAll: true,
          }}
        >
        </Table>
      {/* {selectedRows.map(coin => {
        return (
          <h1>{coin.id}</h1>
        )
      })} */}
    </div>
  )
}

export default Favorites