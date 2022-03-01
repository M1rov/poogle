import React, {FC, ReactElement} from 'react';
import './Search.scss'
import searchIcon from '../../assets/images/search.png'
import {useNavigate} from "react-router-dom";

interface props {
  className?: string,
  query: string,
  button?: ReactElement<HTMLButtonElement>,

  setQuery: (state: string) => void,

  [propName: string]: any
}

const Search: FC<props> = ({query, setQuery, className, button, ...props}) => {
  const navigate = useNavigate();

  const search = () => {
    if (query) {
      navigate(`/search/sites?q=${query}&page=1`)
    }
  }

  return (
    <form className={className}
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}>
      <label>
        <img src={searchIcon} alt="search" className='search-bar__icon'/>
        <input {...props}
               className='search-bar'
               type="text"
               value={query}
               onChange={e => setQuery(e.target.value)}
        />
      </label>
      {button}
    </form>
  );
};

export default Search;