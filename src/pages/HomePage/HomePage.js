// src/pages/HomePage.js
import React from 'react';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <div className="main-container">
        <Filter />
        <div className="main-content">
          <div className="poster">
            <div className="movie-list" >
              <div className="movie-item" style={{ width: '250px', height: '400px'}}>
                <img src="https://via.placeholder.com/160x220" alt="Movie Poster" style={{ width: '200px', height: '320px' }}/>
                <div>Dream City</div>
                <div className="rating">7.5</div>
              </div>
              <div className="movie-item" style={{ width: '250px', height: '400px'}}>
                <img src="https://via.placeholder.com/160x220" alt="Movie Poster" style={{ width: '200px', height: '320px' }} />
                <div>Old Gun</div>
                <div className="rating">7.7</div>
              </div>
              <div className="movie-item" style={{ width: '250px', height: '400px'}}>
                <img src="https://via.placeholder.com/160x220" alt="Movie Poster" style={{ width: '200px', height: '320px' }} />
                <div>Chinatown</div>
                <div className="rating">8.4</div>
              </div>
              <div className="movie-item" style={{ width: '250px', height: '400px'}}>
                <img src="https://via.placeholder.com/160x220" alt="Movie Poster" style={{ width: '200px', height: '320px' }} />
                <div>The Final Trip</div>
                <div className="rating">8.0</div>
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
  );
}

export default HomePage;
