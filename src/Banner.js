import React, { useEffect, useState } from 'react'
import "./Banner.css"
import axios from './axios'
import requests from './Requests'
import TypingEffect from './screens/TypingEffect'
function Banner() {
    
    const [movie, setMovie]=useState([])
    useEffect(()=>{
     async function fetchData(){
    const request= await axios.get(requests.fetchNetflixOriginals);
    setMovie(
        request.data.results[
            Math.floor(Math.random()*request.data.results.length-1)
        ]
    );  
    return request
    }
fetchData();

    
    },[]);
    
    

    function truncate(string, n){
        if(string.length>n)
           return string.substr(0,n-1)+"..."
        return string+".."

    }

  return (
    <header className="banner"
      style={{
        backgroundSize:"cover",
       backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
       )`,
       backgroundPosition:"center center",
      }}
    >
<div className="banner__contents">
    <h1 className="banner__title">
        {movie?.title|| movie?.name||movie?.original_name }
        
    </h1>
    <div className="banner__buttons">
        <button className="banner__button">play</button>
        <button className="banner__button">My List</button>
    </div>
    <h2 className="banner__description"><TypingEffect text= {truncate(`${movie?.overview}`,150)}speed={80} /></h2>
    
</div>
<div className="banner--fadeButton"/>



    </header>
  )
}

export default Banner