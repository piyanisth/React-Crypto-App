import React,{useState} from 'react';
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import CoinPage from './CoinPage';
import Home from './Home';
function App() {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path="/" element={
        <div>
          <form className='form'>
          <input type="text" placeholder="Search a coin" value={search} onChange={handleSearch}/>
          </form>
          <Home search={search}/>
        </div> 
         }
         />
        <Route path="/coin/:id" element={<CoinPage></CoinPage>} />
      </Routes>
      </div>
  );
}

export default App;
