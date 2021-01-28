import React from 'react'
import _ from 'lodash';
import styled from 'styled-components'

const SearchBarWrapper = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 25% 40% 10% 25%;
`;

const SearchInput = styled.input`
  border: none;
  line-height: 2;
  padding: 10px;
  font-size: 24px;
  grid-column-start: 2;
  border-radius: 5px 0 0 5px;
  color: #457b9d;
  :focus {
    outline-color: #1d3557;
  }
`;

const SearchButton = styled.button`
  border: none;
  background-color: #1d3557;
  color: #a8dadc;
  font-size: 24px;
  border-radius: 0 5px 5px 0;
`;


function SearchBar(props) {
  const {
    setSearching,
    setPage,
    setSearchTerm,
    searchTerm
  } = props;
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleEnterPress = event =>{
    if (event.key === 'Enter') {
      handleClickSearch();
    };
  };

  const handleClickSearch = () => {
    setSearching(searchTerm);
    setPage(1);
  };

  return(
    <SearchBarWrapper>
      <SearchInput
        type="text" 
        placeholder="Search..." 
        onChange={handleChange}
        value={searchTerm}
        onKeyPress={handleEnterPress}
      />
      <SearchButton onClick={ handleClickSearch }>Search</SearchButton>
    </SearchBarWrapper>
  )
}

export default SearchBar;