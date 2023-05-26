import { useEffect, useMemo } from "react";
import { RepositoriesList } from "../RepositoriesList";
import { SearchInput } from "../SearchInput";
import classes from "./Main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRepositories,
  fetchRepositoriesAsync,
  setKeyword,
  setPage,
} from "../../store/repositoriesSlice";
import { Paginations } from "../Paginations";
import { log } from "console";

export const Main = () => {
  const dispatch = useDispatch();

  const { data, keyword, activePage, perPage, totalCount } =
    useSelector(selectRepositories);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  const handleSearch = () => {
    dispatch(setPage(1));
    dispatch(fetchRepositoriesAsync());
  };

  const maxPage: number = useMemo(
    () => Math.ceil(totalCount / perPage),
    [totalCount, perPage]
  );

  useEffect(() => {
    if (keyword) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [keyword]);

  const handlePrevPage = () => {
    if (activePage > 1) {
      dispatch(setPage(activePage - 1));
    }
  };

  const handleNextPage = () => {
    if (activePage < maxPage) {
      dispatch(setPage(activePage + 1));
    }
  };

  const handleActivePage = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    dispatch(setPage(Number(e.currentTarget.textContent)));
  };

  useEffect(() => {
    console.log(activePage);
    dispatch(fetchRepositoriesAsync());
  }, [activePage]);

  return (
    <main>
      <div className={classes.container}>
        <SearchInput keyword={keyword} onKeywordChange={handleKeywordChange} />
        <RepositoriesList />
        <Paginations
          activePage={activePage}
          maxPage={maxPage}
          onClickPrevPage={handlePrevPage}
          onClickNextPage={handleNextPage}
          onClickActivePage={handleActivePage}
          data={data}
        />
      </div>
    </main>
  );
};
