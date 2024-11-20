import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import logo1 from '../../assets/logo1.png'
import './HomePage.css';





function HomePage() {
  const [searchInput, setSearchInput] = useState("red");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSeach] = useState(0);



  const fetchMovieData = async () =>{
    // fetching videos Data
    await fetch(`https://www.omdbapi.com/?s=${searchInput}&page=1&apikey=5553db97`)
    .then(res=>res.json())
    .then(data => {setApiData(data.Search), setLoading(false)});
}

useEffect(()=>{
  setLoading(true);
  fetchMovieData();

},[search])



  const handleChange = Event => {
    setSearchInput(Event.target.value)
  }

  const click = Event => {
    setSeach(search + 1);
  }
  

  if (loading) {
    return(
      <div className='load'>
      <img src={logo1} alt="Logo1" />
      <h2>Loading...</h2>
    </div>
    )
  }
  return (
    <div className="homepage">
      <Header />
      <div className="main-container">
        <Filter /> 
        <div className="main-content">
        <div className="search-bar">
        <input type="text" 
        placeholder="Search for movies..."
        onChange = {handleChange}
        value = {searchInput} />
        <button onClick={click}>Search</button>
      </div>
        <div className="poster">
            <div className="movie-list" >
              <div className="movie-item" style={{ width: '250px', height: '400px'}}>
                <img src= {apiData[0].Poster} alt="Movie Poster" style={{ width: '200px', height: '320px' }}/>
                <div>{apiData[0].Title}</div>
                <div className="rating">{apiData[0].Year}</div>
              </div>
              <div className="movie-item" style={{ width: '250px', height: '400px'}}>
                <img src= {apiData[1].Poster} style={{ width: '200px', height: '320px' }} />
                <div>{apiData[1].Title}</div>
                <div className="rating">{apiData[1].Year}</div>
              </div>
            </div>
        
          
            {/* Ranking sections */}
            <div className="ranking-container">
              <div className="ranking-card">
                <div className="ranking-title">Trending Movies</div>
                <ul className="ranking-list">
                  <li className="ranking-item" >
                    <img src="https://via.placeholder.com/45x65" alt="Movie Thumbnail" style={{ width: '100px', height: '150px' }}/>
                    <div className="ranking-details">
                      <div className="title">The Best Moment</div>
                      <div className="rank-rating">1 | <span className="rating-stars">8.4</span></div>
                    </div>
                  </li>
                  <li className="ranking-item">
                    <img src="https://via.placeholder.com/45x65" alt="Movie Thumbnail" style={{ width: '100px', height: '150px' }}/>
                    <div className="ranking-details">
                      <div className="title">Dream City</div>
                      <div className="rank-rating">2 | <span className="rating-stars">7.5</span></div>
                    </div>
                  </li>
                  <li className="ranking-item">
                    <img src="https://via.placeholder.com/45x65" alt="Movie Thumbnail" style={{ width: '100px', height: '150px' }}/>
                    <div className="ranking-details">
                      <div className="title">The Final Trip</div>
                      <div className="rank-rating">3 | <span className="rating-stars">8.0</span></div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="ranking-card">
                <div className="ranking-title">Weekly Popular Movies</div>
                <ul className="ranking-list" style={{ width: '200px', height: '150px' }}>
                  <li className="ranking-item">
                    <img src="https://via.placeholder.com/45x65" alt="Movie Thumbnail" style={{ width: '100px', height: '150px' }}/>
                    <div className="ranking-details">
                      <div className="title">Women's World</div>
                      <div className="rank-rating">1 | <span className="rating-stars">8.4</span></div>
                    </div>
                  </li>
                  <li className="ranking-item">
                    <img src="https://via.placeholder.com/45x65" alt="Movie Thumbnail" style={{ width: '100px', height: '150px' }}/>
                    <div className="ranking-details">
                      <div className="title">Breath of Wind</div>
                      <div className="rank-rating">2 | <span className="rating-stars">8.1</span></div>
                    </div>
                  </li>
                  <li className="ranking-item">
                    <img src="https://via.placeholder.com/45x65" alt="Movie Thumbnail" style={{ width: '100px', height: '150px' }}/>
                    <div className="ranking-details">
                      <div className="title">Home Again</div>
                      <div className="rank-rating">3 | <span className="rating-stars">8.3</span></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage