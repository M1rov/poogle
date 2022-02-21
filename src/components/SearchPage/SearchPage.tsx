import React, {FC, RefObject, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Search from "../../UI/Search/Search";

interface Props {
  searchBtn?: RefObject<HTMLButtonElement>,
  className?: string,
  initValue?: string
}

const SearchPage: FC<Props> = ({searchBtn, className, initValue}) => {
  const [query, setQuery] = useState<string>('');

  const navigate = useNavigate();

  console.log(query);

  const search = () => {
    console.log(query, 'query');
    if (query) {
      navigate(`/search?q=${query}`)
    }
  }

  useEffect(() => {
    if (searchBtn) {
      searchBtn.current?.addEventListener('click', search);
      return () => {
        searchBtn.current?.removeEventListener('click', search)
      };
    }
  }, [searchBtn?.current])

  return (
    <Search
      onSubmit={search}
      className={className}
      state={query}
      setState={setQuery}
    />
  );
};

export default SearchPage;