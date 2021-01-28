import React from 'react'
import _ from 'lodash';
import styled from 'styled-components'
import { ReactComponent as ChevronRight } from './../../assets/images/chevron-right.svg'
import { ReactComponent as ChevronLeft } from './../../assets/images/chevron-left.svg'
import placeholderImg from './../../assets/images/placeholder.png'

const SearchResultsWrapper = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  min-height: 863px;
`;

const PaginationButton = styled.button`
  border: none;
  height: 40px;
  align-self: center;
`;

const SearchResultsList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(5, 150px);
  gap: 20px;
  justify-content: center;
`;

const SearchItem = styled.div`
  border-radius: 5px;
  background-color: #f1faee;
  color: #e63946;
  margin: 20px;
  padding: 10px;
  display: grid;
  grid-template-columns: 25% 60%;
  gap: 20px;
  align-self: start;
  overflow: hidden;
`;

const Image = styled.img`
  width: 75px;
  height: 111px;
  border-radius: 2px;
`;

const SearchItemData = styled.div`
  padding-top: 10px;
  text-align: left;
  display: grid;
  grid-template-rows: 75% 25%;
`;

const Title = styled.h2`
  color: #457b9d;
  font-weight: bold;
  font-size: 20px;
  overflow: hidden;
  margin: 0;
  max-height: 49px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Loader = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SearchResults(props) {
  const {
    page,
    searchResult,
    searching,
    loading,
    isLastPage,
    setPage,
    setIsLastPage
  } = props;

  const handleClickPageRight = () => {
    if(!_.isUndefined(searchResult.Search) && page < Math.ceil(searchResult.totalResults / 10)){
      setPage( page+1 );
      setIsLastPage(false)
    }else {
     setIsLastPage(true)
    };
  };
 
  const handleClickPageLeft = () => {
    if(page > 1){
      setPage( page-1 );
    };
  };

  return (
    <SearchResultsWrapper>
      <PaginationButton 
        disabled={ page <= 1 ? true : false } 
        onClick={ handleClickPageLeft }
      >
        <ChevronLeft />
      </PaginationButton>
      { !_.isUndefined(searchResult.Search) ?
        <SearchResultsList>
          { searchResult.Search.map((result, idx) => (
            <SearchItem key={idx}>
              <Image
                src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                alt="poster"
              />
              <SearchItemData>
                <Title>{result.Title}</Title>
                <Description className="meta">{`${result.Type} | ${result.Year}`}</Description>
              </SearchItemData>
            </SearchItem>
          ))}
        </SearchResultsList> :
        <Loader>
          {
            searching === '' ? <p>Search by typing a word</p> :
            loading ? <p>No results yet</p> : <p>Movie Not Found</p>
          }
        </Loader>
      } 
      <PaginationButton 
        onClick={ handleClickPageRight }
        disabled={ isLastPage }
      >
        <ChevronRight />
      </PaginationButton>
    </SearchResultsWrapper>
  )
}

export default SearchResults;