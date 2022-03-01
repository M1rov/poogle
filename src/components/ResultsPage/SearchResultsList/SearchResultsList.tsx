import React, {FC, useEffect, useState} from 'react';
import './SearchResultsList.scss'
import SearchResultsItem from "./SearchResultsItem/SearchResultsItem";
import {useSearchParams} from "react-router-dom";
import SearchController from "../../../controller/search.controller";
import {webSearchResp} from "../../../interfaces/webSearch";

const SearchResultsList: FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');
  const page: number = Number(searchParams.get('page')) || 1;

  const [results, setResults] = useState<webSearchResp>()

  const pageLimit = 20;

  const totalPages: number = results ? Math.ceil(results?.totalCount / pageLimit) : 0;

    useEffect(() => {
    if(queryParam) {
      SearchController.webSearch(queryParam).then(data => {
        setResults(data)
      })
    }
  }, [])



  return (
    <div className='results__search-list'>
      <div className="container">
        <ul className='results__search-flex'>
          {results?.value?.map(result => <SearchResultsItem result={result} key={result.id}/>)}
        </ul>

      </div>
    </div>
  );
};

export default SearchResultsList;