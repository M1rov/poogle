import React, {FC, useEffect, useState} from 'react';
import ImageResultsItem from "./ImageResultsItem/ImageResultsItem";
import SearchController from "../../../controller/search.controller";
import {useSearchParams} from "react-router-dom";
import {imageSearchResp} from "../../../interfaces/imageSearch";
import './ImageResultsList.scss'
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../UI/Loader/Loader";

const IMAGES_PER_PAGE = 40;

const ImageResultsList: FC = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');

  const [results, setResults] = useState<imageSearchResp>({totalCount: 0, value: []});
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMoreImages = () => {
    if (queryParam) {
      if (!results.value.length) {
        setIsLoading(true);
      }
      SearchController.imageSearch(queryParam, currentPage, IMAGES_PER_PAGE).then(data => {
        setResults(prev => {
          return {
            ...prev, value: [...prev.value, ...data.value]
          }
        });
        if (!totalPages) {
          setTotalPages(Math.ceil(data.totalCount / IMAGES_PER_PAGE));
        }
      }).then(() => {
        setCurrentPage(prev => prev + 1)
      }).finally(() => {
        setIsLoading(false);
      })
    }
  }

  useEffect(() => {
    setResults({totalCount: 0, value: []});
    setCurrentPage(1);
    fetchMoreImages();
  }, [queryParam])

  return isLoading ?
    (
      <div className='results__loader'>
        <Loader/>
      </div>
    )
    :
    (
      <div className='results__image-list'>
        <div className="container">
          <InfiniteScroll
            next={fetchMoreImages}
            hasMore={currentPage <= totalPages}
            loader={<Loader/>}
            dataLength={IMAGES_PER_PAGE * currentPage - 1}
          >
            <ul className='results__image-grid'>
              {results?.value?.map(result =>
                <li className='result'>
                  <ImageResultsItem result={result} key={result.url}/>
                </li>
              )}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
    );
};

export default ImageResultsList;