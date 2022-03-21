import React, {FC, useState} from 'react';
import './MainPage.scss'
import Search from "../Search/Search";
import logo from '../../assets/images/logo.png'

const MainPage: FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className='main'>
      <div className='container'>
          <img src={logo} alt="PooGLE" className='main__logo'/>
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