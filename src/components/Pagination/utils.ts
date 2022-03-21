import React from "react";

const range = (from: number, to: number, step: number = 1): Array<number> => {
  const range = [];
  for (let i = from; i <= to; i += step) {
    range.push(i);
  }
  return range;
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

interface IfetchPageNumbers {
  (pageNeighbours: number,
   totalPages: number,
   currentPage: number): Array<number | string>
}

export const fetchPageNumbers: IfetchPageNumbers = (pageNeighbours, totalPages, currentPage) => {
  const totalNumbers = (pageNeighbours * 2) + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    let pages: Array<number | string> = range(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = (totalPages - endPage) > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
      case (hasLeftSpill && !hasRightSpill): {
        const extraPages = range(startPage - spillOffset, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }

      case (!hasLeftSpill && hasRightSpill): {
        const extraPages = range(endPage + 1, endPage + spillOffset);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }

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

interface IgotoPage {
  (page: number, totalPages: number, setCurrentPage: Function, onPageChanged: Function): void
}

export const gotoPage: IgotoPage = (page, totalPages, setCurrentPage, onPageChanged) => {
  const currentPage = Math.max(0, Math.min(page, totalPages));
  setCurrentPage(currentPage);
  onPageChanged(currentPage)
}

interface IhandleClick {
  (page: number, e: React.MouseEvent, totalPages: number, setCurrentPage: Function, onPageChanged: Function): void
}

export const handleClick: IhandleClick = (page: number, e, totalPages, setCurrentPage, onPageChanged) => {
  e.preventDefault();
  gotoPage(page, totalPages, setCurrentPage, onPageChanged);
}

interface IhandleMove {
  (e: React.MouseEvent, totalPages: number, setCurrentPage: Function, currentPage: number, onPageChanged: Function): void
}

export const handleMoveLeft: IhandleMove = (e, totalPages, setCurrentPage, currentPage, onPageChanged) => {
  e.preventDefault();
  gotoPage(currentPage - 1, totalPages, setCurrentPage, onPageChanged);
}

export const handleMoveRight: IhandleMove = (e, totalPages, setCurrentPage, currentPage, onPageChanged) => {
  e.preventDefault();
  gotoPage(currentPage + 1, totalPages, setCurrentPage, onPageChanged);
}

