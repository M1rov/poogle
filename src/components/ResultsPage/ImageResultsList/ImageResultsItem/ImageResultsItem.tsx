import React, {FC, useState} from 'react';
import {imageSearchResult} from "../../../../interfaces/imageSearch";
import {truncateText} from "../../../../scripts/truncate";

const ImageResultsItem: FC<{ result: imageSearchResult }> = ({result}) => {
  const [error, setError] = useState<boolean>(false)

  return (
    error ?
      null
      :
      <a href={result.webpageUrl}>
        <div className='result__img'>
          <img src={result.url} onError={() => setError(true)} alt={result.title}/>
        </div>
        <div className="result__title">
          {truncateText(result.title, 36)}
        </div>
      </a>
  );
};

export default ImageResultsItem;