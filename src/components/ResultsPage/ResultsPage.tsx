import React, {useEffect, useRef, useState} from 'react';
import './ResultsPage.scss'
import {Link, useParams, useSearchParams} from "react-router-dom";
import searchIcon from '../../assets/images/right-arrow.png'
import Search from "../Search/Search";
import SearchResultsList from "./SearchResultsList/SearchResultsList";
import ImageResultsList from "./ImageResultsList/ImageResultsList";
import logo from '../../assets/images/logo.png'


enum searchTypes {
  all = 'sites',
  images = 'images'
}

const ResultsPage = () => {
  const params = useParams();

  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');

  const [query, setQuery] = useState(queryParam || '');

  const resultsTop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = resultsTop.current;
    if (ref) {
      const observer = new IntersectionObserver(
        ([e]) => {
          e.target.classList.toggle('sticky', e.intersectionRatio < 1)
        },
        {threshold: [1]}
      );
      observer.observe(ref)
      return () => observer.unobserve(ref)
    }
  }, [resultsTop])

  return (
    <div className='results'>
      <div className="results__top" ref={resultsTop}>
        <Link to={'/'} className='results__logo'>
          <img src={logo} alt='logo'/>
        </Link>
        <div className="container">
          <div className="results__search">
            <Search
              query={query}
              setQuery={setQuery}
              button={
                <button className='results__btn'>
                  <img src={searchIcon} alt="search"/>
                </button>
              }
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="results__btns">
          <Link
            to={`/search/sites?q=${queryParam}&page=1`}
            className={params.searchType === searchTypes.all ? 'active' : ''}
          >
            All
          </Link>
          <Link
            to={`/search/images?q=${queryParam}`}
            className={params.searchType === searchTypes.images ? 'active' : ''}
          >
            Images
          </Link>
        </div>
      </div>
      {
        params.searchType === searchTypes.all ?
          <SearchResultsList/>
          :
          <ImageResultsList/>
      }
    </div>
  );
};

export default ResultsPage;