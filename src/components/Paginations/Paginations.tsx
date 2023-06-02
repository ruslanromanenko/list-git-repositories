import React, { FC } from "react";
import { IRepository } from "../../types/interfaces/IRepository";
import classes from "./Paginations.module.scss";
import cs from "classnames";

export const Paginations: FC<PaginationsProps> = ({
  pages,
  activePage,
  onClickPrevPage,
  onClickNextPage,
  onClickActivePage,
  repositories,
}) => {
  return (
    <div className={classes.paginationWrap}>
      <button
        className={classes.button}
        onClick={onClickPrevPage}
        disabled={activePage === 1}
      >
        Previous
      </button>
      <div className={classes.paginationPages}>
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
      </div>
      <button
        className={classes.button}
        onClick={onClickNextPage}
        disabled={repositories.length === 0}
      >
        Next
      </button>
    </div>
  );
};
type PaginationsProps = {
  pages: number[];
  activePage: number;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
  onClickActivePage: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  repositories: IRepository[];
};
