import React, {FC} from 'react';
import './Search.scss'
import searchIcon from '../../assets/images/search.png'

interface props {
  className?: string,
  state: string,

  onSubmit?(): void,

  setState: (state: string) => void,

  [propName: string]: any
}

const Search: FC<props> = ({className, state, setState, onSubmit, ...props}) => {
  return (
    <form className={className}
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) {
              onSubmit()
            }
          }}>
      <label>
        <img src={searchIcon} alt="search" className='search-bar__icon'/>
        <input {...props}
               className='search-bar'
               type="text"
               value={state}
               onChange={e => setState(e.target.value)}
        />
      </label>
    </form>
  );
};

export default Search;