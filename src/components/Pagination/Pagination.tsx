import React, {FC, useState} from 'react';
import './Pagination.scss'

interface props {
  totalPages: number,
  pageLimit: number,
  pageNeighbours: number,
  onPageChanged: (currentPage: number) => void
}


const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step: number = 1) => {
  const range = [];
  for(let i = from; i <= to; i+=step) {
    range.push(i);
  }
  return range;
}

const Pagination: FC<props> = ({totalPages, pageLimit = 20, pageNeighbours= 0, onPageChanged}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fetchPageNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages: Array<number | string> = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }

  const pages = fetchPageNumbers()

  if(totalPages === 1 || !totalPages) {
    return null;
  }

  const gotoPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    setCurrentPage(currentPage);
    onPageChanged(currentPage)
  }

  const handleClick = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    gotoPage(page);
  }

  const handleMoveLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    gotoPage(currentPage - 1);
  }

  const handleMoveRight = (e: React.MouseEvent) => {
    e.preventDefault();
    gotoPage(currentPage + 1);
  }

  return (
    <div>
        <nav aria-label="Countries Pagination">
          <ul className="pagination">
            { pages.map((page, index) => {

              if (page === LEFT_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" onClick={(e) => handleMoveLeft(e)}>
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
              );

              if (page === RIGHT_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Next" onClick={(e) => handleMoveRight(e)}>
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              );

              if(typeof page === "number") {
                return (
                  <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                    <a className="page-link" href="#" onClick={(e) => handleClick(page, e)}>{ page }</a>
                  </li>
                );
              }

            }) }

          </ul>
        </nav>
    </div>
  );
};

export default Pagination;