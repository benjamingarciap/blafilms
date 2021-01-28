import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import _ from 'lodash';

function App() {
  const [searchResult, setSearchResult] = useState()
  const [searchTerm, setSearchTerm] = useState("");


  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleClick = () => {

  }
  
  useEffect(() => {
    const search = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=a461e386&s=${searchTerm}&page=1`
        // `http://www.omdbapi.com/?apikey=a461e386&s=pepe`
      )
      const data = await response.json()
      console.log(data)
      console.log( `http://www.omdbapi.com/?apikey=a461e386&s=${searchTerm}&page=1`)
      setSearchResult(data)
    }
    search()
  },[searchTerm])

  return (
    <div className="App">
      <div className="search">
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={handleChange}
          value={searchTerm}
        />
        <button onClick={ handleClick }>Search</button>
      </div>
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
            <ChevronLeft />
          </div>
          <div className="search-results-list">
            {_.isUndefined(searchResult.Search) ? console.log('undefined') :
            searchResult.Search.map(result => (
              <div key={result.imdbID} className="search-item">
                <img
                  src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                  alt="poster"
                />
                <div className="search-item-data">
                  <div className="title">{result.Title}</div>
                  <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chevron">
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
