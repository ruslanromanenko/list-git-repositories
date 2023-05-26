import React, { FC, useEffect, useState } from "react";
import { IRepository } from "../../types/interfaces/IRepository";
import { createPages } from "../../utils";
import classes from "./Paginations.module.scss";
import cs from "classnames";

export const Paginations: FC<PaginationsProps> = ({
  activePage,
  maxPage,
  onClickPrevPage,
  onClickNextPage,
  onClickActivePage,
  data,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    if (maxPage > 0) {
      setPages(createPages(maxPage, activePage));
    }
  }, [maxPage, activePage]);

  return (
    <div className={classes.paginationWrap}>
      <button
        className={classes.button}
        onClick={onClickPrevPage}
        disabled={activePage === 1}
      >
        Previous
      </button>
      {pages?.map((page) => (
        <span
          key={page}
          className={cs(classes.page, {
            [classes.activePage]: page === activePage,
          })}
          onClick={(e) => onClickActivePage(e)}
        >
          {page}
        </span>
      ))}
      <button
        className={classes.button}
        onClick={onClickNextPage}
        disabled={data.length === 0}
      >
        Next
      </button>
    </div>
  );
};
type PaginationsProps = {
  activePage: number;
  maxPage: number;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
  onClickActivePage: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  data: IRepository[];
};
