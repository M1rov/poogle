import React, {FC, useEffect, useState} from 'react';
import './SearchResultsList.scss'
import SearchResultsItem from "./SearchResultsItem/SearchResultsItem";
import {useSearchParams} from "react-router-dom";
import SearchController from "../../../controller/search.controller";
import {webSearchResp} from "../../../interfaces/webSearch";
import Pagination from "../../Pagination/Pagination";
import Loader from "../../UI/Loader/Loader";

const SearchResultsList: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const page: number = Number(searchParams.get('page')) || 1;

  const [results, setResults] = useState<webSearchResp>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const pageLimit = 20;

  const totalPages: number = results ? Math.ceil(results?.totalCount / pageLimit) : 0;

  useEffect(() => {
    if (queryParam) {
      setIsLoading(true);
      SearchController.webSearch(queryParam, page).then(data => {
        setResults(data)
      }).finally(() => {
        setIsLoading(false);
      })
    }
  }, [page, queryParam])

  const onPageChanged = (currentPage: number) => {
    setSearchParams({q: queryParam, page: currentPage.toString()});
    window.scroll(0, 0)
  }


  return isLoading ?
    (
      <div className='results__loader'>
        <Loader/>
      </div>
    )
    :
    (
      <div className='results__search-list'>
        <div className="container">
          <ul className='results__search-flex'>
            {results?.value?.map(result => <SearchResultsItem result={result} key={result.id}/>)}
          </ul>
          <Pagination totalPages={totalPages} pageLimit={pageLimit} pageNeighbours={3} onPageChanged={onPageChanged}/>
        </div>
      </div>
    );
};

export default SearchResultsList;