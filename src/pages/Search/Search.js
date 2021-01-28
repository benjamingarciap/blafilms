import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './../../components/Search/SearchBar'
import SearchResults from './../../components/Search/SearchResults'

function Search() {

  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(true);

  useEffect(() => {
    const url = `http://www.omdbapi.com/?apikey=a461e386&s=${searching}&page=${page}`;
    const searchMovies = () => {
      setLoading(true)
      axios.get(url)
      .then( (res) => {
        const movies = res;
        setSearchResult(movies.data)
        setLoading(false)
        !movies.data.Error ? setIsLastPage(false) : setIsLastPage(true)
      })
      .catch(error => console.log(`error ${error}`))
    };
    searchMovies();
  },[searching, page]);

  return (
    <>
      <SearchBar 
        searchTerm={searchTerm} 
        setSearching={setSearching}
        setSearchTerm={setSearchTerm}
        setPage={setPage}
      />
      <SearchResults
        page={page} 
        searchResult={searchResult}
        searching={searching}
        loading={loading}
        isLastPage={isLastPage}
        setPage={setPage}
        setIsLastPage={setIsLastPage}
      />
    </>
  )
};

export default Search;