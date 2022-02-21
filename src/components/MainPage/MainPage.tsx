import React, {FC, useRef} from 'react';
import './MainPage.scss'
import SearchPage from "../SearchPage/SearchPage";

const MainPage: FC = () => {

  const searchBtn = useRef<HTMLButtonElement>(null);

  return (
    <div className='main'>
      <div className='container'>
        <h1 className='main__title'>PooGLE</h1>
        <SearchPage searchBtn={searchBtn} className='main__search'/>
        <button className="main__btn" ref={searchBtn}>
          Search
        </button>
      </div>
    </div>
  );
};

export default MainPage;