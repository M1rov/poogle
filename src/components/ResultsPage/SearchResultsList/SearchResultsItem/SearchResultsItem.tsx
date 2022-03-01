import React, {FC} from 'react';
import {webSearchResult} from "../../../../interfaces/webSearch";

const SearchResultsItem: FC<{ result: webSearchResult }> = ({result}) => {

  function truncateText(text: string, limit: number = 125): string {
    text = text.trim();
    if (text.length <= limit) return text;

    text = text.slice(0, limit);
    text = text.slice(0, text.lastIndexOf(' '));

    return text.trim() + '...';
  }

  const truncateURI = (URI: string): string => URI.slice(0, URI.indexOf('/', 8))

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
        {truncateText(result.description)}
      </div>
    </div>
  );
};

export default SearchResultsItem;