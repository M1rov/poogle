import React, {FC} from 'react';
import {webSearchResult} from "../../../../interfaces/webSearch";
import {truncateText, truncateURI} from "../../../../scripts/truncate";

const SearchResultsItem: FC<{ result: webSearchResult }> = ({result}) => {

  return (
    <div className='result'>
      <a href={`${result.url}`} className="result__top">
        <div className="result__uri">
          {truncateURI(result.url)}
        </div>
        <div className="result__title">
          {result.title}
        </div>
      </a>
      <div className="result__description">
        {truncateText(result.description, 220)}
      </div>
    </div>
  );
};

export default SearchResultsItem;