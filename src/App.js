import React,{useState} from 'react';
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import CoinPage from './CoinPage';
import Home from './Home';
import { Link } from "react-router-dom";
import Favorites from './Favorites';
import StarBorderIcon from '@mui/icons-material/StarBorder';
function App() {

  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  // const handleFavorites = () => {
  //   window.localStorage.setItem("favorites", JSON.stringify(selectedRows));
  // }

  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path="/" element={
        <div className='btn-input'>
          <form className='form'>
          <input type="text" placeholder="Search a Coin" value={search} onChange={handleSearch}/>
          </form>
          <Link to="/coin/favorites">
            <button><StarBorderIcon /><p>Watchlist</p></button>
          </Link>
          <Home search={search} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
        </div> 
         }
         />
        <Route path="/coin/:id" element={<CoinPage></CoinPage>} />
        <Route path="/coin/favorites" element={<Favorites search={search} handleSearch={handleSearch} selectedRows={selectedRows} setSelectedRows={setSelectedRows} ></Favorites>} />
      </Routes>
      </div>
  );
}

export default App;
