import React, {FC, useState} from 'react';
import './MainPage.scss'
import Search from "../Search/Search";

const MainPage: FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className='main'>
      <div className='container'>
        <h1 className='main__title'>PooGLE</h1>
        <Search
          className='main__search'
          query={query}
          setQuery={setQuery}
          button={
            <button className="main__btn">
              Search
            </button>
          }
        />

      </div>
    </div>
  );
};

export default MainPage;