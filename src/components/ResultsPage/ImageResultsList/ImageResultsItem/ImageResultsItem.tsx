import React, {FC, useState} from 'react';
import {imageSearchResult} from "../../../../interfaces/imageSearch";
import {useNavigate, useSearchParams} from "react-router-dom";
import {truncateText} from "../../../../scripts/truncate";

const ImageResultsItem: FC<{ result: imageSearchResult }> = ({result}) => {
  const [error, setError] = useState<boolean>(false)

  const navigate = useNavigate();

  return (
    error ?
      null
      :
      <li
        className='result'
      >
        <a href={result.webpageUrl}>
          <div className='result__img'>
            <img src={result.url} onError={() => setError(true)}/>
          </div>
          <div className="result__title">
            {truncateText(result.title, 36)}
          </div>
        </a>
      </li>
  );
};

export default ImageResultsItem;