import React, {FC, useState} from 'react';
import {imageSearchResult} from "../../../../interfaces/imageSearch";
import {useNavigate} from "react-router-dom";

const ImageResultsItem: FC<{ result: imageSearchResult }> = ({result}) => {
  const [error, setError] = useState<boolean>(false)

  const router = useNavigate();

  return (
    error ?
      null
      :
      <div
        className='result'
        onClick={() => router(`${result.url}`)}
      >
        <div className='result__img'>
          <img src={result.url} onError={() => setError(true)}/>
        </div>
        <div className="result__title">
          {result.title}
        </div>
      </div>
  );
};

export default ImageResultsItem;