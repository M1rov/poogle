import React, {useEffect, useRef} from 'react';
import './ResultsPage.scss'
import {useSearchParams} from "react-router-dom";
import SearchController from "../../controller/search.controller";
import SearchPage from "../SearchPage/SearchPage";
import searchIcon from '../../assets/images/right-arrow.png'

const ResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q');

  useEffect(() => {
    if(queryParam) {
      SearchController.webSearch(queryParam).then(data => {
        console.log(data)
      })
    }
  }, [])


  const searchBtn = useRef<HTMLButtonElement>(null);

  return (
    <div className='result'>
      <div className="container">
        <div className="result__top">
          <SearchPage
            searchBtn={searchBtn}
            className='result__search'
            initValue={queryParam || ''}
          />
          <button className='result__btn' ref={searchBtn}>
            <img src={searchIcon} alt="search"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;