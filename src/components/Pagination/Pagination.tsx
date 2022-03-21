import React, {FC, useState} from 'react';
import './Pagination.scss'
import {fetchPageNumbers, handleClick, handleMoveLeft, handleMoveRight} from "./utils";
import {useSearchParams} from "react-router-dom";

interface props {
  totalPages: number,
  pageLimit: number,
  pageNeighbours: number,
  onPageChanged: (currentPage: number) => void
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const Pagination: FC<props> = ({totalPages, pageLimit = 20, pageNeighbours = 0, onPageChanged}) => {
  const [searchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState<number>(+(searchParams.get('page') ?? 1))

  const pages = fetchPageNumbers(pageNeighbours, totalPages, currentPage)

  if (totalPages === 1 || !totalPages) {
    return null;
  }

  console.log(currentPage)

  return (
    <div>
      <nav aria-label="Countries Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            switch (page) {
              case LEFT_PAGE:
                return <li key={index} className="page-item">
                  <button className="page-link" aria-label="Previous"
                     onClick={e => handleMoveLeft(e, totalPages, setCurrentPage, currentPage, onPageChanged)}>
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
              case RIGHT_PAGE:
                return <li key={index} className="page-item">
                  <button className="page-link" aria-label="Next"
                     onClick={e => handleMoveRight(e, totalPages, setCurrentPage, currentPage, onPageChanged)}>
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              default:
                return (
                  <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                    <button className="page-link"
                       onClick={e => handleClick(typeof page === "number" ? page : 1, e, totalPages, setCurrentPage, onPageChanged)}>{page}
                    </button>
                  </li>
                );
            }
          })}

        </ul>
      </nav>
    </div>
  );
};

export default Pagination;